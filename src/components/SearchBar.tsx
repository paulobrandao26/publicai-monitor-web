interface Props {
  palavra: string
  loading: boolean
  onChange: (valor: string) => void
  onBuscar: () => void
}

const sugestoes = [
  'sistema', 'software', 'computador', 'notebook',
  'servidor', 'internet', 'rede', 'impressora',
  'licença', 'suporte', 'manutenção', 'equipamento',
  'tecnologia', 'informática', 'digital', 'automatização',
  'monitoramento', 'infraestrutura', 'comunicação', 'dados'
]

export function SearchBar({ palavra, loading, onChange, onBuscar }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <input
          className="input-busca"
          type="text"
          placeholder="Ex: sistema, software, computador..."
          value={palavra}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onBuscar()}
        />
        <button className="buscar-btn" onClick={onBuscar} disabled={loading}>
          {loading ? '⏳ Buscando...' : '🔍 Buscar'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
        {sugestoes.map((s) => (
          <span
            key={s}
            className={`tag ${palavra === s ? 'active' : ''}`}
            onClick={() => onChange(s)}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}