import { promises as fs } from 'fs'
import path from 'path'
import type { CF88, UITree, UIArticle } from './types'
import { cfJsonToUITree } from './transform'

function emptyTree(): UITree {
  return { titulos: [], artigos: [] }
}

export async function loadUITree(): Promise<UITree> {
  try {
    const file = path.join(process.cwd(), 'public', 'dados', 'cf88.json')
    const raw = await fs.readFile(file, 'utf-8')
    const cf: CF88 = JSON.parse(raw)
    return cfJsonToUITree(cf)
  } catch (err) {
    // Se o arquivo não existir ou estiver inválido, retorna árvore vazia
    return emptyTree()
  }
}

export async function loadArticle(numero: string): Promise<UIArticle | undefined> {
  const tree = await loadUITree()
  return tree.artigos.find(a => a.numero === numero)
}
