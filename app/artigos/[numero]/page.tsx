import { loadUITree } from '@/lib/load'
import ArticleShell from '@/components/ArticleShell'

export default async function ArtigoPage({ params }:{ params: { numero: string } }) {
  const { numero } = params
  const tree = await loadUITree()
  const artigo = tree.artigos.find(a => a.slug === numero)
  return <ArticleShell tree={tree} artigo={artigo} />
}
