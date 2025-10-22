import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CF/88 — Portal Local',
  description: 'Constituição Federal (dados locais em JSON)',
}

export default function RootLayout({ children }:{ children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <div className="container py-8">
          {children}
          <footer className="mt-12 text-sm text-center text-slate-400">
            <div>© {new Date().getFullYear()} CF/88 Local. Sem uso de APIs — dados em <code>/public/dados/cf88.json</code>.</div>
          </footer>
        </div>
      </body>
    </html>
  )
}
