export default function ArticleView({ numero, texto, breadcrumb }:{ numero:string; texto:string; breadcrumb:string[] }){
  const clean = (texto||'').split('\n').filter(seg => {
    const s = seg.trim()
    // remove se esta linha introduz outro artigo (Art. X) diferente do atual
    const m = s.match(/^Art\.?\s*(\d+)/i)
    return !m || m[1] === String(numero).replace(/\D+/g,'')
  })
  return (
    <div className="article">
      <div className="mb-4 text-sm text-[var(--color-text-secondary)]">
        {breadcrumb.join(' › ')}
      </div>
      <h2 className="text-2xl font-bold mb-4">Constituição Federal de 1988 — Art. {numero}</h2>
      <div className="prose prose-slate max-w-none">
        {clean.map((seg, i)=>{
          const s = seg.trim()
          if(!s) return null
          if(/^§/.test(s)) return <div key={i} className="paragrafo">📝 <strong>Parágrafo:</strong> {s}</div>
          if(/^(I{1,3}|IV|V|VI{0,3}|VII{0,3}|IX|X{1,3})\s*[-–—]/.test(s)){
            const num = s.match(/^(I{1,3}|IV|V|VI{0,3}|VII{0,3}|IX|X{1,3})/)?.[1]
            return <div key={i} className="inciso">🔸 <strong>Inciso {num}:</strong> {s.replace(/^(I{1,3}|IV|V|VI{0,3}|VII{0,3}|IX|X{1,3})\s*[-–—]?\s*/, '')}</div>
          }
          if(/^[a-z]\)/.test(s)) return <div key={i} className="alinea">• <strong>Alínea:</strong> {s}</div>
          return <p key={i}>{s}</p>
        })}
      </div>
    </div>
  )
}
