/**
 * ============================================
 * PROJETO FINAL - SEMANA 2 (TypeScript)
 * Agregador de Dados JSONPlaceholder
 * ============================================
 */

import path from "path";
import config from "./config";
import * as apiService from "./services/api.service";
import * as dataService from "./services/data.service";
import * as fileUtils from "./utils/file.utils";

/**
 * Função principal que executa todo o fluxo
 */
async function main(): Promise<void> {
  const inicio = Date.now();

  try {
    // ETAPA 1: BUSCAR DADOS
    console.log(config.MESSAGES.INICIO);
    console.log();
    console.log(config.MESSAGES.BUSCANDO);

    // TODO: Busque todos os dados
    // const dados = await apiService.buscarTodosDados();

    console.log();

    // ETAPA 2: PROCESSAR DADOS
    console.log(config.MESSAGES.PROCESSANDO);

    // TODO: Enriqueça os posts
    // const postsEnriquecidos = dataService.enriquecerPosts(dados.posts, dados.usuarios);
    console.log("  ✓ Posts enriquecidos");

    // TODO: Agrupe comentários
    // const comentariosAgrupados = dataService.agruparComentarios(dados.comentarios);
    console.log("  ✓ Comentários agrupados");

    console.log();

    // ETAPA 3: GERAR RELATÓRIOS
    console.log(config.MESSAGES.GERANDO);

    // TODO: Gere o relatório
    // const relatorioGeral = dataService.gerarRelatorioGeral(dados);
    console.log("  ✓ Relatório geral");

    // TODO: Formate as estatísticas
    // const textoEstatisticas = dataService.formatarEstatisticasTexto(relatorioGeral);
    console.log("  ✓ Estatísticas formatadas");

    console.log();

    // ETAPA 4: SALVAR ARQUIVOS
    console.log(config.MESSAGES.SALVANDO);

    // TODO: Salve todos os arquivos usando fileUtils
    // await fileUtils.garantirPasta(config.OUTPUT_DIR);
    // await fileUtils.salvarJSON(dados.usuarios, path.join(config.OUTPUT_DIR, config.FILES.USUARIOS));
    // ... (salvar outros arquivos)

    console.log();

    // ETAPA 5: EXIBIR RESUMO
    console.log(config.MESSAGES.SUCESSO);
    console.log();

    const fim = Date.now();
    const tempoTotal = ((fim - inicio) / 1000).toFixed(2);

    console.log("=".repeat(50));
    console.log("RESUMO");
    console.log("=".repeat(50));
    console.log(`Tempo total: ${tempoTotal}s`);
    // TODO: Exiba mais estatísticas
    console.log("=".repeat(50));

    console.log();
    console.log(`📁 Arquivos salvos em: ${path.resolve(config.OUTPUT_DIR)}`);
    console.log();

    // TODO: Exiba o relatório
    // console.log(textoEstatisticas);
  } catch (erro) {
    console.error();
    console.error(config.MESSAGES.ERRO, (erro as Error).message);
    console.error();
    console.error("Stack trace:", (erro as Error).stack);
    process.exit(1);
  }
}

// EXECUTA O PROGRAMA
main();
