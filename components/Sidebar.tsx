'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { UITree } from '@/lib/types'

const romanMap: Record<string, number> = {I:1, V:5, X:10, L:50, C:100, D:500, M:1000}
function romanToInt(s: string): number {
  s = (s||'').toUpperCase()
  let total = 0, prev = 0
  for (let i=s.length-1;i>=0;i--){
    const val = romanMap[s[i]] || 0
    total += val < prev ? -val : val
    prev = val
  }
  return total
}

function parseQuery(q: string): { article?: number, inciso?: string } {
  const t = q.trim().toLowerCase()
  if (!t) return {}
  // artigo 5 / art 5 / art. 5 / 5 / artigo v
  let m = t.match(/art(igo|\.)?\s*(\d+)/i)
  if (m) return { article: parseInt(m[2],10) }
  m = t.match(/^\s*(\d+)\s*$/)
  if (m) return { article: parseInt(m[1],10) }
  m = t.match(/art(igo)?\s*([ivxlcdm]+)/i)
  if (m) return { article: romanToInt(m[2].toUpperCase()) }

  // inciso 2 / inciso II
  m = t.match(/inc(is|s)?o?\s*(\d+)/i)
  if (m) return { inciso: m[2] }
  m = t.match(/inc(is|s)?o?\s*([ivxlcdm]+)/i)
  if (m) return { inciso: String(romanToInt(m[2].toUpperCase())) }
  return {}
}

export default function Sidebar({ tree }:{ tree: UITree }) {
  const [open, setOpen] = useState<Record<string, boolean>>({}) // default: fechado
  const [query, setQuery] = useState('')
  const router = useRouter()

  const go = () => {
    const p = parseQuery(query)
    if (p.article){
      router.push(`/artigos/${p.article}`)
    }
  }

  const key = (parts: (string|number)[]) => parts.join('-')

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3 className="text-sm text-[var(--muted)]">Navegação</h3>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={e=>setQuery(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter') go() }}
            placeholder="ex: art 5, artigo V, inciso II"
            className="rounded-md border px-2 py-1 text-sm"
            style={{borderColor:'var(--border)', background:'var(--surface)'}}
          />
          <button className="btn text-sm" onClick={go}>Ir</button>
        </div>
      </div>
      <div className="sidebar-body">
        <div className="space-y-3">
          {(tree.titulos||[]).map((t, ti) => {
            const tk = key(['t',ti])
            const isOpen = open[tk] ?? false
            return (
              <div key={tk}>
                <button className="w-full text-left" onClick={()=>setOpen(s=>({...s,[tk]:!isOpen}))}>
                  <div className="flex items-center justify-between">
                    <div><span className="mr-2">{isOpen ? '📕' : '📘'}</span><b>TÍTULO {t.numero}</b></div>
                    <span className="text-xs text-[var(--muted)]">{t.nome}</span>
                  </div>
                </button>
                {isOpen && (
                  <div className="pl-2 mt-2 space-y-2">
                    {(t.artigos||[]).map(a => (
                      <div key={a.slug}>
                        <Link href={`/artigos/${a.slug}`} className="block text-sm hover:underline">Art. {a.numero}</Link>
                      </div>
                    ))}
                    {(t.capitulos||[]).map((c, ci) => {
                      const ck = key(['t',ti,'c',ci])
                      const cOpen = open[ck] ?? false
                      return (
                        <div key={ck} className="pl-2">
                          <button onClick={()=>setOpen(s=>({...s,[ck]:!cOpen}))} className="text-left">
                            <div className="flex items-center justify-between">
                              <div><span className="mr-2">{cOpen ? '📖' : '📔'}</span><b>CAPÍTULO {c.numero}</b></div>
                              <span className="text-xs text-[var(--muted)]">{c.nome}</span>
                            </div>
                          </button>
                          {cOpen && (
                            <div className="pl-2 mt-2 space-y-1">
                              {(c.artigos||[]).map(a => (
                                <div key={a.slug}><Link href={`/artigos/${a.slug}`} className="block text-sm hover:underline">Art. {a.numero}</Link></div>
                              ))}
                              {(c.secoes||[]).map((s, si) => {
                                const sk = key(['t',ti,'c',ci,'s',si])
                                const sOpen = open[sk] ?? false
                                return (
                                  <div key={sk} className="pl-2">
                                    <button onClick={()=>setOpen(o=>({...o,[sk]:!sOpen}))} className="text-left text-xs text-[var(--muted)] mb-1">
                                      Seção {s.numero} — {s.nome} {sOpen?'▾':'▸'}
                                    </button>
                                    {sOpen && (s.artigos||[]).map(a => (
                                      <div key={a.slug}><Link href={`/artigos/${a.slug}`} className="block text-sm hover:underline">Art. {a.numero}</Link></div>
                                    ))}
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
