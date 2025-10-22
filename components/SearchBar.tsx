'use client'
import { useState, useMemo } from 'react'
import type { UIArticle } from '@/lib/types'

export default function SearchBar({ artigos, onFilter }:{artigos:UIArticle[], onFilter:(a:UIArticle[])=>void}){
  const [q, setQ] = useState('')
  const filtered = useMemo(()=>{
    const t = q.trim().toLowerCase()
    if(!t) return artigos
    return artigos.filter(a => (a.numero+' '+a.titulo+' '+a.texto+' '+Object.values(a.hierarquia).join(' ')).toLowerCase().includes(t))
  }, [q, artigos])
  return (
    <div className="mb-4">
      <input
        value={q}
        onChange={e=>{ setQ(e.target.value); onFilter(filtered) }}
        placeholder="Pesquisar por número, texto, título/capítulo/seção..."
        className="w-full rounded-xl bg-slate-800/50 border border-[var(--border)] px-4 py-2 outline-none"
      />
    </div>
  )
}
