/**
 * ============================================
 * FILE UTILS
 * ============================================
 *
 * Utilitários para operações com arquivos
 */

import { promises as fs } from "fs";
import path from "path";

/**
 * Garante que uma pasta existe (cria se não existir)
 */
export async function garantirPasta(caminhoPasta: string): Promise<void> {
  try {
    // TODO: Use fs.access() para verificar se a pasta existe
    // TODO: Se não existir (erro), use fs.mkdir() para criar
    // Dica: use { recursive: true } no mkdir
  } catch (erro) {
    console.error("Erro ao garantir pasta:", (erro as Error).message);
    throw erro;
  }
}

/**
 * Salva dados em arquivo JSON
 */
export async function salvarJSON(dados: any, nomeArquivo: string): Promise<void> {
  try {
    // TODO: Converta dados para JSON string
    // Dica: JSON.stringify(dados, null, 2)

    // TODO: Garanta que a pasta existe
    // Dica: use path.dirname(nomeArquivo)

    // TODO: Salve o arquivo
    // Dica: await fs.writeFile(nomeArquivo, jsonString, 'utf-8')

    // TODO: Exiba mensagem de sucesso
  } catch (erro) {
    console.error(`Erro ao salvar ${nomeArquivo}:`, (erro as Error).message);
    throw erro;
  }
}

/**
 * Salva texto em arquivo TXT
 */
export async function salvarTexto(texto: string, nomeArquivo: string): Promise<void> {
  try {
    // TODO: Similar a salvarJSON, mas sem JSON.stringify
  } catch (erro) {
    console.error(`Erro ao salvar ${nomeArquivo}:`, (erro as Error).message);
    throw erro;
  }
}
