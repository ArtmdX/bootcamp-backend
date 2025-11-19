export {};
/**
 * ============================================
 * QUARTA-FEIRA - EXERCÍCIO
 * Múltiplas Promises - Exercícios Práticos
 * ============================================
 */

// ============================================
// EXERCÍCIO 1: Sistema de Notificações
// ============================================

console.log('\n=== EXERCÍCIO 1: Sistema de Notificações ===\n');

/**
 * CENÁRIO:
 * Você precisa enviar notificações para 3 serviços diferentes:
 * - Email
 * - SMS
 * - Push Notification
 *
 * REQUISITO:
 * Enviar para TODOS, mesmo que algum falhe.
 * No final, mostrar quais funcionaram e quais falharam.
 */

interface NotificacaoResultado {
  servico: string;
  sucesso: boolean;
  mensagem: string;
}

// Simulando serviços de notificação
function enviarEmail(destinatario: string, mensagem: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Email tem 80% de chance de sucesso
      if (Math.random() > 0.2) {
        resolve(`✅ Email enviado para ${destinatario}`);
      } else {
        reject(new Error('❌ Falha ao enviar email'));
      }
    }, 800);
  });
}

function enviarSMS(telefone: string, mensagem: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // SMS tem 90% de chance de sucesso
      if (Math.random() > 0.1) {
        resolve(`✅ SMS enviado para ${telefone}`);
      } else {
        reject(new Error('❌ Falha ao enviar SMS'));
      }
    }, 600);
  });
}

function enviarPush(userId: string, mensagem: string): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Push tem 70% de chance de sucesso
      if (Math.random() > 0.3) {
        resolve(`✅ Push enviado para usuário ${userId}`);
      } else {
        reject(new Error('❌ Falha ao enviar push'));
      }
    }, 500);
  });
}

// TODO: Complete esta função usando Promise.allSettled
async function enviarNotificacoes(email: string, telefone: string, userId: string, mensagem: string): Promise<void> {
  console.log('🔔 Enviando notificações...\n');

  // DICA: Use Promise.allSettled para executar todas
  const resultados = await Promise.allSettled([
    enviarEmail(email, mensagem),
    enviarSMS(telefone, mensagem),
    enviarPush(userId, mensagem)
  ]);

  // TODO: Processar os resultados e mostrar relatório
  console.log('📊 RELATÓRIO DE ENVIO:\n');

  let sucessos = 0;
  let falhas = 0;

  resultados.forEach((resultado, index) => {
    const servicos = ['Email', 'SMS', 'Push'];

    if (resultado.status === 'fulfilled') {
      console.log(`${servicos[index]}: ${resultado.value}`);
      sucessos++;
    } else {
      console.log(`${servicos[index]}: ${resultado.reason.message}`);
      falhas++;
    }
  });

  console.log(`\n✅ Sucessos: ${sucessos}`);
  console.log(`❌ Falhas: ${falhas}`);
}

// Teste
enviarNotificacoes('samuel@email.com', '+5561999999999', 'user123', 'Bem-vindo!');

// ============================================
// EXERCÍCIO 2: Busca em Múltiplas APIs
// ============================================

console.log('\n\n=== EXERCÍCIO 2: Busca em Múltiplas APIs ===\n');

/**
 * CENÁRIO:
 * Você tem 3 APIs de preços de produtos diferentes.
 * Quer mostrar o resultado da API que responder PRIMEIRO.
 *
 * REQUISITO:
 * Use Promise.race para pegar a mais rápida.
 */

interface Preco {
  api: string;
  valor: number;
  moeda: string;
}

function buscarPrecoAPI1(produto: string): Promise<Preco> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        api: 'API 1 (Loja A)',
        valor: 299.99,
        moeda: 'BRL'
      });
    }, Math.random() * 2000 + 500); // 500ms a 2500ms
  });
}

function buscarPrecoAPI2(produto: string): Promise<Preco> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        api: 'API 2 (Loja B)',
        valor: 289.99,
        moeda: 'BRL'
      });
    }, Math.random() * 2000 + 500);
  });
}

function buscarPrecoAPI3(produto: string): Promise<Preco> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        api: 'API 3 (Loja C)',
        valor: 309.99,
        moeda: 'BRL'
      });
    }, Math.random() * 2000 + 500);
  });
}

// TODO: Use Promise.race para pegar a primeira resposta
async function buscarMelhorPreco(produto: string): Promise<void> {
  console.log(`🔍 Buscando preço de "${produto}" em várias APIs...\n`);
  const inicio = Date.now();

  // DICA: Use Promise.race
  const primeiraResposta = await Promise.race([
    buscarPrecoAPI1(produto),
    buscarPrecoAPI2(produto),
    buscarPrecoAPI3(produto)
  ]);

  const fim = Date.now();

  console.log('🏆 Primeira resposta recebida:');
  console.log(`API: ${primeiraResposta.api}`);
  console.log(`Preço: ${primeiraResposta.moeda} ${primeiraResposta.valor}`);
  console.log(`⏱️ Tempo: ${(fim - inicio) / 1000}s`);
}

// Teste
setTimeout(() => buscarMelhorPreco('Notebook'), 2000);

// ============================================
// EXERCÍCIO 3: Backup de Servidores
// ============================================

console.log('\n\n=== EXERCÍCIO 3: Backup de Servidores ===\n');

/**
 * CENÁRIO:
 * Você tem 3 servidores. Alguns podem estar fora do ar.
 * Quer conectar no PRIMEIRO que estiver funcionando.
 *
 * REQUISITO:
 * Use Promise.any para pegar o primeiro sucesso.
 */

function conectarServidorPrincipal(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 30% de chance de estar online
      if (Math.random() > 0.7) {
        resolve('🟢 Servidor Principal (US-EAST)');
      } else {
        reject(new Error('🔴 Servidor Principal offline'));
      }
    }, 300);
  });
}

function conectarServidorBackup1(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 60% de chance de estar online
      if (Math.random() > 0.4) {
        resolve('🟡 Servidor Backup 1 (EU-WEST)');
      } else {
        reject(new Error('🔴 Servidor Backup 1 offline'));
      }
    }, 600);
  });
}

function conectarServidorBackup2(): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 90% de chance de estar online
      if (Math.random() > 0.1) {
        resolve('🟢 Servidor Backup 2 (ASIA)');
      } else {
        reject(new Error('🔴 Servidor Backup 2 offline'));
      }
    }, 900);
  });
}

// TODO: Use Promise.any para conectar no primeiro disponível
async function conectarEmServidorDisponivel(): Promise<void> {
  console.log('🔄 Tentando conectar em servidores disponíveis...\n');

  try {
    // DICA: Use Promise.any
    const servidorConectado = await Promise.any([
      conectarServidorPrincipal(),
      conectarServidorBackup1(),
      conectarServidorBackup2()
    ]);

    console.log('✅ Conectado em:', servidorConectado);
  } catch (erro) {
    console.log('❌ Nenhum servidor disponível!');
  }
}

// Teste
setTimeout(() => conectarEmServidorDisponivel(), 4000);

// ============================================
// EXERCÍCIO 4: Dashboard de Analytics
// ============================================

console.log('\n\n=== EXERCÍCIO 4: Dashboard de Analytics ===\n');

/**
 * CENÁRIO:
 * Você precisa carregar dados de analytics de várias fontes.
 * TODAS as operações são obrigatórias.
 *
 * REQUISITO:
 * Use Promise.all. Se alguma falhar, não carrega o dashboard.
 */

interface Vendas {
  total: number;
  mes: string;
}

interface Usuarios {
  ativos: number;
  novos: number;
}

interface Trafego {
  pageviews: number;
  sessoes: number;
}

function buscarVendas(): Promise<Vendas> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 95% de sucesso
      if (Math.random() > 0.05) {
        resolve({
          total: 150000,
          mes: 'Janeiro'
        });
      } else {
        reject(new Error('Falha ao buscar vendas'));
      }
    }, 800);
  });
}

function buscarUsuarios(): Promise<Usuarios> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 95% de sucesso
      if (Math.random() > 0.05) {
        resolve({
          ativos: 1250,
          novos: 80
        });
      } else {
        reject(new Error('Falha ao buscar usuários'));
      }
    }, 600);
  });
}

function buscarTrafego(): Promise<Trafego> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 95% de sucesso
      if (Math.random() > 0.05) {
        resolve({
          pageviews: 50000,
          sessoes: 12000
        });
      } else {
        reject(new Error('Falha ao buscar tráfego'));
      }
    }, 700);
  });
}

// TODO: Use Promise.all para carregar todos os dados
async function carregarDashboard(): Promise<void> {
  console.log('📊 Carregando dashboard de analytics...\n');
  const inicio = Date.now();

  try {
    // DICA: Use Promise.all
    const [vendas, usuarios, trafego] = await Promise.all([buscarVendas(), buscarUsuarios(), buscarTrafego()]);

    const fim = Date.now();

    console.log('✅ Dashboard carregado com sucesso!\n');
    console.log('💰 VENDAS:');
    console.log(`   Total: R$ ${vendas.total.toLocaleString()}`);
    console.log(`   Mês: ${vendas.mes}\n`);

    console.log('👥 USUÁRIOS:');
    console.log(`   Ativos: ${usuarios.ativos}`);
    console.log(`   Novos: ${usuarios.novos}\n`);

    console.log('🌐 TRÁFEGO:');
    console.log(`   Pageviews: ${trafego.pageviews.toLocaleString()}`);
    console.log(`   Sessões: ${trafego.sessoes.toLocaleString()}\n`);

    console.log(`⏱️ Tempo de carregamento: ${(fim - inicio) / 1000}s`);
  } catch (erro) {
    console.log('❌ Erro ao carregar dashboard:', (erro as Error).message);
    console.log('⚠️ Dashboard não pode ser exibido sem todos os dados');
  }
}

// Teste
setTimeout(() => carregarDashboard(), 6000);

// ============================================
// EXERCÍCIO 5: DESAFIO - Sistema de Backup
// ============================================

console.log('\n\n=== EXERCÍCIO 5: DESAFIO ===\n');

/**
 * CENÁRIO COMPLEXO:
 * Sistema de backup em 3 locais: Local, Cloud, External
 *
 * REQUISITOS:
 * 1. Fazer backup em TODOS os locais (Promise.allSettled)
 * 2. Se pelo menos 1 tiver sucesso, considerar ok
 * 3. Mostrar relatório detalhado
 * 4. Calcular tempo total
 */

interface BackupResultado {
  local: string;
  sucesso: boolean;
  tempo: number;
  tamanho?: string;
  erro?: string;
}

function backupLocal(dados: string): Promise<BackupResultado> {
  return new Promise((resolve, reject) => {
    const tempo = Math.random() * 1000 + 500;
    setTimeout(() => {
      if (Math.random() > 0.3) {
        resolve({
          local: 'Local (HD Externo)',
          sucesso: true,
          tempo,
          tamanho: '2.5 GB'
        });
      } else {
        reject({
          local: 'Local (HD Externo)',
          sucesso: false,
          tempo,
          erro: 'Disco cheio'
        });
      }
    }, tempo);
  });
}

function backupCloud(dados: string): Promise<BackupResultado> {
  return new Promise((resolve, reject) => {
    const tempo = Math.random() * 2000 + 1000;
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve({
          local: 'Cloud (AWS S3)',
          sucesso: true,
          tempo,
          tamanho: '2.5 GB'
        });
      } else {
        reject({
          local: 'Cloud (AWS S3)',
          sucesso: false,
          tempo,
          erro: 'Timeout na conexão'
        });
      }
    }, tempo);
  });
}

function backupExternal(dados: string): Promise<BackupResultado> {
  return new Promise((resolve, reject) => {
    const tempo = Math.random() * 1500 + 800;
    setTimeout(() => {
      if (Math.random() > 0.4) {
        resolve({
          local: 'External (Dropbox)',
          sucesso: true,
          tempo,
          tamanho: '2.5 GB'
        });
      } else {
        reject({
          local: 'External (Dropbox)',
          sucesso: false,
          tempo,
          erro: 'Cota excedida'
        });
      }
    }, tempo);
  });
}

// TODO: Implemente o sistema completo de backup
async function realizarBackupCompleto(dados: string): Promise<void> {
  console.log('💾 Iniciando backup em múltiplos locais...\n');
  const inicio = Date.now();

  // DICA: Use Promise.allSettled
  const resultados = await Promise.allSettled([backupLocal(dados), backupCloud(dados), backupExternal(dados)]);

  const fim = Date.now();

  // TODO: Processar resultados
  console.log('📊 RELATÓRIO DE BACKUP:\n');

  let sucessos = 0;
  let falhas = 0;

  resultados.forEach(resultado => {
    if (resultado.status === 'fulfilled') {
      const r = resultado.value;
      console.log(`✅ ${r.local}`);
      console.log(`   Tamanho: ${r.tamanho}`);
      console.log(`   Tempo: ${(r.tempo / 1000).toFixed(2)}s\n`);
      sucessos++;
    } else {
      const r = resultado.reason;
      console.log(`❌ ${r.local}`);
      console.log(`   Erro: ${r.erro}`);
      console.log(`   Tempo: ${(r.tempo / 1000).toFixed(2)}s\n`);
      falhas++;
    }
  });

  console.log('='.repeat(40));
  console.log(`✅ Backups bem-sucedidos: ${sucessos}`);
  console.log(`❌ Backups com falha: ${falhas}`);
  console.log(`⏱️ Tempo total: ${(fim - inicio) / 1000}s`);

  if (sucessos > 0) {
    console.log('\n🎉 Backup concluído! Dados protegidos.');
  } else {
    console.log('\n⚠️ ATENÇÃO: Todos os backups falharam!');
  }
}

// Teste
setTimeout(() => realizarBackupCompleto('dados-importantes.zip'), 8000);

// ============================================
// RESUMO DOS EXERCÍCIOS
// ============================================

/**
 * 🎯 O QUE VOCÊ PRATICOU:
 *
 * 1. Promise.allSettled() - Executar todas mesmo com falhas
 * 2. Promise.race() - Pegar a primeira que completar
 * 3. Promise.any() - Pegar a primeira com sucesso
 * 4. Promise.all() - Todas obrigatórias
 * 5. Tratamento de erros em operações paralelas
 * 6. Relatórios e análise de resultados
 *
 * ✅ CONCEITOS IMPORTANTES:
 *
 * - Operações paralelas são MUITO mais rápidas
 * - Escolha o método certo para cada situação
 * - Sempre trate os erros adequadamente
 * - Forneça feedback claro ao usuário
 */
