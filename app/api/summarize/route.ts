import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest){
  const body = await req.json()
  const text: string = body?.text || ''
  const apiKey = process.env.OPENAI_API_KEY // opcional
  if(!apiKey){
    // Fallback local: corte simples do caput + bullets de incisos (sem IA)
    const lines = text.split('\n').map(l=>l.trim()).filter(Boolean)
    const caput = lines[0] || ''
    const bullets = lines.filter(l=>/^[IVXLCDM]+\s*[-–—]/i.test(l)).slice(0,5).map(l=>l.replace(/^[IVXLCDM]+\s*[-–—]?\s*/,'')).join(' • ')
    const summary = caput + (bullets ? ' • ' + bullets : '')
    return NextResponse.json({ summary, provider: 'local-fallback' })
  }
  // Exemplo de uso com API externa (opcional). Precisa configurar OPENAI_API_KEY no ambiente.
  try{
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {role:'system', content:'Resuma de forma objetiva e jurídica o texto da Constituição fornecido.'},
          {role:'user', content: text}
        ],
        temperature: 0.2
      })
    })
    if(!res.ok){
      const err = await res.text()
      return NextResponse.json({ error: err || 'Erro da API' }, { status: 500 })
    }
    const data = await res.json()
    const summary = data?.choices?.[0]?.message?.content || ''
    return NextResponse.json({ summary, provider: 'openai' })
  }catch(e:any){
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
