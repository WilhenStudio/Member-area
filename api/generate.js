export default async function handler(req,res){
if(req.method!=="POST")return res.status(405).json({error:{message:"Method not allowed"}});
try{const{apiKey,prompt}=req.body||{};if(!apiKey||!prompt)return res.status(400).json({error:{message:"API Key atau prompt kosong."}});
const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":apiKey},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})});
return res.status(r.status).json(await r.json());}catch(e){return res.status(500).json({error:{message:e.message||"Server error"}});}}