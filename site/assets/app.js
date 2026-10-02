const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const header=$('#header'); if(header)addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>15),{passive:true});
const menu=$('#menu'),mobile=$('#mobile-nav'); if(menu)menu.addEventListener('click',()=>{mobile.classList.toggle('open');menu.setAttribute('aria-expanded',mobile.classList.contains('open'))});
$$('[data-close-menu]').forEach(a=>a.addEventListener('click',()=>mobile?.classList.remove('open')));
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('show')),{threshold:.1}); $$('.reveal').forEach(x=>io.observe(x));
const agentLauncher=$('#agent-launcher'),agentPanel=$('#agent-panel'),agentClose=$('#agent-close'),agentMessages=$('#agent-messages'),agentForm=$('#agent-form'),agentInput=$('#agent-input');
function addMsg(t,w='agent'){if(!agentMessages)return;const e=document.createElement('div');e.className='agent-msg '+w;e.innerHTML='<span class="agent-label">'+(w==='user'?'YOU':'AETHER')+'</span>';const s=document.createElement('span');s.textContent=t;e.appendChild(s);agentMessages.appendChild(e);agentMessages.scrollTop=agentMessages.scrollHeight}
function openAgent(){agentPanel?.classList.add('open');if(agentMessages&&!agentMessages.children.length)addMsg("I’m Aether. Ask about products, workflows, governance, pilots, or how to start.");setTimeout(()=>agentInput?.focus(),50)}
function closeAgent(){agentPanel?.classList.remove('open')}
agentLauncher?.addEventListener('click',openAgent);agentClose?.addEventListener('click',closeAgent);$$('[data-open-agent]').forEach(x=>x.addEventListener('click',e=>{e.preventDefault();openAgent()}));
function reply(q){const s=q.toLowerCase();if(/what is|about aether|aethermesh/.test(s))return"AetherMesh is a governed AI execution layer: specialist agents, deterministic routing, workflow planning, evaluation, policy gates and human-controlled commits.";if(/support|ticket|customer/.test(s))return"MeshSupport handles customer operations: classify, retrieve evidence, prepare a resolution, evaluate quality and route consequential responses for approval.";if(/it|incident|helpdesk/.test(s))return"MeshDesk handles IT operations: triage, evidence gathering, diagnosis, remediation preparation and approval-gated execution.";if(/sales|revenue|crm|lead|outreach/.test(s))return"MeshRevenue handles account research, buyer context, qualification, CRM preparation and next-action planning.";if(/market|competitor|research|trend/.test(s))return"MeshIntel monitors market, competitor, technology and regulatory signals and produces evidence-backed briefs.";if(/governance|security|audit|evaluation/.test(s))return"MeshGuard provides agent inventory, permissions, policies, evaluations, audit trails, approval gates and rollback controls.";if(/price|pricing|cost/.test(s))return"Current commercial targets: Workflow Diagnostic (fixed scope), Workflow Pilot $7,500+, production $15k–$35k, managed operations roughly $3k–$10k/month.";if(/pilot/.test(s))return"The Workflow Pilot turns one recurring workflow into a governed working pilot with a baseline, evaluation suite, controlled execution and production handoff.";return"Describe one recurring workflow and I’ll point you to the relevant AetherMesh product or workflow path."}
agentForm?.addEventListener('submit',e=>{e.preventDefault();const q=agentInput.value.trim();if(!q)return;addMsg(q,'user');agentInput.value='';setTimeout(()=>addMsg(reply(q)),280)});
$$('.agent-chip').forEach(x=>x.addEventListener('click',()=>{agentInput.value=x.dataset.q;agentForm.requestSubmit()}));
const flows={support:{title:"Resolve a customer request",score:"EVAL 94 / 100",steps:["Classify request","Retrieve evidence","Prepare resolution","Quality gate","Human commit"]},research:{title:"Generate a market intelligence brief",score:"EVAL 91 / 100",steps:["Collect signals","Verify sources","Analyse movement","Synthesize","Human review"]},revenue:{title:"Prepare an account for outreach",score:"EVAL 93 / 100",steps:["Research account","Map buyer context","Qualify opportunity","Prepare next action","Human approval"]},it:{title:"Investigate an IT incident",score:"EVAL 96 / 100",steps:["Classify incident","Gather evidence","Form diagnosis","Prepare remediation","Human commit"]}};
function initLab(){const nav=$$('.lab-nav button'),title=$('#lab-title'),score=$('#lab-score'),timeline=$('#lab-timeline'),run=$('#lab-run'),bar=$('#lab-progress'),status=$('#lab-status');if(!title||!timeline)return;let key='support',timer;
function render(k){key=k;const f=flows[k];title.textContent=f.title;score.textContent=f.score;timeline.innerHTML=f.steps.map((x,i)=>'<div class="stage"><span class="bubble">0'+(i+1)+'</span><div><b>'+x+'</b><small>agent state · evidence · control boundary</small></div><span class="tag">'+(i===f.steps.length-1?'GATE':'STEP')+'</span></div>').join('');bar.style.width='0%';status.textContent='IDLE'}
nav.forEach(b=>b.addEventListener('click',()=>{nav.forEach(x=>x.classList.remove('active'));b.classList.add('active');clearInterval(timer);render(b.dataset.flow)}));
run?.addEventListener('click',()=>{clearInterval(timer);const stages=$$('.stage',timeline);let i=0;status.textContent='RUNNING';timer=setInterval(()=>{if(i<stages.length){stages[i].classList.add('on');bar.style.width=((i+1)/stages.length*100)+'%';status.textContent='STEP '+(i+1)+' / '+stages.length;i++}else{clearInterval(timer);status.textContent='CONTROLLED · COMPLETE'}},550)});render(key)}
initLab();
async function callRuntime(task){
 const base=(window.AETHERMESH_RUNTIME_ENDPOINT||"").replace(/\\/$/,"");
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
   out.innerHTML='<div class="runtime-live"><span>● RUNTIME CONNECTED</span><span>'+live.routed.length+' agents routed</span><span>policy: '+live.policy.decision+'</span></div>'+rows;
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
   grid.innerHTML=visible.map((x,i)=>'<article class="agent-card reveal show"><div class="agent-card-top"><span class="agent-dept">'+x.department.toUpperCase()+'</span><span class="agent-index">'+String(i+1).padStart(2,'0')+'</span></div><h3>'+x.name+'</h3><p>'+x.mission+'</p><div class="agent-card-foot"><span class="agent-source">'+x.source.replace(/^[^/]+\//,'')+'</span><a href="'+x.sourceUrl+'" target="_blank" rel="noreferrer">Open source ↗</a></div></article>').join('');
   count.textContent=visible.length+' of '+agents.length+' agents shown · sourced from your AetherMesh repository';
  };
  filters.addEventListener('click',e=>{const b=e.target.closest('[data-dept]');if(!b)return;dept=b.dataset.dept;filters.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));paint()});
  search?.addEventListener('input',()=>{term=search.value.trim();paint()});
  paint();
 }catch(e){grid.innerHTML='<div class="wf-empty">Agent registry unavailable. The core workforce remains available above.</div>';console.warn('AetherMesh agent registry unavailable',e)}
}
initAgentBench();


const companyAgents=[
 {title:"Chief of Staff",division:"executive",path:"specialized/specialized-chief-of-staff.md",cap:"Executive coordination, priorities, decisions and cross-functional follow-through."},
 {title:"Business Strategist",division:"executive",path:"specialized/business-strategist.md",cap:"Competitive strategy, positioning, choices and business-model decisions."},
 {title:"Research Synthesist",division:"executive",path:"research/research-synthesist.md",cap:"Turn scattered evidence into concise, decision-ready research."},
 {title:"Workflow Architect",division:"executive",path:"specialized/specialized-workflow-architect.md",cap:"Map business processes, dependencies, failure modes and automation boundaries."},
 {title:"Product Manager",division:"product",path:"product/product-manager.md",cap:"Product requirements, prioritisation, roadmaps and delivery decisions."},
 {title:"Product Feedback Synthesizer",division:"product",path:"product/product-feedback-synthesizer.md",cap:"Convert customer and user feedback into product signals and priorities."},
 {title:"Product Trend Researcher",division:"product",path:"product/product-trend-researcher.md",cap:"Track product, category and technology trends for opportunity discovery."},
 {title:"UX Architect",division:"product",path:"design/design-ux-architect.md",cap:"Design information architecture, journeys and interaction systems."},
 {title:"UI Designer",division:"product",path:"design/design-ui-designer.md",cap:"Design polished interfaces, visual systems and product surfaces."},
 {title:"UX Researcher",division:"product",path:"design/design-ux-researcher.md",cap:"Research users, behaviours, needs and evidence behind product decisions."},
 {title:"Software Architect",division:"engineering",path:"engineering/engineering-software-architect.md",cap:"System architecture, technical trade-offs and scalable implementation plans."},
 {title:"AI Engineer",division:"engineering",path:"engineering/engineering-ai-engineer.md",cap:"AI integration, model workflows, deployment and production AI systems."},
 {title:"Backend Architect",division:"engineering",path:"engineering/engineering-backend-architect.md",cap:"APIs, databases, services, scalability and backend architecture."},
 {title:"Frontend Developer",division:"engineering",path:"engineering/engineering-frontend-developer.md",cap:"Production interfaces, frontend implementation and performance."},
 {title:"DevOps Automator",division:"engineering",path:"engineering/engineering-devops-automator.md",cap:"CI/CD, infrastructure automation, deployment and operational tooling."},
 {title:"Data Engineer",division:"engineering",path:"engineering/engineering-data-engineer.md",cap:"Data pipelines, ETL/ELT, warehousing and reliable data infrastructure."},
 {title:"Growth Hacker",division:"growth",path:"marketing/marketing-growth-hacker.md",cap:"Growth experiments, acquisition loops, activation and measurable demand."},
 {title:"Content Creator",division:"growth",path:"marketing/marketing-content-creator.md",cap:"Content systems, campaigns, editorial production and brand communication."},
 {title:"SEO Specialist",division:"growth",path:"marketing/marketing-seo-specialist.md",cap:"Search visibility, content optimisation and organic acquisition."},
 {title:"LinkedIn Content Creator",division:"growth",path:"marketing/marketing-linkedin-content-creator.md",cap:"Founder-led B2B content, distribution and professional audience growth."},
 {title:"PR & Communications Manager",division:"growth",path:"marketing/marketing-pr-communications-manager.md",cap:"Narrative, media communication, launches and reputation workflows."},
 {title:"Account Strategist",division:"revenue",path:"sales/sales-account-strategist.md",cap:"Account planning, buyer context, opportunity mapping and commercial strategy."},
 {title:"Outbound Strategist",division:"revenue",path:"sales/sales-outbound-strategist.md",cap:"Target-account research, outbound sequencing and pipeline creation."},
 {title:"Deal Strategist",division:"revenue",path:"sales/sales-deal-strategist.md",cap:"Deal strategy, qualification, objections, stakeholders and close planning."},
 {title:"Pipeline Analyst",division:"revenue",path:"sales/sales-pipeline-analyst.md",cap:"Pipeline diagnostics, conversion analysis, forecasting and next actions."},
 {title:"Financial Analyst",division:"finance",path:"finance/finance-financial-analyst.md",cap:"Financial analysis, unit economics, business cases and decision support."},
 {title:"FP&A Analyst",division:"finance",path:"finance/finance-fpa-analyst.md",cap:"Planning, forecasting, budgets, variance analysis and operating models."},
 {title:"Bookkeeper / Controller",division:"finance",path:"finance/finance-bookkeeper-controller.md",cap:"Financial records, controls, reconciliations and reporting discipline."},
 {title:"Customer Success Manager",division:"operations",path:"specialized/customer-success-manager.md",cap:"Onboarding, adoption, retention, customer health and expansion signals."},
 {title:"Operations Manager",division:"operations",path:"specialized/operations-manager.md",cap:"Operational systems, recurring processes, coordination and execution."},
 {title:"Data Privacy Officer",division:"governance",path:"specialized/data-privacy-officer.md",cap:"Privacy controls, data handling, compliance workflows and risk boundaries."},
 {title:"Automation Governance Architect",division:"governance",path:"specialized/automation-governance-architect.md",cap:"Agent permissions, controls, governance models and safe automation."},
 {title:"Reality Checker",division:"quality",path:"testing/testing-reality-checker.md",cap:"Challenge assumptions, inspect evidence and identify gaps before release."},
 {title:"Test Automation Engineer",division:"quality",path:"testing/testing-test-automation-engineer.md",cap:"Automated testing, regression coverage and repeatable quality gates."}
];
function initAgentDirectory(){
 const grid=$('#agent-directory-grid'),search=$('#agent-directory-search'),filters=$('#agent-filters button'),empty=$('#agent-directory-empty');
 if(!grid)return;
 let active='all';
 const labels={executive:'Executive',product:'Product + Design',engineering:'Engineering',growth:'Growth',revenue:'Revenue',finance:'Finance',operations:'Operations',governance:'Governance',quality:'Quality'};
 const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
 function render(){
  const q=(search?.value||'').trim().toLowerCase();
  const list=companyAgents.filter(a=>(active==='all'||a.division===active)&&(!q||(a.title+' '+a.division+' '+a.cap+' '+a.path).toLowerCase().includes(q)));
  grid.innerHTML=list.map((a,i)=>'<article class="agent-directory-card reveal show"><div class="agent-card-top"><span class="agent-index">'+String(i+1).padStart(2,'0')+'</span><span class="agent-division">'+esc(labels[a.division])+'</span></div><h3>'+esc(a.title)+'</h3><p>'+esc(a.cap)+'</p><div class="agent-card-bottom"><a href="https://github.com/Mutayibnissar/aethermesh/blob/main/'+a.path+'" target="_blank" rel="noopener">Repo agent ↗</a><button type="button" data-agent-task="'+esc(a.title)+'">Route work</button></div></article>').join('');
  if(empty)empty.hidden=list.length>0;
  $('[data-agent-task]',grid).forEach(b=>b.addEventListener('click',()=>{const input=$('#wf-input');if(input){input.value='Use the '+b.dataset.agentTask+' specialist to help with this business outcome';input.focus();document.querySelector('#command')?.scrollIntoView({behavior:'smooth',block:'start'})}}));
 }
 filters.forEach(b=>b.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));b.classList.add('active');active=b.dataset.agentFilter;render()}));
 search?.addEventListener('input',render);
 render();
}
initAgentDirectory();
\nconst form=$('#contact-form');form?.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(form);const title=encodeURIComponent('AetherMesh enquiry — '+(d.get('company')||'Company'));const body=encodeURIComponent('Name: '+d.get('name')+'\nEmail: '+d.get('email')+'\nCompany: '+d.get('company')+'\n\nWorkflow / objective:\n'+d.get('workflow'));location.href='https://github.com/Mutayibnissar/aethermesh/issues/new?title='+title+'&body='+body});
