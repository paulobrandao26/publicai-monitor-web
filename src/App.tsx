import { useState } from 'react'
import { LicitacaoCard } from './components/LicitacaoCard'
import { SearchBar } from './components/SearchBar'
import { buscarLicitacoes } from './services/api'
import './styles/global.css'

interface Licitacao {
  id: string
  objeto: string
  orgao: string
  valor: number
  prazo: string
  nota: number
  justificativa: string
  palavrasChave: string[]
}

function App() {
  const [palavra, setPalavra] = useState('')
  const [licitacoes, setLicitacoes] = useState<Licitacao[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [expandido, setExpandido] = useState<string | null>(null)

  async function handleBuscar() {
    if (!palavra) return
    setLoading(true)
    setErro('')
    setLicitacoes([])

    try {
      const resultado = await buscarLicitacoes(palavra)
      setLicitacoes(resultado)
    } catch (e) {
      setErro('Erro ao buscar licitações. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#2c2c2c',
      fontFamily: "'DM Sans', sans-serif",
      color: '#e8e0d0',
      padding: '40px 20px',
    }}>
      

      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '4px', color: '#c8aa6e', marginBottom: '12px' }}>
            ◆ POWERED BY AI ◆
          </div>
          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            margin: 0,
            color: '#e8e0d0',
            whiteSpace: 'nowrap',
          }}>
            PublicAI Monitor
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '8px', fontSize: '16px' }}>
            Radar de licitações públicas para empresas de tecnologia
          </p>
        </div>

        {/* Search */}
        <SearchBar
          palavra={palavra}
          loading={loading}
          onChange={setPalavra}
          onBuscar={handleBuscar}
        />

        {/* Loading */}
        {loading && (
          <div>
            <div className="loader">
              <span /><span /><span />
            </div>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '13px', marginTop: '16px' }}>
              Analisando licitações com IA... isso pode levar até 30 segundos
            </p>
          </div>
        )}

        {/* Erro */}
        {erro && <p style={{ color: '#ff4466', marginTop: '24px', textAlign: 'center' }}>{erro}</p>}

        {/* Sem resultados */}
        {!loading && !erro && licitacoes.length === 0 && palavra && (
          <p style={{ marginTop: '40px', color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
            😕 Nenhuma licitação encontrada para "<strong style={{ color: '#fff' }}>{palavra}</strong>"
          </p>
        )}

        {/* Cards */}
        {licitacoes.map((lic) => (
          <LicitacaoCard
            key={lic.id}
            licitacao={lic}
            expandido={expandido === lic.id}
            onToggle={() => setExpandido(expandido === lic.id ? null : lic.id)}
          />
        ))}

      </div>
    </div>
  )
}

export default App