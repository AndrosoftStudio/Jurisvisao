'use client'
import { useEffect, useState } from 'react'

export default function Header({ onSearch, onCategory, onToggleSidebar, sidebarCollapsed }:{ onSearch?:(q:string)=>void; onCategory?:(c:string)=>void; onToggleSidebar?:()=>void; sidebarCollapsed?:boolean }){
  const [q, setQ] = useState('')
  const [c, setC] = useState('')
  const [dark, setDark] = useState(false)

  useEffect(()=>{
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const d = saved ? saved === 'dark' : window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(d)
    document.documentElement.classList.toggle('dark', d)
  },[])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <header className="sticky top-0 z-50 border-b" style={{borderColor:'var(--border)', background:'var(--surface)'}}>
      <div className="container py-3 flex items-center gap-2">
        {onToggleSidebar && (
          <button className="btn" onClick={onToggleSidebar} title={sidebarCollapsed ? 'Abrir menu' : 'Recolher menu'}>☰</button>
        )}
        <a className="text-2xl font-bold flex items-center gap-2" href="/">
          <span>⚖️</span> <span>Legislação Brasil</span>
        </a>
        <div className="flex-1 flex items-center gap-2 ml-2">
          {onSearch && (
            <div className="flex-1 relative">
              <input
                value={q}
                onChange={e=>{ setQ(e.target.value); onSearch?.(e.target.value) }}
                placeholder="Buscar códigos por nome, sigla ou lei..."
                className="w-full rounded-lg border px-4 py-2 pl-9"
                style={{borderColor:'var(--border)', background:'var(--surface)'}}
              />
              <span className="absolute left-3 top-2.5">🔍</span>
            </div>
          )}
          {onCategory && (
            <select
              value={c}
              onChange={e=>{ setC(e.target.value); onCategory?.(e.target.value) }}
              className="rounded-lg border px-3 py-2"
              style={{borderColor:'var(--border)', background:'var(--surface)'}}
            >
              <option value="">Todas as categorias</option>
              <option value="Constitucional">📜 Constitucional</option>
              <option value="Cível">⚖️ Cível</option>
              <option value="Penal">🔒 Penal</option>
              <option value="Processual">⚙️ Processual</option>
            </select>
          )}
          <button className="btn" onClick={toggleDark} title="Alternar tema (claro/escuro)">
            {dark ? '🌙 Escuro' : '☀️ Claro'}
          </button>
        </div>
      </div>
    </header>
  )
}
