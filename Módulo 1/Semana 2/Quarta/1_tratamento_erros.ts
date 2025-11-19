export {};
/**
 * ============================================
 * QUARTA-FEIRA - AULA 1
 * Tratamento de Erros com Promises e Async/Await
 * ============================================
 *
 * OBJETIVO:
 * Aprender a lidar com erros em operações assíncronas
 * usando try/catch, .catch() e tratamentos adequados
 */

// ============================================
// 1. POR QUE TRATAR ERROS?
// ============================================

/**
 * Em operações assíncronas (APIs, banco de dados, arquivos),
 * MUITA coisa pode dar errado:
 * - Servidor fora do ar
 * - Internet caiu
 * - URL errada
 * - Dados inválidos
 * - Timeout
 *
 * Se não tratarmos, nosso programa QUEBRA!
 */

// ============================================
// 2. TRATAMENTO COM .catch()
// ============================================

console.log('\n=== EXEMPLO 1: Tratamento com .catch() ===\n');

// Simulando uma API que PODE falhar
function buscarUsuarioComErro(id: number): Promise<{ id: number; nome: string }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        // ID inválido - REJEITA a promise
        reject(new Error('ID inválido! Deve ser maior que zero.'));
      } else {
        // ID válido - RESOLVE a promise
        resolve({ id, nome: `Usuário ${id}` });
      }
    }, 1000);
  });
}

// ❌ SEM TRATAMENTO - Programa quebra!
// buscarUsuarioComErro(-1); // Uncaught Error!

// ✅ COM TRATAMENTO - Programa continua rodando
buscarUsuarioComErro(-1)
  .then(usuario => {
    console.log('✅ Usuário encontrado:', usuario);
  })
  .catch(erro => {
    console.log('❌ Erro capturado:', erro.message);
  });

buscarUsuarioComErro(5)
  .then(usuario => {
    console.log('✅ Usuário encontrado:', usuario);
  })
  .catch(erro => {
    console.log('❌ Erro capturado:', erro.message);
  });

// ============================================
// 3. TRATAMENTO COM TRY/CATCH (async/await)
// ============================================

console.log('\n=== EXEMPLO 2: Tratamento com try/catch ===\n');

async function buscarUsuarioSeguro(id: number): Promise<void> {
  try {
    // Tenta executar
    const usuario = await buscarUsuarioComErro(id);
    console.log('✅ Usuário encontrado:', usuario);
  } catch (erro) {
    // Se der erro, cai aqui
    console.log('❌ Erro capturado no try/catch:', (erro as Error).message);
  }
}

// Testando com ID válido e inválido
buscarUsuarioSeguro(10);
buscarUsuarioSeguro(-5);

// ============================================
// 4. MÚLTIPLOS TRATAMENTOS
// ============================================

console.log('\n=== EXEMPLO 3: Múltiplos tratamentos ===\n');

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

interface Post {
  id: number;
  titulo: string;
  autorId: number;
  conteudo: string;
}

// Simulando APIs diferentes que podem falhar
function buscarUsuarioApi(id: number): Promise<Usuario> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 999) {
        reject(new Error('Usuário não encontrado'));
      } else {
        resolve({
          id,
          nome: `Usuário ${id}`,
          email: `user${id}@email.com`,
          cpf: '999.999.999-99'
        });
      }
    }, 500);
  });
}

function buscarPostsApi(autorId: number): Promise<Post[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (autorId === 666) {
        reject(new Error('Erro ao buscar posts'));
      } else {
        resolve([
          { id: 1, titulo: 'Post 1', autorId, conteudo: 'Bla bla' },
          { id: 2, titulo: 'Post 2', autorId, conteudo: 'Bla bla' }
        ]);
      }
    }, 500);
  });
}

// ✅ Tratamento adequado de múltiplas operações
async function buscarUsuarioComPosts(id: number): Promise<void> {
  try {
    console.log(`Buscando usuário ${id}...`);
    const usuario = await buscarUsuarioApi(id);
    console.log('✅ Usuário encontrado:', usuario.nome);

    console.log(`Buscando posts do usuário ${id}...`);
    const posts = await buscarPostsApi(id);
    console.log(`✅ Posts encontrados: ${posts.length}`);
  } catch (erro) {
    console.log('❌ Erro na operação:', (erro as Error).message);
  }
}

// Testando diferentes cenários
buscarUsuarioComPosts(1); // ✅ Sucesso
buscarUsuarioComPosts(999); // ❌ Usuário não encontrado
buscarUsuarioComPosts(666); // ❌ Erro ao buscar posts

// ============================================
// 5. TRATAMENTO ESPECÍFICO POR TIPO DE ERRO
// ============================================

console.log('\n=== EXEMPLO 4: Tratamento específico ===\n');

// Criando tipos de erro customizados
class UsuarioNaoEncontradoError extends Error {
  constructor(id: number) {
    super(`Usuário com ID ${id} não foi encontrado`);
    this.name = 'UsuarioNaoEncontradoError';
  }
}

class ServidorForaDoArError extends Error {
  constructor() {
    super('Servidor fora do ar. Tente novamente mais tarde.');
    this.name = 'ServidorForaDoArError';
  }
}

function buscarUsuarioComErrosEspecificos(id: number): Promise<Usuario> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 999) {
        reject(new UsuarioNaoEncontradoError(id));
      } else if (id === 500) {
        reject(new ServidorForaDoArError());
      } else {
        resolve({
          id,
          nome: `Usuário ${id}`,
          email: `user${id}@email.com`,
          cpf: '999.999.999-99'
        });
      }
    }, 500);
  });
}

async function tratarErrosEspecificos(id: number): Promise<void> {
  try {
    const usuario = await buscarUsuarioComErrosEspecificos(id);
    console.log('✅ Usuário:', usuario.nome);
  } catch (erro) {
    if (erro instanceof UsuarioNaoEncontradoError) {
      console.log('⚠️ Erro de busca:', erro.message);
      console.log('💡 Sugestão: Verifique o ID e tente novamente');
    } else if (erro instanceof ServidorForaDoArError) {
      console.log('🔴 Erro de servidor:', erro.message);
      console.log('💡 Sugestão: Aguarde alguns minutos');
    } else {
      console.log('❌ Erro desconhecido:', erro);
    }
  }
}

// Testando diferentes tipos de erro
tratarErrosEspecificos(1); // ✅ Sucesso
tratarErrosEspecificos(999); // ⚠️ Usuário não encontrado
tratarErrosEspecificos(500); // 🔴 Servidor fora do ar

// ============================================
// 6. FINALLY - SEMPRE EXECUTA
// ============================================

console.log('\n=== EXEMPLO 5: Bloco finally ===\n');

async function operacaoComFinally(sucesso: boolean): Promise<void> {
  console.log('🔄 Iniciando operação...');

  try {
    if (!sucesso) {
      throw new Error('Operação falhou!');
    }
    console.log('✅ Operação concluída com sucesso');
  } catch (erro) {
    console.log('❌ Erro:', (erro as Error).message);
  } finally {
    // SEMPRE executa, deu erro ou não
    console.log('🏁 Finalizando operação (cleanup)');
    console.log('---');
  }
}

// Testando com sucesso e erro
operacaoComFinally(true);
operacaoComFinally(false);

// ============================================
// 7. PROPAGAÇÃO DE ERROS
// ============================================

console.log('\n=== EXEMPLO 6: Propagação de erros ===\n');

async function nivel1(): Promise<string> {
  throw new Error('Erro no nível 1');
}

async function nivel2(): Promise<string> {
  // Não trata - propaga o erro
  return await nivel1();
}

async function nivel3(): Promise<void> {
  try {
    // Trata o erro que veio de nivel1, através de nivel2
    await nivel2();
  } catch (erro) {
    console.log('❌ Erro capturado no nível 3:', (erro as Error).message);
  }
}

nivel3();

// ============================================
// 8. EXERCÍCIO PRÁTICO
// ============================================

console.log('\n=== EXERCÍCIO ===\n');

/**
 * DESAFIO:
 * Crie uma função que busca informações de um produto
 * e trata os seguintes erros:
 * - ID inválido (menor ou igual a 0)
 * - Produto não encontrado (ID 404)
 * - Produto sem estoque (ID 999)
 * - Servidor fora do ar (ID 500)
 */

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
}

// TODO: Implemente esta função
function buscarProdutoApi(id: number): Promise<Produto> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // DICA: Use if/else para simular diferentes erros
      if (id <= 0) {
        reject(new Error('ID inválido'));
      } else if (id === 404) {
        reject(new Error('Produto não encontrado'));
      } else if (id === 999) {
        reject(new Error('Produto sem estoque'));
      } else if (id === 500) {
        reject(new Error('Servidor fora do ar'));
      } else {
        resolve({
          id,
          nome: `Produto ${id}`,
          categoria: 'Produto',
          preco: 99.99,
          estoque: 10
        });
      }
    }, 500);
  });
}

// TODO: Implemente esta função com tratamento adequado
async function exibirProduto(id: number): Promise<void> {
  try {
    console.log(`Buscando produto ${id}...`);
    const produto = await buscarProdutoApi(id);
    console.log('✅ Produto encontrado:', produto);
  } catch (erro) {
    console.log('❌ Erro ao buscar produto:', (erro as Error).message);
  }
}

// Testando todos os cenários
exibirProduto(1); // ✅ Sucesso
exibirProduto(-1); // ❌ ID inválido
exibirProduto(404); // ❌ Não encontrado
exibirProduto(999); // ❌ Sem estoque
exibirProduto(500); // ❌ Servidor fora

// ============================================
// RESUMO - TRATAMENTO DE ERROS
// ============================================

/**
 * ✅ BOAS PRÁTICAS:
 *
 * 1. SEMPRE trate erros em operações assíncronas
 * 2. Use try/catch com async/await
 * 3. Use .catch() com Promises
 * 4. Crie erros específicos quando necessário
 * 5. Use finally para cleanup
 * 6. Dê mensagens claras sobre o erro
 * 7. Não deixe erros quebrarem o programa
 *
 * ❌ EVITE:
 *
 * 1. Ignorar erros (sem catch)
 * 2. Mensagens genéricas ("Erro!")
 * 3. Expor detalhes técnicos ao usuário
 * 4. Tratar todos os erros da mesma forma
 */

/**
 * 🎯 PRÓXIMOS PASSOS:
 * - Múltiplas Promises em paralelo
 * - Promise.all, Promise.race
 * - Tratamento de erros em múltiplas operações
 */
