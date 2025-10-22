'use client'
import { useState } from 'react'

export default function SummaryBar({ text }:{ text: string }){
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [provider, setProvider] = useState('')

  const run = async ()=>{
    setLoading(true)
    setSummary(null)
    try{
      const res = await fetch('/api/summarize', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text }) })
      const data = await res.json()
      setSummary(data.summary || data.error || 'Sem resposta')
      setProvider(data.provider || 'n/a')
    }catch(e:any){
      setSummary('Erro ao resumir')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="card p-3 flex items-center gap-3">
      <button className="btn btn-primary" onClick={run} disabled={loading}>{loading ? 'Resumindo...' : 'Gerar resumo'}</button>
      {summary && <div className="text-sm"><b>Resumo ({provider})</b>: {summary}</div>}
    </div>
  )
}
