'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import type { CodeCard } from '@/lib/codes'
export default function CodesGrid({ codes, q, cat }:{ codes: CodeCard[]; q:string; cat:string }){
  const filtered = useMemo(()=>{
    const term = q.toLowerCase()
    return codes.filter(c=>{
      const matchesQ = !term ||
        c.nome.toLowerCase().includes(term) ||
        c.sigla.toLowerCase().includes(term) ||
        (c.lei||'').toLowerCase().includes(term) ||
        c.descricao.toLowerCase().includes(term)
      const matchesCat = !cat || c.categoria===cat
      return matchesQ && matchesCat
    })
  },[codes,q,cat])
  return (
    <>
      <div className="text-sm text-[var(--color-text-secondary)] mb-4">
        {filtered.length === codes.length ? `Mostrando ${filtered.length} códigos` : `Mostrando ${filtered.length} de ${codes.length} códigos`}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(c=>{
          const status = c.available ? '✅ DISPONÍVEL' : '⏳ EM BREVE'
          const btn = c.available ? (
            <Link href="/artigos/1" className="card-button btn btn-primary w-full text-center">📚 Ver Artigos</Link>
          ) : (
            <a href={c.url||'#'} target="_blank" className="card-button btn w-full text-center">🏛️ Ver no Planalto</a>
          )
          return (
            <div key={c.id} className="card p-6 relative">
              <div className="absolute left-0 top-0 h-1 w-full" style={{background:'var(--color-primary)'}}/>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold">{c.nome} <span className={`ml-2 text-[10px] px-2 py-0.5 rounded-full text-white ${c.available?'bg-emerald-600':'bg-amber-600'}`}>{status}</span></h3>
                  <div className="text-slate-500 font-bold">{c.sigla}</div>
                </div>
                <span className="text-xs text-white px-2 py-1 rounded-full" style={{background:'var(--color-primary)'}}>{c.categoria}</span>
              </div>
              <div className="text-sm text-[var(--muted)] mb-1">{c.lei || '—'}</div>
              <p className="mb-4">{c.descricao}</p>
              {btn}
            </div>
          )
        })}
      </div>
    </>
  )
}
