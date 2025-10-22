'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import CodesGrid from '@/components/CodesGrid'
import { codes } from '@/lib/codes'

export default function Home(){
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')

  return (
    <div>
      <Header onSearch={setQ} onCategory={setCat} />
      <main className="container py-10">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#1e3a8a]">Portal da Legislação Brasileira</h1>
          <p className="text-lg text-[var(--color-text-secondary)] mt-2 max-w-2xl mx-auto">
            Acesse os principais códigos e leis do Brasil de forma organizada e prática. Dados locais (sem APIs).
          </p>
        </section>
        <CodesGrid codes={codes} q={q} cat={cat} />
      </main>
    </div>
  )
}
