import { useState } from "react";
import api from "../api/axios";

const AIChatBox=({note})=>{
    const [question,setQuestion]=useState("")
    const [messages,setMessages]=useState([])
    const [loading,setLoading]=useState(false)

    const askAI=async()=>{
        if (!question.trim()) return
        try{
            setLoading(true)
            setMessages(prev=>[...prev,
                {role:"user",text:question}
            ])
            const result=await api.post(`/ai/ask/${note.id}`,{
                 question:question
            })
            setMessages(prev=>[
                ...prev,{role:"ai",text:result.data}
            ]) 

            setQuestion("")
        }catch(err){
            console.error("Error asking AI:",err)
        }finally{
            setLoading(false)
        }
    }
    return(
            <div className="fixed right-0 top-0 h-full w-96 bg-gray-50 shadow-lg flex flex-col z-50">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                   {messages.map((msg,index)=>(
                    <div key={index}
                    className={`p-3 rounded-lg max-w-xs ${
                msg.role === "user"
                ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white ml-auto"
                : "bg-gray-100 text-gray-800"
                }`}>
                {msg.text}
                </div>
                   ))}
                </div>
                <div className="flex gap-2 my-2 mx-1">
                    <input 
                    type="text"
                    value={question}
                    onChange={(e)=>setQuestion(e.target.value)}
                    onKeyDown={(e)=>e.key==="Enter" && askAI()}
                    placeholder="Ask AI about this note"
                    className="border p-2 rounded w-full"/>
                
                <button className="bg-green-500 text-white rounded p-3 hover:cursor-pointer"
                onClick={askAI}
                disabled={loading}>
                    {loading?"Thinking...":"Ask"}
                </button>
                </div>
            </div>
    )
}

export default AIChatBox