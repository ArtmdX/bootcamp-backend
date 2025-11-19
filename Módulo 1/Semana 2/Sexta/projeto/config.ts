/**
 * ============================================
 * ARQUIVO DE CONFIGURAÇÃO
 * ============================================
 *
 * Centralize todas as configurações do projeto aqui!
 */

interface Config {
  API_URL: string;
  MAX_RETRIES: number;
  RETRY_DELAY: number;
  REQUEST_TIMEOUT: number;
  OUTPUT_DIR: string;
  FILES: {
    USUARIOS: string;
    POSTS: string;
    COMENTARIOS: string;
    RELATORIO: string;
    ESTATISTICAS: string;
  };
  MESSAGES: {
    INICIO: string;
    BUSCANDO: string;
    PROCESSANDO: string;
    GERANDO: string;
    SALVANDO: string;
    SUCESSO: string;
    ERRO: string;
  };
}

const config: Config = {
  // URL base da API
  API_URL: "https://jsonplaceholder.typicode.com",

  // Configurações de retry
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // milissegundos

  // Timeout para requisições
  REQUEST_TIMEOUT: 5000, // milissegundos

  // Pastas
  OUTPUT_DIR: "./output",

  // Nomes dos arquivos de saída
  FILES: {
    USUARIOS: "usuarios.json",
    POSTS: "posts-enriquecidos.json",
    COMENTARIOS: "comentarios-agrupados.json",
    RELATORIO: "relatorio-geral.json",
    ESTATISTICAS: "estatisticas.txt"
  },

  // Mensagens
  MESSAGES: {
    INICIO: "🚀 Iniciando Agregador de Dados...",
    BUSCANDO: "📥 Buscando dados da API...",
    PROCESSANDO: "⚙️  Processando dados...",
    GERANDO: "📊 Gerando relatórios...",
    SALVANDO: "💾 Salvando arquivos...",
    SUCESSO: "✅ Processo concluído com sucesso!",
    ERRO: "❌ Erro ao processar:"
  }
};

// Exporta a configuração
export default config;
