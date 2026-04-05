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

interface Props {
  licitacao: Licitacao
  expandido: boolean
  onToggle: () => void
}

function getNotaColor(nota: number) {
  if (nota >= 7) return '#00ff88'
  if (nota >= 4) return '#ffaa00'
  return '#ff4466'
}

export function LicitacaoCard({ licitacao: lic, expandido, onToggle }: Props) {
  return (
    <div className="card" onClick={onToggle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '13px', color: '#c8aa6e', letterSpacing: '2px', marginBottom: '6px' }}>
            {lic.orgao}
          </div>
          <div style={{ fontSize: '17px', fontWeight: 600, lineHeight: 1.5, color: '#e8e0d0' }}>
            {lic.objeto}
          </div>
          <div style={{ display: 'flex', gap: '20px', marginTop: '12px', fontSize: '15px', color: '#c8aa6e' }}>
            <span>💰 R$ {lic.valor?.toLocaleString('pt-BR')}</span>
            <span>📅 {new Date(lic.prazo).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
        <div style={{ textAlign: 'center', minWidth: '60px' }}>
          <div className="nota-badge" style={{ color: getNotaColor(lic.nota) }}>
            {lic.nota}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)' }}>/10</div>
        </div>
      </div>

      {expandido && (
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <p style={{ fontSize: '16px', color: '#e8e0d0', lineHeight: 1.7, margin: '0 0 16px' }}>
            🤖 {lic.justificativa}
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {lic.palavrasChave?.map((p) => (
              <span key={p} style={{
                background: 'rgba(200,170,110,0.12)',
                border: '1px solid rgba(200,170,110,0.35)',
                color: '#c8aa6e',
                padding: '3px 10px',
                borderRadius: '20px',
                fontSize: '13px',
              }}>
                {p}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.3)', textAlign: 'right' }}>
        {expandido ? '▲ fechar' : '▼ ver análise da IA'}
      </div>
    </div>
  )
}