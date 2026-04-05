import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function resumirLicitacao(descricao: string): Promise<string> {
  const response = await api.post('/licitacoes/resumir', { descricao });
  return response.data.resumo;
}

export async function buscarLicitacoes(palavra: string) {
  const response = await api.get(`/licitacoes/buscar?palavra=${palavra}`);
  return response.data;
}