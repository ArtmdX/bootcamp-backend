/**
 * ============================================
 * DATA SERVICE
 * ============================================
 *
 * Responsável por processar e transformar dados
 */

import {
  Post,
  Usuario,
  Comentario,
  PostEnriquecido,
  ComentariosAgrupados,
  Estatisticas,
  DadosCompletos,
  PostComComentarios,
  RelatorioGeral
} from "../types";

/**
 * Enriquece posts com dados do autor
 */
export function enriquecerPosts(posts: Post[], usuarios: Usuario[]): PostEnriquecido[] {
  // TODO: Use .map() para percorrer os posts
  // TODO: Para cada post, encontre o usuário com .find()
  // TODO: Adicione o campo 'autor' ao post
  // TODO: Retorne o array de posts enriquecidos
  return [];
}

/**
 * Agrupa comentários por post
 */
export function agruparComentarios(comentarios: Comentario[]): ComentariosAgrupados {
  // TODO: Use .reduce() para agrupar
  return {};
}

/**
 * Calcula estatísticas gerais do sistema
 */
export function calcularEstatisticas(dados: DadosCompletos): Estatisticas {
  // TODO: Calcule todas as estatísticas
  return {
    totalUsuarios: 0,
    totalPosts: 0,
    totalComentarios: 0,
    totalTodos: 0,
    mediaPosts: 0,
    mediaComentarios: 0,
    todosCompletos: 0,
    taxaConclusao: 0
  };
}

/**
 * Encontra os top 5 posts mais comentados
 */
export function encontrarTop5Posts(posts: Post[], comentarios: Comentario[]): PostComComentarios[] {
  // TODO: Implemente
  return [];
}

/**
 * Encontra o usuário com mais posts
 */
export function encontrarUsuarioMaisAtivo(posts: Post[], usuarios: Usuario[]): Usuario & { totalPosts: number } {
  // TODO: Implemente
  return {
    id: 0,
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" }
    },
    phone: "",
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    },
    totalPosts: 0
  };
}

/**
 * Gera relatório geral completo
 */
export function gerarRelatorioGeral(dados: DadosCompletos): RelatorioGeral {
  console.log("  Calculando estatísticas...");
  const estatisticas = calcularEstatisticas(dados);

  console.log("  Encontrando usuário mais ativo...");
  const usuarioMaisAtivo = encontrarUsuarioMaisAtivo(dados.posts, dados.usuarios);

  console.log("  Encontrando top 5 posts...");
  const top5Posts = encontrarTop5Posts(dados.posts, dados.comentarios);

  const postMaisComentado = top5Posts[0];

  return {
    geradoEm: new Date().toISOString(),
    estatisticas,
    usuarioMaisAtivo: {
      nome: usuarioMaisAtivo.name,
      email: usuarioMaisAtivo.email,
      totalPosts: usuarioMaisAtivo.totalPosts
    },
    postMaisComentado: {
      titulo: postMaisComentado.title,
      totalComentarios: postMaisComentado.totalComentarios
    },
    top5Posts: top5Posts.map((post) => ({
      id: post.id,
      titulo: post.title,
      totalComentarios: post.totalComentarios
    }))
  };
}

/**
 * Formata estatísticas para texto legível
 */
export function formatarEstatisticasTexto(relatorio: RelatorioGeral): string {
  const { estatisticas, usuarioMaisAtivo, postMaisComentado, top5Posts } = relatorio;

  return `
=================================================
    RELATÓRIO GERAL - JSONPLACEHOLDER
=================================================

Gerado em: ${new Date(relatorio.geradoEm).toLocaleString("pt-BR")}

-------------------------------------------------
ESTATÍSTICAS GERAIS
-------------------------------------------------

Total de Usuários:      ${estatisticas.totalUsuarios}
Total de Posts:         ${estatisticas.totalPosts}
Total de Comentários:   ${estatisticas.totalComentarios}
Total de Tarefas:       ${estatisticas.totalTodos}

Média de Posts/Usuário:        ${estatisticas.mediaPosts.toFixed(2)}
Média de Comentários/Post:     ${estatisticas.mediaComentarios.toFixed(2)}
Taxa de Conclusão de Tarefas:  ${estatisticas.taxaConclusao.toFixed(2)}%

-------------------------------------------------
USUÁRIO MAIS ATIVO
-------------------------------------------------

Nome:  ${usuarioMaisAtivo.nome}
Email: ${usuarioMaisAtivo.email}
Posts: ${usuarioMaisAtivo.totalPosts}

-------------------------------------------------
POST MAIS COMENTADO
-------------------------------------------------

Título:      ${postMaisComentado.titulo}
Comentários: ${postMaisComentado.totalComentarios}

-------------------------------------------------
TOP 5 POSTS MAIS COMENTADOS
-------------------------------------------------

${top5Posts
  .map(
    (post, index) =>
      `${index + 1}. "${post.titulo.substring(0, 40)}..." - ${post.totalComentarios} comentários`
  )
  .join("\n")}

=================================================
`;
}
