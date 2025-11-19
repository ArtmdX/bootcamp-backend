/**
 * ============================================
 * TERÇA-FEIRA - EXERCÍCIO 1
 * Exercícios Práticos de Promises
 * ============================================
 */

// ============================================
// EXERCÍCIO 1: Temporizador
// ============================================

console.log("\n=== EXERCÍCIO 1: Temporizador ===\n");

/**
 * Crie uma função que espera X milissegundos
 * e depois resolve com uma mensagem.
 *
 * Exemplo:
 * esperar(2000).then(msg => console.log(msg))
 * // Após 2 segundos: "Passaram 2000ms"
 */

// TODO: Implemente esta função
function esperar(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Passaram ${ms}ms`);
    }, ms);
  });
}

// Teste
esperar(2000).then((mensagem) => {
  console.log("✅", mensagem);
});

// ============================================
// EXERCÍCIO 2: Validação de Idade
// ============================================

console.log("\n=== EXERCÍCIO 2: Validação de Idade ===\n");

/**
 * Crie uma função que valida se uma pessoa pode dirigir.
 *
 * Se idade >= 18:
 *   resolve com "Pode dirigir"
 *
 * Se idade < 18:
 *   reject com erro "Menor de idade"
 */

// TODO: Implemente esta função
function validarIdadeParaDirigir(idade: number): Promise<string> {
  return new Promise((resolve, reject) => {
    if (idade >= 18) {
      resolve("Pode dirigir");
    } else {
      reject(new Error("Menor de idade"));
    }
  });
}

// Testes
validarIdadeParaDirigir(20)
  .then((msg) => console.log("✅", msg))
  .catch((err) => console.log("❌", err.message));

validarIdadeParaDirigir(16)
  .then((msg) => console.log("✅", msg))
  .catch((err) => console.log("❌", err.message));

// ============================================
// EXERCÍCIO 3: Buscar Produto por ID
// ============================================

console.log("\n=== EXERCÍCIO 3: Buscar Produto ===\n");

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

/**
 * Crie uma função que busca um produto.
 *
 * Use este "banco de dados":
 */
const produtos: Produto[] = [
  { id: 1, nome: "Notebook", preco: 3000, estoque: 5 },
  { id: 2, nome: "Mouse", preco: 50, estoque: 20 },
  { id: 3, nome: "Teclado", preco: 150, estoque: 10 },
];

/**
 * Se encontrar o produto: resolve com ele
 * Se NÃO encontrar: reject com erro "Produto não encontrado"
 *
 * Simule 500ms de delay
 */

// TODO: Implemente esta função
function buscarProduto(id: number): Promise<Produto> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const produto = produtos.find((p) => p.id === id);

      if (produto) {
        resolve(produto);
      } else {
        reject(new Error("Produto não encontrado"));
      }
    }, 500);
  });
}

// Testes
buscarProduto(1)
  .then((produto) => {
    console.log("✅ Produto encontrado:", produto.nome);
  })
  .catch((erro) => {
    console.log("❌", erro.message);
  });

buscarProduto(999)
  .then((produto) => {
    console.log("✅ Produto encontrado:", produto.nome);
  })
  .catch((erro) => {
    console.log("❌", erro.message);
  });

// ============================================
// EXERCÍCIO 4: Processar Pedido
// ============================================

console.log("\n=== EXERCÍCIO 4: Processar Pedido ===\n");

interface Pedido {
  id: number;
  valor: number;
  status: string;
}

/**
 * Crie uma função que processa um pedido.
 *
 * Se valor > 0:
 *   resolve com objeto Pedido
 *
 * Se valor <= 0:
 *   reject com erro "Valor inválido"
 *
 * O pedido deve ter:
 * - id aleatório
 * - valor recebido
 * - status "processado"
 *
 * Delay de 800ms
 */

// TODO: Implemente esta função
function processarPedido(valor: number): Promise<Pedido> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (valor > 0) {
        resolve({
          id: Math.floor(Math.random() * 10000),
          valor,
          status: "processado",
        });
      } else {
        reject(new Error("Valor inválido"));
      }
    }, 800);
  });
}

// Testes
processarPedido(299.99)
  .then((pedido) => {
    console.log("✅ Pedido processado:", pedido);
  })
  .catch((erro) => {
    console.log("❌", erro.message);
  });

processarPedido(-10)
  .then((pedido) => {
    console.log("✅ Pedido processado:", pedido);
  })
  .catch((erro) => {
    console.log("❌", erro.message);
  });

// ============================================
// EXERCÍCIO 5: Encadeamento
// ============================================

console.log("\n=== EXERCÍCIO 5: Encadeamento ===\n");

/**
 * Usando as funções anteriores, crie um fluxo:
 *
 * 1. Buscar produto (ID 2)
 * 2. Processar pedido com o preço do produto
 * 3. Exibir resultado
 */

// TODO: Implemente o encadeamento
buscarProduto(2)
  .then((produto) => {
    console.log(`📦 Produto: ${produto.nome} - R$ ${produto.preco}`);
    return processarPedido(produto.preco);
  })
  .then((pedido) => {
    console.log(`✅ Pedido #${pedido.id} criado com sucesso!`);
    console.log(`   Valor: R$ ${pedido.valor}`);
    console.log(`   Status: ${pedido.status}`);
  })
  .catch((erro) => {
    console.log("❌ Erro no processo:", erro.message);
  });

// ============================================
// EXERCÍCIO 6: Sortear Prêmio
// ============================================

console.log("\n=== EXERCÍCIO 6: Sortear Prêmio ===\n");

interface Premio {
  nome: string;
  valor: number;
}

/**
 * Crie uma função que sorteia um prêmio.
 *
 * 50% de chance: resolve com { nome: "Carro", valor: 50000 }
 * 30% de chance: resolve com { nome: "Moto", valor: 15000 }
 * 20% de chance: reject com "Não foi dessa vez!"
 *
 * Use Math.random() para sortear
 * Delay de 1000ms
 */

// TODO: Implemente esta função
function sortearPremio(): Promise<Premio> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const sorteio = Math.random();

      if (sorteio < 0.5) {
        // 50%
        resolve({ nome: "Carro", valor: 50000 });
      } else if (sorteio < 0.8) {
        // 30%
        resolve({ nome: "Moto", valor: 15000 });
      } else {
        // 20%
        reject(new Error("Não foi dessa vez!"));
      }
    }, 1000);
  });
}

// Teste (execute várias vezes para ver resultados diferentes)
sortearPremio()
  .then((premio) => {
    console.log(`🎉 Você ganhou: ${premio.nome} (R$ ${premio.valor})`);
  })
  .catch((erro) => {
    console.log("😢", erro.message);
  });

// ============================================
// EXERCÍCIO 7: Validar Cupom
// ============================================

console.log("\n=== EXERCÍCIO 7: Validar Cupom ===\n");

interface Cupom {
  codigo: string;
  desconto: number;
  valido: boolean;
}

/**
 * Cupons válidos:
 * - "DESC10": 10% de desconto
 * - "DESC20": 20% de desconto
 * - "DESC50": 50% de desconto
 *
 * Se cupom válido: resolve com objeto Cupom
 * Se inválido: reject com "Cupom inválido"
 *
 * Delay de 600ms
 */

// TODO: Implemente esta função
function validarCupom(codigo: string): Promise<Cupom> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cuponsValidos: { [key: string]: number } = {
        DESC10: 10,
        DESC20: 20,
        DESC50: 50,
      };

      if (codigo in cuponsValidos) {
        resolve({
          codigo,
          desconto: cuponsValidos[codigo],
          valido: true,
        });
      } else {
        reject(new Error("Cupom inválido"));
      }
    }, 600);
  });
}

// Testes
validarCupom("DESC20")
  .then((cupom) => {
    console.log(`✅ Cupom válido: ${cupom.desconto}% de desconto`);
  })
  .catch((erro) => {
    console.log("❌", erro.message);
  });

validarCupom("INVALIDO")
  .then((cupom) => {
    console.log(`✅ Cupom válido: ${cupom.desconto}% de desconto`);
  })
  .catch((erro) => {
    console.log("❌", erro.message);
  });

// ============================================
// EXERCÍCIO 8: DESAFIO - Compra Completa
// ============================================

console.log("\n=== EXERCÍCIO 8: DESAFIO ===\n");

/**
 * Crie um fluxo completo de compra:
 *
 * 1. Buscar produto (ID 3)
 * 2. Validar cupom ("DESC10")
 * 3. Calcular preço final (produto.preco * (1 - cupom.desconto/100))
 * 4. Processar pedido com preço final
 * 5. Exibir resumo completo
 *
 * Use encadeamento de .then()
 */

// TODO: Implemente o fluxo completo
setTimeout(() => {
  let produtoComprado: Produto;
  let cupomAplicado: Cupom;

  buscarProduto(3)
    .then((produto) => {
      produtoComprado = produto;
      console.log(`\n🛒 Produto: ${produto.nome}`);
      console.log(`   Preço original: R$ ${produto.preco}`);
      return validarCupom("DESC10");
    })
    .then((cupom) => {
      cupomAplicado = cupom;
      console.log(`\n🎟️  Cupom: ${cupom.codigo}`);
      console.log(`   Desconto: ${cupom.desconto}%`);

      const precoFinal =
        produtoComprado.preco * (1 - cupomAplicado.desconto / 100);
      console.log(`\n💰 Preço final: R$ ${precoFinal.toFixed(2)}`);

      return processarPedido(precoFinal);
    })
    .then((pedido) => {
      console.log(`\n✅ Pedido #${pedido.id} finalizado!`);
      console.log(`   Status: ${pedido.status}`);
      console.log(`   Total pago: R$ ${pedido.valor.toFixed(2)}`);
    })
    .catch((erro) => {
      console.log("\n❌ Erro na compra:", erro.message);
    });
}, 3000);

// ============================================
// RESUMO
// ============================================

/**
 * 🎯 O QUE VOCÊ PRATICOU:
 *
 * 1. Criar Promises com new Promise()
 * 2. Usar resolve() para sucesso
 * 3. Usar reject() para erro
 * 4. Encadear .then() para sequências
 * 5. Tratar erros com .catch()
 * 6. Trabalhar com dados assíncronos
 *
 * ✅ PRÓXIMOS PASSOS:
 * - async/await (forma moderna)
 * - Múltiplas promises em paralelo
 */
