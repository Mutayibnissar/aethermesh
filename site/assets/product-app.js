const PRODUCTS={
meshops:{name:"MeshOps",kicker:"WORKFLOW OPERATING SYSTEM",summary:"Turn recurring business processes into governed AI workflows with explicit routing, evaluation and human-controlled commits.",owner:"COO / OPERATIONS",risk:"REVIEW",eval:94,cta:"diagnostic",agents:["Workflow Architect","Operations Manager","Project Manager","Automation Governance Architect"],steps:["Intake workflow","Route specialists","Plan dependencies","Evaluate output","Human commit"],scope:["Recurring operational workflows","Approval-aware task orchestration","Workflow measurement and optimization"]},
meshguard:{name:"MeshGuard",kicker:"AGENT GOVERNANCE",summary:"Inventory, evaluate and control AI systems with policies, approval boundaries, audit trails and rollback-ready operating rules.",owner:"CIO / AI LEAD",risk:"HIGH-CONTROL",eval:97,cta:"pilot",agents:["Automation Governance Architect","Data Privacy Officer","Agentic Identity & Trust","Reality Checker"],steps:["Inventory agents","Classify risk","Apply policy","Run evaluation","Approve boundary"],scope:["Agent inventory and permissions","Policy and evaluation controls","Audit and human approval boundaries"]},
meshsupport:{name:"MeshSupport",kicker:"CUSTOMER OPERATIONS",summary:"Prepare consistent customer resolutions by combining classification, evidence retrieval, workflow routing and quality gates.",owner:"CUSTOMER OPERATIONS",risk:"REVIEW",eval:94,cta:"pilot",agents:["Customer Support","Support Response Composer","Knowledge Manager","Quality Assurance"],steps:["Classify request","Retrieve evidence","Prepare resolution","Quality gate","Human response"],scope:["Ticket classification and routing","Evidence-backed response preparation","Quality and escalation controls"]},
meshrevenue:{name:"MeshRevenue",kicker:"REVENUE OPERATIONS",summary:"Research accounts, map buyer context, qualify opportunities and prepare next actions across the revenue workflow.",owner:"REVOPS",risk:"REVIEW",eval:93,cta:"pilot",agents:["Sales Strategist","Account Researcher","Lead Generation Specialist","Pipeline Analyst"],steps:["Research account","Map buyer context","Score opportunity","Prepare next action","Human approval"],scope:["Account and buyer research","Qualification and CRM preparation","Next-action and pipeline workflows"]},
meshdesk:{name:"MeshDesk",kicker:"AI IT OPERATIONS",summary:"Triage incidents, gather evidence, form diagnoses and prepare remediation while keeping consequential actions behind policy gates.",owner:"IT OPERATIONS",risk:"HIGH-CONTROL",eval:96,cta:"pilot",agents:["DevOps Automator","SRE","API Tester","Reality Checker"],steps:["Classify incident","Gather evidence","Form diagnosis","Prepare remediation","Human commit"],scope:["Incident triage and evidence gathering","Diagnosis preparation","Approval-gated remediation workflows"]},
meshfinops:{name:"MeshFinOps",kicker:"AI COST CONTROL",summary:"Make model and workflow spend visible, route workloads intelligently and establish cost ceilings around AI execution.",owner:"FINANCE / AI OPS",risk:"CONTROLLED",eval:95,cta:"diagnostic",agents:["Finance","Financial Modeler","Business Case Builder","Operations Manager"],steps:["Measure usage","Map cost drivers","Model alternatives","Set controls","Review spend"],scope:["AI usage and cost visibility","Model routing economics","Budget and workflow cost controls"]},
meshdata:{name:"MeshData",kicker:"AI READINESS LAYER",summary:"Assess data quality, context, permissions and integration gaps before AI workflows reach production.",owner:"DATA / STRATEGY",risk:"CONTROLLED",eval:92,cta:"diagnostic",agents:["Data Engineer","Data Scientist","Knowledge Manager","Security Engineer"],steps:["Map sources","Assess quality","Check permissions","Design context","Approve readiness"],scope:["Data quality and readiness","Knowledge and context structures","Integration and permission mapping"]},
meshintel:{name:"MeshIntel",kicker:"MARKET INTELLIGENCE",summary:"Continuously collect, verify and synthesize market, competitor, technology and regulatory signals into decision-ready briefs.",owner:"STRATEGY",risk:"REVIEW",eval:91,cta:"diagnostic",agents:["Trend Researcher","Competitive Intelligence Analyst","Technology Researcher","Strategy Consultant"],steps:["Collect signals","Verify sources","Analyse movement","Synthesize brief","Human review"],scope:["Market and competitor monitoring","Evidence-backed research briefs","Technology and regulatory signal tracking"]}
};
const esc=v=>String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",""":"&quot;","'":"&#39;"}[m]));
const key=new URLSearchParams(location.search).get("product")||"meshops";
const p=PRODUCTS[key]||PRODUCTS.meshops;
document.title=p.name+" — AetherMesh";
const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
set("product-kicker",p.kicker);set("product-title",p.name);set("product-summary",p.summary);set("product-owner","OWNER: "+p.owner);set("product-risk","RISK: "+p.risk);set("scope-title",p.name+" scope.");set("scope-copy","A focused product surface over the shared AetherMesh execution and governance layer.");
const cta=document.getElementById("product-cta");if(cta)cta.href="./contact.html?offer="+p.cta;
document.getElementById("scope-grid").innerHTML=p.scope.map((x,i)=>'<article class="card reveal show"><span class="num">0'+(i+1)+'</span><h3>'+esc(x)+'</h3><p>Designed as a governed workflow capability, with explicit ownership, evaluation and control boundaries.</p></article>').join("");
document.getElementById("agent-total").textContent=String(p.agents.length).padStart(2,"0");
document.getElementById("agent-roster").innerHTML=p.agents.map((x,i)=>'<div class="roster-row"><span class="roster-num">0'+(i+1)+'</span><div><b>'+esc(x)+'</b><small>specialist role · repository agent</small></div><span class="roster-state">READY</span></div>').join("");
document.getElementById("workflow-graph").innerHTML=p.steps.map((x,i)=>'<div class="workflow-node" data-step="'+i+'"><span>'+String(i+1).padStart(2,"0")+'</span><b>'+esc(x)+'</b><small>controlled stage</small></div>').join("");
document.getElementById("eval-score").textContent="EVAL "+p.eval+" / 100";
const run=document.getElementById("demo-run"),state=document.getElementById("demo-state");
async function runLiveRuntime(task){
 const base=(window.AETHERMESH_RUNTIME_ENDPOINT||"").trim().replace(/\\/$/,"");
 if(!base)return null;
 try{
  const r=await fetch(base+"/api/workforce",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({task})});
  if(!r.ok)throw new Error("runtime "+r.status);
  return await r.json();
 }catch(e){console.warn("AetherMesh runtime unavailable; using product demo.",e);return null;}
}
run?.addEventListener("click",async()=>{
 const nodes=[...document.querySelectorAll(".workflow-node")];let i=0;clearInterval(window.productTimer);
 state.textContent="CONNECTING";set("metric-state","CONNECTING");set("metric-eval","—");
 nodes.forEach(n=>n.classList.remove("active","complete"));
 const live=await runLiveRuntime(p.name+" workflow: "+p.summary);
 if(live?.ok){
  state.textContent="RUNTIME CONNECTED";set("metric-state","CONNECTED");
  const routed=Array.isArray(live.routed)?live.routed.length:0;
  const decision=live.policy?.decision||"review";
  set("metric-eval",live.evaluation?.score?String(live.evaluation.score):p.eval+" / 100");
  set("metric-gate",decision.toUpperCase());
  set("agent-total",String(routed).padStart(2,"0"));
  nodes.forEach(n=>n.classList.add("complete"));
  return;
 }
 state.textContent="DEMO MODE";set("metric-state","DEMO");
 window.productTimer=setInterval(()=>{if(i<nodes.length){nodes[i].classList.add("active");if(i)nodes[i-1].classList.remove("active"),nodes[i-1].classList.add("complete");i++;}else{clearInterval(window.productTimer);nodes.at(-1)?.classList.remove("active");nodes.at(-1)?.classList.add("complete");state.textContent="COMPLETE";set("metric-state","COMPLETE");set("metric-eval",p.eval+" / 100");}},430);
});
