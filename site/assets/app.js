const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const header=$('#header'); if(header)addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>15),{passive:true});
const menu=$('#menu'),mobile=$('#mobile-nav'); if(menu)menu.addEventListener('click',()=>{mobile.classList.toggle('open');menu.setAttribute('aria-expanded',mobile.classList.contains('open'))});
$('[data-close-menu]').forEach(a=>a.addEventListener('click',()=>{mobile?.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){mobile?.classList.remove('open');menu?.setAttribute('aria-expanded','false');closeAgent();}});
document.addEventListener('click',e=>{if(mobile?.classList.contains('open')&&!mobile.contains(e.target)&&!menu?.contains(e.target)){mobile.classList.remove('open');menu.setAttribute('aria-expanded','false')}});
const revealEls=$('.reveal');
if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('show')),{threshold:.1});revealEls.forEach(x=>io.observe(x));}else revealEls.forEach(x=>x.classList.add('show'));
const agentLauncher=$('#agent-launcher'),agentPanel=$('#agent-panel'),agentClose=$('#agent-close'),agentMessages=$('#agent-messages'),agentForm=$('#agent-form'),agentInput=$('#agent-input');
function addMsg(t,w='agent'){if(!agentMessages)return;const e=document.createElement('div');e.className='agent-msg '+w;e.innerHTML='<span class="agent-label">'+(w==='user'?'YOU':'AETHER')+'</span>';const s=document.createElement('span');s.textContent=t;e.appendChild(s);agentMessages.appendChild(e);agentMessages.scrollTop=agentMessages.scrollHeight}
function openAgent(){agentPanel?.classList.add('open');agentPanel?.setAttribute('aria-hidden','false');if(agentMessages&&!agentMessages.children.length)addMsg("I’m Aether. Ask about products, workflows, governance, pilots, or how to start.");setTimeout(()=>agentInput?.focus(),50)}
function closeAgent(){agentPanel?.classList.remove('open');agentPanel?.setAttribute('aria-hidden','true')}
agentLauncher?.addEventListener('click',openAgent);agentClose?.addEventListener('click',closeAgent);$$('[data-open-agent]').forEach(x=>x.addEventListener('click',e=>{e.preventDefault();openAgent()}));
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function reply(q){const s=q.toLowerCase();if(/what is|about aether|aethermesh/.test(s))return"AetherMesh is a governed AI execution layer: specialist agents, deterministic routing, workflow planning, evaluation, policy gates and human-controlled commits.";if(/support|ticket|customer/.test(s))return"MeshSupport handles customer operations: classify, retrieve evidence, prepare a resolution, evaluate quality and route consequential responses for approval.";if(/\bit\b|incident|helpdesk/.test(s))return"MeshDesk handles IT operations: triage, evidence gathering, diagnosis, remediation preparation and approval-gated execution.";if(/sales|revenue|crm|lead|outreach/.test(s))return"MeshRevenue handles account research, buyer context, qualification, CRM preparation and next-action planning.";if(/market|competitor|research|trend/.test(s))return"MeshIntel monitors market, competitor, technology and regulatory signals and produces evidence-backed briefs.";if(/governance|security|audit|evaluation/.test(s))return"MeshGuard provides agent inventory, permissions, policies, evaluations, audit trails, approval gates and rollback controls.";if(/price|pricing|cost/.test(s))return"Current commercial targets: Workflow Diagnostic (fixed scope), Workflow Pilot $7,500+, production $15k–$35k, managed operations roughly $3k–$10k/month.";if(/pilot/.test(s))return"The Workflow Pilot turns one recurring workflow into a governed working pilot with a baseline, evaluation suite, controlled execution and production handoff.";return"Describe one recurring workflow and I’ll point you to the relevant AetherMesh product or workflow path."}
agentForm?.addEventListener('submit',e=>{e.preventDefault();const q=agentInput.value.trim();if(!q)return;addMsg(q,'user');agentInput.value='';setTimeout(()=>addMsg(reply(q)),280)});
$$('.agent-chip').forEach(x=>x.addEventListener('click',()=>{agentInput.value=x.dataset.q;agentForm.requestSubmit()}));
const flows={support:{title:"Resolve a customer request",score:"EVAL 94 / 100",steps:["Classify request","Retrieve evidence","Prepare resolution","Quality gate","Human commit"]},research:{title:"Generate a market intelligence brief",score:"EVAL 91 / 100",steps:["Collect signals","Verify sources","Analyse movement","Synthesize","Human review"]},revenue:{title:"Prepare an account for outreach",score:"EVAL 93 / 100",steps:["Research account","Map buyer context","Qualify opportunity","Prepare next action","Human approval"]},it:{title:"Investigate an IT incident",score:"EVAL 96 / 100",steps:["Classify incident","Gather evidence","Form diagnosis","Prepare remediation","Human commit"]}};
function initLab(){const nav=$$('.lab-nav button'),title=$('#lab-title'),score=$('#lab-score'),timeline=$('#lab-timeline'),run=$('#lab-run'),bar=$('#lab-progress'),status=$('#lab-status');if(!title||!timeline)return;let key='support',timer;
function render(k){key=k;const f=flows[k];title.textContent=f.title;score.textContent=f.score;timeline.innerHTML=f.steps.map((x,i)=>'<div class="stage"><span class="bubble">0'+(i+1)+'</span><div><b>'+x+'</b><small>agent state · evidence · control boundary</small></div><span class="tag">'+(i===f.steps.length-1?'GATE':'STEP')+'</span></div>').join('');bar.style.width='0%';status.textContent='IDLE'}
nav.forEach(b=>b.addEventListener('click',()=>{nav.forEach(x=>x.classList.remove('active'));b.classList.add('active');clearInterval(timer);render(b.dataset.flow)}));
run?.addEventListener('click',()=>{clearInterval(timer);const stages=$$('.stage',timeline);let i=0;status.textContent='RUNNING';timer=setInterval(()=>{if(i<stages.length){stages[i].classList.add('on');bar.style.width=((i+1)/stages.length*100)+'%';status.textContent='STEP '+(i+1)+' / '+stages.length;i++}else{clearInterval(timer);status.textContent='CONTROLLED · COMPLETE'}},550)});render(key)}
initLab();
async function callRuntime(task){
 const base=(window.AETHERMESH_RUNTIME_ENDPOINT||"").trim().replace(/\/$/,"");
 if(!base)return null;
 try{
   const r=await fetch(base+"/api/workforce",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({task})});
   if(!r.ok)throw new Error("runtime "+r.status);
   return await r.json();
 }catch(e){console.warn("AetherMesh runtime unavailable; using local experience.",e);return null}
}
function initWorkforce(){
 const form=$('#wf-form'),input=$('#wf-input'),out=$('#wf-result');if(!form||!out)return;
 const roles=[['Strategy Lead','Define objective + decision criteria'],['Research Analyst','Gather and verify evidence'],['Product Lead','Translate evidence into opportunities'],['Engineering Lead','Design execution path / prototype'],['Growth Operator','Prepare market activation plan'],['Revenue Operator','Map buyers + commercial actions'],['Governance Lead','Evaluate risk + approval boundaries']];
 form.addEventListener('submit',async e=>{
  e.preventDefault();const q=input.value.trim();if(!q){input.focus();return}
  out.innerHTML='<div class="wf-step active"><span class="wf-num">01</span><span class="wf-role">AetherMesh Runtime<small>routing agents · planning dependencies · checking policy</small></span><span class="wf-state">working</span></div>';
  const live=await callRuntime(q);
  if(live?.ok){
   const rows=(live.workforce||[]).map((x,i)=>'<div class="wf-step '+(i?'':'done')+'"><span class="wf-num">0'+(i+1)+'</span><span class="wf-role">'+x.role+'<small>'+((x.agents||[]).map(a=>a.title||a.id).join(' · ')||'specialist routing')+'</small></span><span class="wf-state">'+(i===live.workforce.length-1?'approval':'complete')+'</span></div>').join('');
   const routedCount=Array.isArray(live.routed)?live.routed.length:0;
   const workforceRows=Array.isArray(live.workforce)?live.workforce:[];
   const safeRows=workforceRows.map((x,i)=>'<div class="wf-step '+(i?'':'done')+'"><span class="wf-num">0'+(i+1)+'</span><span class="wf-role">'+escapeHtml(x.role||'Specialist')+'<small>'+escapeHtml(((x.agents||[]).map(a=>a.title||a.id).join(' · ')||'specialist routing'))+'</small></span><span class="wf-state">'+(i===workforceRows.length-1?'approval':'complete')+'</span></div>').join('');
   out.innerHTML='<div class="runtime-live"><span>● RUNTIME CONNECTED</span><span>'+routedCount+' agents routed</span><span>policy: '+escapeHtml(live.policy?.decision||'review')+'</span></div>'+safeRows;
   return;
  }
  let chosen=[roles[0]],s=q.toLowerCase();
  if(/research|competitor|market|trend|customer|industry|data/.test(s))chosen.push(roles[1]);
  if(/product|feature|launch|idea|strategy/.test(s))chosen.push(roles[2]);
  if(/build|code|prototype|software|website|app|automate/.test(s))chosen.push(roles[3]);
  if(/marketing|campaign|content|growth|brand/.test(s))chosen.push(roles[4]);
  if(/sales|lead|revenue|buyer|outbound|crm/.test(s))chosen.push(roles[5]);
  chosen.push(roles[6]);chosen=[...new Map(chosen.map(x=>[x[0],x])).values()];
  out.innerHTML=chosen.map((r,i)=>'<div class="wf-step"><span class="wf-num">0'+(i+1)+'</span><span class="wf-role">'+r[0]+'<small>'+r[1]+'</small></span><span class="wf-state">queued</span></div>').join('');
  const rows=$$('.wf-step',out);rows.forEach((row,i)=>setTimeout(()=>{row.classList.add('active');row.querySelector('.wf-state').textContent='working';setTimeout(()=>{row.classList.remove('active');row.classList.add('done');row.querySelector('.wf-state').textContent=i===rows.length-1?'approval':'complete'},600)},i*700));
 });
}
async function initAgentBench(){
 const grid=$('#agent-grid'),filters=$('#bench-filters'),search=$('#bench-search'),count=$('#agent-count');
 if(!grid||!filters)return;
 try{
  const r=await fetch('./assets/agent-registry.json',{cache:'no-store'}); if(!r.ok)throw new Error('registry '+r.status);
  const data=await r.json(); const agents=data.agents||[]; let dept='ALL',term='';
  const depts=['ALL',...(data.departments||[])];
  filters.innerHTML=depts.map(x=>'<button class="bench-filter '+(x==='ALL'?'active':'')+'" data-dept="'+x+'">'+x+'</button>').join('');
  const paint=()=>{
   const q=term.toLowerCase();
   const visible=agents.filter(x=>(dept==='ALL'||x.department===dept)&&(!q||(x.name+' '+x.department+' '+x.mission).toLowerCase().includes(q)));
   grid.innerHTML=visible.map((x,i)=>'<article class="agent-card reveal show"><div class="agent-card-top"><span class="agent-dept">'+escapeHtml(x.department).toUpperCase()+'</span><span class="agent-index">'+String(i+1).padStart(2,'0')+'</span></div><h3>'+escapeHtml(x.name)+'</h3><p>'+escapeHtml(x.mission)+'</p><div class="agent-card-foot"><span class="agent-source">'+escapeHtml(x.source.replace(/^[^/]+\//,''))+'</span><a href="'+encodeURI(x.sourceUrl)+'" target="_blank" rel="noopener noreferrer">Open source ↗</a></div></article>').join('');
   count.textContent=visible.length+' of '+agents.length+' agents shown · sourced from your AetherMesh repository';
  };
  filters.addEventListener('click',e=>{const b=e.target.closest('[data-dept]');if(!b)return;dept=b.dataset.dept;filters.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));paint()});
  search?.addEventListener('input',()=>{term=search.value.trim();paint()});
  paint();
 }catch(e){grid.innerHTML='<div class="wf-empty">Agent registry unavailable. The core workforce remains available above.</div>';console.warn('AetherMesh agent registry unavailable',e)}
}
initAgentBench();


const form=$('#contact-form');
if(form){
 const offerField=$('[name="offer"]',form);
 const requestedOffer=new URLSearchParams(location.search).get('offer');
 if(requestedOffer&&offerField){const map={pilot:'Workflow Pilot',diagnostic:'Workflow Diagnostic',managed:'Managed Agent Operations'};offerField.value=map[requestedOffer]||offerField.value;}
 form.addEventListener('submit',e=>{
  e.preventDefault();const d=new FormData(form);
  const title=encodeURIComponent('AetherMesh enquiry — '+(d.get('company')||'Company'));
  const body=encodeURIComponent(['Source: AetherMesh website','Name: '+d.get('name'),'Email: '+d.get('email'),'Company: '+d.get('company'),'Offer: '+d.get('offer'),'','Workflow / objective:',d.get('workflow'),'','Systems / data:',d.get('systems')||'Not provided'].join('\n'));
  location.href='https://github.com/Mutayibnissar/aethermesh/issues/new?title='+title+'&body='+body;
 });
}
