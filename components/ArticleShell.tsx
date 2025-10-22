'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import ArticleView from '@/components/ArticleView'
import SummaryBar from '@/components/SummaryBar'
import Link from 'next/link'
import type { UITree, UIArticle } from '@/lib/types'

export default function ArticleShell({ tree, artigo }:{ tree: UITree; artigo?: UIArticle }){
  const [collapsed, setCollapsed] = useState(false)
  return (
    <div>
      <Header onToggleSidebar={()=>setCollapsed(v=>!v)} sidebarCollapsed={collapsed} />
      <main className="container py-6">
        <div className="mb-4">
          <Link href="/" className="text-sm text-[var(--muted)] hover:underline">Voltar</Link>
        </div>
        <h1 className="text-3xl font-bold mb-4">Constituição Federal de 1988 — Artigo {artigo?.numero}</h1>

        <div className={collapsed ? "grid gap-6 grid-cols-1" : "grid gap-6 grid-cols-[320px_1fr]"}>
          {!collapsed && <Sidebar tree={tree} />}
          <div className="space-y-4">
            <div className="flex justify-end">
              <Link href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm" className="btn" target="_blank">Site do Planalto</Link>
            </div>
            {artigo ? (
              <>
                <SummaryBar text={artigo.texto} />
                <ArticleView
                  numero={artigo.slug}
                  texto={artigo.texto}
                  breadcrumb={[artigo.hierarquia.titulo||'Título', artigo.hierarquia.capitulo||'Capítulo', artigo.hierarquia.secao||'Seção', `Art. ${artigo.numero}`].filter(Boolean)}
                />
              </>
            ) : (
              <div className="article">
                <p className="text-[var(--muted)]">Artigo não encontrado ou dados ausentes. Verifique o arquivo <code>public/dados/cf88.json</code>.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
