'use client'
import { useMemo, useState } from 'react'
import type { UIArticle } from '@/lib/types'
import SearchBar from './SearchBar'

export default function ArticleSearchPanel({ artigos }:{ artigos: UIArticle[] }){
  const [filtered, setFiltered] = useState<UIArticle[]>(artigos || [])
  const total = artigos?.length || 0
  const shown = filtered?.length || 0

  return (
    <div className="card p-5">
      <SearchBar artigos={artigos||[]} onFilter={setFiltered} />
      <div className="text-sm text-[var(--muted)] mb-2">
        {total ? `Mostrando ${shown} de ${total} artigos` : 'Nenhum artigo disponível'}
      </div>
      {!shown && (
        <div className="text-sm text-[var(--muted)]">Nenhum resultado para sua busca.</div>
      )}
      {!!shown && (
        <ul className="space-y-2 mt-2">
          {filtered.map(a => (
            <li key={a.numero}>
              <a className="underline" href={`/artigos/${a.numero}`}>Art. {a.numero}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
