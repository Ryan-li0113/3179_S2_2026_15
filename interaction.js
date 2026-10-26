/* FIT3179 DV2 — genuine linked geography analysis.
   Select a host state in Figure 5 (or click Figure 4 / 8 / 11 / 12 / 13):
   Figure 8 recalculates hex-bin attendance; Figure 11 retiles only matching venues;
   Figure 12 recomputes in-state rank orders; Figure 13 highlights corresponding
   flows without pretending national phase totals have changed. */
(function () {
  'use strict';
  const base = 'charts/';
  const STATES = {ALL:'All of Australia',VIC:'Victoria',NSW:'New South Wales',QLD:'Queensland',WA:'Western Australia',SA:'South Australia',TAS:'Tasmania',NT:'Northern Territory',ACT:'Australian Capital Territory'};
  const qs = id => document.getElementById(id);
  const nfmt = n => new Intl.NumberFormat('en-AU').format(Math.round(n));
  const compact = n => n>=1e6 ? (n/1e6).toFixed(2)+'m' : n>=1000 ? Math.round(n/1000)+'k' : String(n);
  let selectedState='ALL', mapView, sankeyView, venues=[], total=0, rawHex=[], baseTreemap=[], loading=false, epoch=0;
  const specs={};
  const allReady = Promise.all([
    loadCSV('data/afl_venue_attendance_2025.csv'),
    loadCSV('data/afl_hexbin_map_paths_2025.csv'),
    loadCSV('data/afl_venue_treemap_2025.csv'),
    loadJSON(base+'afl_hexbin_crowds_2025.json'),
    loadJSON(base+'afl_venue_treemap_2025.json'),
    loadJSON(base+'afl_venue_rank_shift_2025.json'),
    loadJSON(base+'afl_state_phase_sankey_2025.json'),
    loadJSON(base+'afl_venue_concentration_lorenz_2025.json')
  ]);
  function loadJSON(url){return fetch(url).then(r=>{if(!r.ok)throw Error(url+' '+r.status);return r.json()});}
  function loadCSV(url){return fetch(url).then(r=>{if(!r.ok)throw Error(url+' '+r.status);return r.text()}).then(t=>vega.read(t,{type:'csv'}));}
  const escapeHTML = s => String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function setText(id,text){const x=qs(id);if(x)x.textContent=text;}
  function showError(id,error){console.error('Interactive chart',id,error);setText(id,'Chart unavailable: '+String(error?.message||error));}
  function venuesFor(state){return selectedState==='ALL' && state===undefined?venues:state==='ALL'?venues:venues.filter(v=>v.state===state);}
  function selectState(code){
    code=STATES[code]?code:'ALL';
    if(!loading)return; // initial selection is applied after datasets arrive
    if(code===selectedState)return;
    selectedState=code;
    const subset=venuesFor(code), subtotal=subset.reduce((a,v)=>a+v.total_attendance,0);
    setText('selected-state-title',STATES[code]);
    setText('selected-state-summary',subset.length+' venue'+(subset.length===1?'':'s')+' · '+nfmt(subtotal)+' crowd entries'+(code==='ALL'?'':' · '+(subtotal/total*100).toFixed(1)+'% nationally'));
    qs('reset-region').disabled=code==='ALL';
    if(mapView){mapView.signal('chosenState',code).runAsync().catch(console.error)}
    if(sankeyView){sankeyView.signal('stateSelected',code).runAsync().catch(console.error)}
    document.querySelectorAll('[data-region-name]').forEach(el=>el.textContent=STATES[code]);
    updateInsights(subset,code);
    const stamp=++epoch;
    Promise.all([renderHex(subset,code,stamp),renderTreemap(subset,code,stamp),renderRank(subset,code,stamp),renderLorenz(subset,code,stamp)]).catch(console.error);
  }
  window.DV2SelectState=selectState;

  // The written takeaway follows the active data scope, not the original national result.
  const originalInsights={};
  let originalVenueReference=null;
  function updateInsights(subset,scope){
    const reference=document.querySelector('[data-figure="11"] .venue-keys');
    if(reference && !originalVenueReference)originalVenueReference=reference.innerHTML;
    if(reference){
      if(scope==='ALL')reference.innerHTML=originalVenueReference;
      else reference.innerHTML='<strong>'+escapeHTML(STATES[scope])+' · only selected host venues</strong><div class="venue-key-grid">'+[...subset].sort((a,b)=>b.total_attendance-a.total_attendance).map(v=>'<span>'+escapeHTML(shortName(v.venue))+' · '+nfmt(v.total_attendance)+'</span>').join('')+'</div>';
    }
    for(const number of [11,12,14]){
      const el=document.querySelector('[data-figure="'+number+'"] .chart-insight');
      if(el && !originalInsights[number])originalInsights[number]=el.innerHTML;
      if(!el)continue;
      if(scope==='ALL'){el.innerHTML=originalInsights[number];continue;}
      const ranking=[...subset].sort((a,b)=>b.total_attendance-a.total_attendance);
      const leader=ranking[0];const stateTotal=subset.reduce((sum,v)=>sum+v.total_attendance,0);
      if(number===11)el.innerHTML='<strong>Selected state:</strong> '+escapeHTML(leader.venue)+' accounts for '+(leader.total_attendance/stateTotal*100).toFixed(1)+'% of '+escapeHTML(STATES[scope])+' crowd entries across its '+subset.length+' venue'+(subset.length===1?'':'s')+'. Tile sizes now total 100% within the selected state.';
      if(number===12){const avgLeader=[...subset].sort((a,b)=>b.average_attendance-a.average_attendance)[0];el.innerHTML='<strong>Selected state:</strong> Most total entries: '+escapeHTML(leader.venue)+'. Highest average per match: '+escapeHTML(avgLeader.venue)+'. Both ranks have been recalculated within '+escapeHTML(STATES[scope])+'.';}
      if(number===14)el.innerHTML='<strong>Selected state:</strong> The concentration curve now includes '+subset.length+' host venue'+(subset.length===1?'':'s')+' in '+escapeHTML(STATES[scope])+', rather than the 18-venue national distribution. Percentages are recalculated within this state.';
    }
  }

  function headline(id,full,focus,selected){const h=qs(id); if(h)h.innerHTML= selected==='ALL'?full:focus.replace('{state}',escapeHTML(STATES[selected]));}
  function clone(spec){return JSON.parse(JSON.stringify(spec));}
  const shortName = v => v.replace('Melbourne Cricket Ground (MCG)','MCG').replace('Docklands (Marvel Stadium)','Marvel Stadium').replace('Perth Stadium (Optus Stadium)','Optus Stadium').replace('Kardinia Park (GMHBA Stadium)','GMHBA Stadium').replace('Sydney Cricket Ground (SCG)','SCG').replace('Carrara (People First Stadium)','People First Stadium').replace('Sydney Showground (ENGIE Stadium)','ENGIE Stadium');
  function fmtScope(scope,count){return scope==='ALL'?'National total · '+count+' venues':STATES[scope]+' only · '+count+' venues';}
  let currentHexView=null,currentTreeView=null,currentRankView=null,currentLorenzView=null;
  function rowsForHex(subset,state){
    const allow=new Set(subset.map(v=>v.venue));
    return rawHex.map(row=>{
      const d={...row};
      if(row.kind!=='hex')return d;
      if(state==='ALL')return d;
      const binVenues=venues.filter(v=>allow.has(v.venue) && row.venues.includes(v.venue));
      const sum=binVenues.reduce((a,v)=>a+v.total_attendance,0);
      d.attendance=sum;d.venue_count=binVenues.length;d.venues=binVenues.map(v=>v.venue).join(', ');d.label=compact(sum);return d;
    });
  }
  async function renderHex(subset,state,stamp){
    const spec=clone(specs.hex);
    spec.data[0].values=rowsForHex(subset,state);delete spec.data[0].url;delete spec.data[0].format;
    // Hide bins with zero attendance in the selected state; retain the country outline.
    spec.data.find(d=>d.name==='bins').transform.push({type:'filter',expr:'datum.venue_count > 0'});
    setText('hex-filter-label',state==='ALL'?'All 18 venues · nine geographic bins':STATES[state]+' venues only · bins with no local attendance are hidden');
    const view=await vegaEmbed('#chart-afl-hexbins',spec,{actions:false,renderer:'svg'});
    if(stamp!==epoch){view.view.finalize();return;}
    if(currentHexView){try{currentHexView.finalize()}catch(e){}}
    currentHexView=view.view;
    const rows=spec.data[0].values;
    function showBin(bin){const row=rows.find(r=>r.bin_id===bin&&r.kind==='hex');
      if(!row){setText('geo-place','Explore a venue cluster');setText('geo-area','Click a hexagon for the grounds inside it');setText('geo-total',compact(subset.reduce((a,v)=>a+v.total_attendance,0)));setText('geo-explainer',fmtScope(state,subset.length));return;}
      setText('geo-place','Venue cluster · '+compact(row.attendance));setText('geo-area',row.venues);setText('geo-total',nfmt(row.attendance)+' entries');setText('geo-explainer',row.venue_count+' venue'+(row.venue_count===1?'':'s')+' in this cluster');
    }
    showBin('');
    view.view.addSignalListener('selectedBin',function(_,bin){
      if(!bin)return showBin('');
      showBin(bin);
      const row=rows.find(r=>r.bin_id===bin && r.kind==='hex');
      if(!row)return;
      const contained=venues.filter(v=>row.venues.includes(v.venue));
      const states=[...new Set(contained.map(v=>v.state))];
      // Clicking a single-state cluster is another real cross-chart filter.
      if(states.length===1 && state!==states[0])selectState(states[0]);
    });
  }
  function rectangles(data){
    const rects=new Map();const sorted=[...data].sort((a,b)=>b.attendance-a.attendance);
    function distribute(items,x,y,w,h){
      if(items.length===1){rects.set(items[0].venue,{x0:x,x1:x+w,y0:y,y1:y+h});return;}
      const full=items.reduce((a,v)=>a+v.attendance,0);let share=0,cut=0,best=Infinity;
      for(let i=1;i<items.length;i++){share+=items[i-1].attendance;const gap=Math.abs(share/full-.5);if(gap<best){best=gap;cut=i}}
      const a=items.slice(0,cut),b=items.slice(cut),ratio=a.reduce((s,v)=>s+v.attendance,0)/full;
      if(w>=h){distribute(a,x,y,w*ratio,h);distribute(b,x+w*ratio,y,w*(1-ratio),h)}
      else{distribute(a,x,y,w,h*ratio);distribute(b,x,y+h*ratio,w,h*(1-ratio))}
    }
    if(sorted.length)distribute(sorted,0,0,1000,800);
    return rects;
  }
  async function renderTreemap(subset,state,stamp){
    const chart=clone(specs.treemap);
    const sum=subset.reduce((a,v)=>a+v.total_attendance,0);
    const computed=state==='ALL'?null:rectangles(subset.map(v=>({...v,attendance:v.total_attendance})));
    const allow=new Set(subset.map(v=>v.venue));
    let rows=baseTreemap.filter(r=>allow.has(r.venue)).map(d=>({...d}));
    if(state!=='ALL'){
      rows=rows.map(r=>{const v=subset.find(x=>x.venue===r.venue),pos=computed.get(r.venue);const pct=v.total_attendance/sum*100;return {...r,attendance:v.total_attendance,share_pct:pct,show_label:pct>=8?1:0,x0:pos.x0,x1:pos.x1,y0:pos.y0,y1:pos.y1};});
    }
    chart.data={values:rows};
    setText('treemap-filter-label',state==='ALL'?'All 18 venues · percentages of national total':STATES[state]+' · '+rows.length+' venues · percentages recalculated within this state');
    const res=await vegaEmbed('#chart-venue-treemap',chart,{actions:false,renderer:'svg'});
    if(stamp!==epoch){res.view.finalize();return;}
    if(currentTreeView){try{currentTreeView.finalize()}catch(e){}}
    currentTreeView=res.view;
    res.view.addEventListener('click',(_,item)=>{if(item?.datum?.state)selectState(item.datum.state)});
  }
  async function renderRank(subset,state,stamp){
    const spec=clone(specs.rank);
    const picked=state==='ALL'?[...venues].sort((a,b)=>b.total_attendance-a.total_attendance).slice(0,8):subset;
    const byCount=[...picked].sort((a,b)=>b.total_attendance-a.total_attendance);
    const byAvg=[...picked].sort((a,b)=>b.average_attendance-a.average_attendance);
    const avgRanks=new Map(byAvg.map((v,i)=>[v.venue,i+1]));
    const rows=byCount.map((v,i)=>({venue:v.venue,short_name:shortName(v.venue),state:v.state,left_rank:i+1,right_rank:avgRanks.get(v.venue),total_attendance:v.total_attendance,average_attendance:v.average_attendance}));
    spec.data[0].values=rows;delete spec.data[0].url;delete spec.data[0].format;
    spec.scales[0].domain=[.3,Math.max(2.7,rows.length+.7)];
    setText('rank-filter-label',state==='ALL'?'Top 8 national venues · ranked within the same eight for the interactive comparison':STATES[state]+' · '+rows.length+' venues · BOTH ranks recalculated within this state');
    const result=await vegaEmbed('#chart-venue-rank',spec,{actions:false,renderer:'svg'});
    if(stamp!==epoch){result.view.finalize();return;}
    if(currentRankView){try{currentRankView.finalize()}catch(e){}}
    currentRankView=result.view;
    result.view.addEventListener('click',(_,item)=>{if(item?.datum?.state)selectState(item.datum.state)});
  }
  async function renderLorenz(subset,state,stamp){
    const spec=clone(specs.lorenz),sorted=[...subset].sort((a,b)=>a.total_attendance-b.total_attendance);
    const n=sorted.length,denom=sorted.reduce((s,r)=>s+r.total_attendance,0);
    const rows=[{venue_pct:0,cumulative_pct:0,equality_pct:0,venues_included:0,cumulative_attendance:0}];
    let subtotal=0;sorted.forEach((r,i)=>{subtotal+=r.total_attendance;rows.push({venue_pct:(i+1)/n*100,cumulative_pct:subtotal/denom*100,equality_pct:(i+1)/n*100,venues_included:i+1,cumulative_attendance:subtotal,venue:r.venue});});
    spec.data={values:rows};
    const view=await vegaEmbed('#chart-venue-lorenz',spec,{actions:false,renderer:'svg'});
    if(stamp!==epoch){view.view.finalize();return;}
    if(currentLorenzView){try{currentLorenzView.finalize()}catch(e){}}
    currentLorenzView=view.view;
  }
  async function start(){
    try{
      const [rawVenues,allHex,treemap,hexSpec,treeSpec,rankSpec,sankeySpec,lorenzSpec]=await allReady;
      venues=rawVenues.map(v=>({...v,total_attendance:+v.total_attendance,average_attendance:+v.average_attendance,total_games:+v.total_games,home_away_attendance:+v.home_away_attendance,finals_attendance:+v.finals_attendance}));
      rawHex=allHex.map(x=>({...x,attendance:x.attendance===''?null:+x.attendance,venue_count:x.venue_count===''?null:+x.venue_count,px:x.px===''?null:+x.px,py:x.py===''?null:+x.py}));
      baseTreemap=treemap.map(v=>({...v,attendance:+v.attendance,share_pct:+v.share_pct,show_label:+v.show_label,x0:+v.x0,x1:+v.x1,y0:+v.y0,y1:+v.y1}));
      total=venues.reduce((a,v)=>a+v.total_attendance,0);
      if(Math.round(total)!==8257027)throw Error('The source venue attendance total does not reconcile.');
      Object.assign(specs,{hex:hexSpec,treemap:treeSpec,rank:rankSpec,sankey:sankeySpec,lorenz:lorenzSpec});
      const initial=await Promise.all([
        vegaEmbed('#chart-state-glyph','charts/afl_state_matchday_tile_glyph_map_2025.json',{actions:false,renderer:'svg'}),
        vegaEmbed('#chart-state-sankey',sankeySpec,{actions:false,renderer:'svg'})
      ]);
      mapView=initial[0].view;sankeyView=initial[1].view;
      mapView.addSignalListener('chosenState',(_,value)=>selectState(value));
      sankeyView.addEventListener('click',(_,item)=>{const st=item?.datum?.state;if(st && STATES[st])selectState(st)});
      loading=true;
      qs('reset-region').addEventListener('click',()=>selectState('ALL'));
      const defaultRows=[...venues];const id=++epoch;
      await Promise.all([renderHex(defaultRows,'ALL',id),renderTreemap(defaultRows,'ALL',id),renderRank(defaultRows,'ALL',id),renderLorenz(defaultRows,'ALL',id)]);
      setText('selected-state-summary','All 18 venues · '+nfmt(total)+' crowd entries');
    }catch(error){
      console.error('Linked visualisations could not initialise',error);
      for(const id of ['chart-state-glyph','chart-afl-hexbins','chart-venue-treemap','chart-venue-rank','chart-state-sankey']){
        if(!qs(id).querySelector('svg'))showError(id,error);
      }
    }
    // Chapter navigation and reduced-motion-aware scrolling remain independent of chart data.
    const chapters=[...document.querySelectorAll('section.chapter')],nav=[...document.querySelectorAll('.story-nav a[data-section]')];
    function progress(){const limit=Math.max(1,document.documentElement.scrollHeight-innerHeight);const pct=Math.min(100,Math.max(0,scrollY/limit*100));const bar=qs('read-progress');if(bar)bar.style.width=pct+'%'}
    window.addEventListener('scroll',progress,{passive:true});window.addEventListener('resize',progress,{passive:true});progress();
    if('IntersectionObserver' in window){
      const watch=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)nav.forEach(a=>{if(a.dataset.section===e.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}),{rootMargin:'-16% 0px -65% 0px'});chapters.forEach(c=>watch.observe(c));
      if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const cards=[...document.querySelectorAll('.chart-card[data-reveal]')];const reveal=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');reveal.unobserve(e.target)}}),{rootMargin:'0px 0px 40px 0px',threshold:.02});document.documentElement.classList.add('motion-ready');cards.forEach(c=>reveal.observe(c));}
    }
  }
  start();
})();
