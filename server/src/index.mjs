import http from "node:http";
import { discoverAgents } from "../../runtime/src/agent-parser.mjs";
import { routeTask } from "../../runtime/src/router.mjs";
import { planWorkflow } from "../../runtime/src/workflow.mjs";
import { evaluatePolicy } from "../../runtime/src/policy.mjs";
import { evaluateRun } from "../../runtime/src/eval.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname=path.dirname(fileURLToPath(import.meta.url));
const repoRoot=path.resolve(__dirname,"../..");
const agentRoot=process.env.AETHER_AGENT_ROOT?path.resolve(repoRoot,process.env.AETHER_AGENT_ROOT):repoRoot;
const PORT=Number(process.env.PORT||8787);
const ORIGIN=process.env.AETHER_CORS_ORIGIN||"*";
const agents=discoverAgents(agentRoot);

const roles=[
 ["Strategy Lead",/strategy|ceo|business|consult/i],
 ["Research Analyst",/research|market|intel|analyst/i],
 ["Product Lead",/product|design|ux|roadmap/i],
 ["Engineering Lead",/engineer|developer|software|architect|security|qa/i],
 ["Growth Operator",/marketing|growth|content|seo|paid/i],
 ["Revenue Operator",/sales|revenue|lead|crm|outbound/i],
 ["Governance Lead",/governance|risk|compliance|audit|security/i],
 ["Project Manager",/project|program|delivery|operations/i]
];

function json(res,status,data){
 const body=JSON.stringify(data);
 res.writeHead(status,{"content-type":"application/json; charset=utf-8","access-control-allow-origin":ORIGIN,"access-control-allow-methods":"GET,POST,OPTIONS","access-control-allow-headers":"content-type","cache-control":"no-store"});
 res.end(body);
}
function readBody(req){return new Promise((resolve,reject)=>{let b="";req.on("data",c=>{b+=c;if(b.length>200000)req.destroy(new Error("payload too large"))});req.on("end",()=>{try{resolve(b?JSON.parse(b):{})}catch(e){reject(e)}});req.on("error",reject)})}
function matchesForRole(task,rx){return agents.filter(a=>rx.test(a.id+" "+a.title+" "+a.description)).slice(0,3)}
function workforce(task){
 const selected=[];
 for(const [role,rx] of roles){const hits=matchesForRole(task,rx);if(hits.length)selected.push({role,agents:hits.map(a=>({id:a.id,title:a.title,description:a.description}))})}
 if(!selected.length)selected.push({role:"Strategy Lead",agents:routeTask(task,agents,3).map(x=>({id:x.agent.id,title:x.agent.title,description:x.agent.description}))});
 return selected;
}
async function handler(req,res){
 if(req.method==="OPTIONS")return json(res,204,{});
 const url=new URL(req.url,"http://localhost");
 if(url.pathname==="/api/health")return json(res,200,{ok:true,service:"aethermesh-runtime",agents:agents.length,node:process.version});
 if(url.pathname==="/api/agents"&&req.method==="GET")return json(res,200,{count:agents.length,agents:agents.map(a=>({id:a.id,title:a.title,description:a.description}))});
 if(url.pathname==="/api/workforce"&&req.method==="POST"){
   const b=await readBody(req);const task=String(b.task||"").trim();if(!task)return json(res,400,{error:"task is required"});
   const policy=evaluatePolicy(task);const routed=routeTask(task,agents,8);const plan=planWorkflow(task,routed);
   return json(res,200,{ok:true,task,policy,routed:routed.map(x=>({id:x.agent.id,title:x.agent.title,score:x.score})),plan,workforce:workforce(task),evaluation:evaluateRun({policy,matches:routed,total:plan.steps.length,completed:0})});
 }
 if(url.pathname==="/api/workflow/plan"&&req.method==="POST"){
   const b=await readBody(req);const task=String(b.task||"").trim();if(!task)return json(res,400,{error:"task is required"});
   const policy=evaluatePolicy(task);const routed=routeTask(task,agents,5);const plan=planWorkflow(task,routed);
   return json(res,200,{ok:true,task,policy,plan,evaluation:evaluateRun({policy,matches:routed,total:plan.steps.length,completed:0})});
 }
 return json(res,404,{error:"not_found"});
}
http.createServer((req,res)=>handler(req,res).catch(e=>json(res,500,{error:"server_error",message:e.message}))).listen(PORT,()=>console.log("AetherMesh runtime API listening on :"+PORT));