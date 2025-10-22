import type { CF88, UIArticle, UITree } from './types'

function composeArticleText(a: any): string {
  const parts: string[] = []
  if (a.caput) parts.push(a.caput.trim())
  for (const p of a.paragrafos || []) {
    if (p.tipo === 'único') parts.push(`Parágrafo único. ${p.texto}`)
    else {
      const n = p.numero != null ? `${p.numero}º` : ''
      parts.push(`§ ${n} ${p.texto}`.trim())
    }
  }
  for (const i of a.incisos || []) {
    parts.push(`${i.romano} - ${i.texto}`)
    for (const al of i.alineas || []) parts.push(`${al.letra}) ${al.texto}`)
  }
  for (const note of a.notas || []) parts.push(note)
  return parts.join('\n')
}

const digits = (s:string)=> (s||'').toString().replace(/\D+/g, '') || (s||'').toString()

export function cfJsonToUITree(cf: CF88): UITree {
  const tree: UITree = { titulos: [], artigos: [] }
  const push = (holder: UIArticle[], art: any, ctx: {titulo: string|null, capitulo: string|null, secao: string|null}) => {
    const numero = String(art.numero)
    const slug = digits(numero)
    const item: UIArticle = {
      numero,
      slug,
      titulo: `Art. ${numero}`,
      texto: composeArticleText(art),
      hierarquia: { titulo: ctx.titulo, capitulo: ctx.capitulo, secao: ctx.secao }
    }
    holder.push(item)
    tree.artigos.push(item)
  }

  for (const t of cf.estrutura || []) {
    const tUI = { numero: t.numero_romano || '', nome: t.nome || '', capitulos: [] as any[], artigos: [] as UIArticle[] }
    for (const a of t.artigos || []) push(tUI.artigos, a, { titulo: t.nome || null, capitulo: null, secao: null })
    for (const c of t.capitulos || []) {
      const cUI = { numero: c.numero_romano || '', nome: c.nome || '', secoes: [] as any[], artigos: [] as UIArticle[] }
      for (const a of c.artigos || []) push(cUI.artigos, a, { titulo: t.nome || null, capitulo: c.nome || null, secao: null })
      for (const s of c.secoes || []) {
        const sUI = { numero: s.numero_romano || '', nome: s.nome || '', artigos: [] as UIArticle[] }
        for (const a of s.artigos || []) push(sUI.artigos, a, { titulo: t.nome || null, capitulo: c.nome || null, secao: s.nome || null })
        cUI.secoes.push(sUI)
      }
      tUI.capitulos.push(cUI)
    }
    tree.titulos.push(tUI as any)
  }
  return tree
}
