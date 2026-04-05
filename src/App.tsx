import { useState } from 'react'
import { LicitacaoCard } from './components/LicitacaoCard'
import { SearchBar } from './components/SearchBar'
import { buscarLicitacoes } from './services/api'

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

        * { box-sizing: border-box; }
        body { margin: 0; background: #2c2c2c; }

        .card {
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 12px;
          padding: 24px;
          margin-top: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          cursor: pointer;
          position: relative;
        }

        .card:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(200,170,110,0.4);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.4);
        }

        .tag {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          padding: 4px 12px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.5px;
        }

        .tag:hover {
          background: rgba(255,255,255,0.12);
        }

        .tag.active {
          background: rgba(200,170,110,0.15);
          border-color: rgba(200,170,110,0.5);
          color: #c8aa6e;
        }

        .buscar-btn {
          background: #c8aa6e;
          color: #1a1a1a;
          border: none;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 17px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 1px;
        }

        .buscar-btn:hover {
          background: #d4ba80;
          box-shadow: 0 4px 20px rgba(200,170,110,0.3);
          transform: translateY(-1px);
        }

        .buscar-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .input-busca {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 14px 18px;
          font-size: 17px;
          color: #e8e0d0;
          font-family: 'DM Sans', sans-serif;
          outline: none;
          transition: all 0.2s;
        }

        .input-busca:focus {
          border-color: rgba(200,170,110,0.5);
          background: rgba(255,255,255,0.08);
        }

        .nota-badge {
          font-size: 28px;
          font-weight: 700;
          font-family: 'DM Sans', sans-serif;
        }

        .loader {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 40px;
        }

        .loader span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c8aa6e;
          animation: bounce 1s infinite;
        }

        .loader span:nth-child(2) { animation-delay: 0.2s; }
        .loader span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.3; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>

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