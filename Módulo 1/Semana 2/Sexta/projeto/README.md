# 📊 Projeto Final - Semana 2: Agregador de Dados JSONPlaceholder (TypeScript)

## 🎯 Objetivo

Criar um sistema completo em **TypeScript** que consome dados do JSONPlaceholder, processa, analisa e gera relatórios detalhados. Este projeto integra **TUDO** que você aprendeu esta semana!

## 📋 Funcionalidades

O sistema deve ser capaz de:

1. **Buscar dados** de todas as APIs do JSONPlaceholder
2. **Processar e combinar** dados de múltiplas fontes
3. **Gerar relatórios** estatísticos detalhados
4. **Salvar resultados** em arquivos JSON
5. **Tratar erros** de forma robusta
6. **Executar em paralelo** para máxima performance

## 📁 Estrutura do Projeto

```
projeto/
├── README.md                    (este arquivo)
├── package.json                 (dependências)
├── tsconfig.json                (configuração TypeScript)
├── types.ts                     (tipos e interfaces)
├── config.ts                    (configurações)
├── index.ts                     (ponto de entrada principal)
├── services/
│   ├── api.service.ts          (comunicação com API)
│   └── data.service.ts         (processamento de dados)
├── utils/
│   └── file.utils.ts           (operações com arquivos)
└── output/
    ├── usuarios.json           (gerado pelo sistema)
    ├── posts-enriquecidos.json (gerado pelo sistema)
    ├── relatorio-geral.json    (gerado pelo sistema)
    └── estatisticas.txt        (gerado pelo sistema)
```

## 🚀 Como Executar

```bash
# 1. Navegue até a pasta do projeto
cd "Módulo 1/Semana 2/Sexta/projeto"

# 2. Instale as dependências
npm install

# 3. Execute o projeto
npm start

# OU compile e execute
npm run build
npm run run:build
```

## 📝 Tarefas do Projeto

### ✅ ETAPA 1: Configuração Inicial

- [ ] Criar estrutura de pastas
- [ ] Criar arquivo de configuração (config.js)
- [ ] Criar pasta output/ para arquivos gerados

### ✅ ETAPA 2: API Service

Criar `services/api.service.js` com:

- [ ] `buscarUsuarios()` - busca todos os usuários
- [ ] `buscarPosts()` - busca todos os posts
- [ ] `buscarComentarios()` - busca todos os comentários
- [ ] `buscarTodos()` - busca todas as tarefas
- [ ] `buscarTodosDados()` - busca tudo em paralelo
- [ ] Tratamento de erros robusto
- [ ] Retry pattern (3 tentativas)

### ✅ ETAPA 3: Data Service

Criar `services/data.service.js` com:

- [ ] `enriquecerPosts(posts, usuarios)` - adiciona dados do autor
- [ ] `agruparComentarios(comentarios)` - agrupa por post
- [ ] `calcularEstatisticas(dados)` - calcula métricas
- [ ] `encontrarTop5Posts(posts, comentarios)` - mais comentados
- [ ] `gerarRelatorioUsuario(userId, dados)` - relatório individual
- [ ] `gerarRelatorioGeral(dados)` - relatório completo

### ✅ ETAPA 4: File Utils

Criar `utils/file.utils.js` com:

- [ ] `salvarJSON(dados, nomeArquivo)` - salva arquivo JSON
- [ ] `salvarTexto(texto, nomeArquivo)` - salva arquivo TXT
- [ ] `garantirPasta(caminho)` - cria pasta se não existir

### ✅ ETAPA 5: Index (Orquestrador)

Criar `index.js` que:

- [ ] Busca todos os dados da API
- [ ] Processa os dados
- [ ] Gera todos os relatórios
- [ ] Salva em arquivos
- [ ] Exibe resumo no console
- [ ] Trata todos os erros

## 📊 Relatórios Esperados

### 1. Estatísticas Gerais

```
=== ESTATÍSTICAS GERAIS ===
Total de Usuários: 10
Total de Posts: 100
Total de Comentários: 500
Total de Tarefas: 200

Média de Posts por Usuário: 10
Média de Comentários por Post: 5
Taxa de Conclusão de Tarefas: 50%
```

### 2. Usuário Mais Ativo

```
Usuário Mais Ativo:
Nome: Leanne Graham
Email: Sincere@april.biz
Total de Posts: 10
Total de Comentários Recebidos: 50
```

### 3. Top 5 Posts Mais Comentados

```
1. "sunt aut facere..." - 5 comentários
2. "qui est esse" - 5 comentários
3. "ea molestias..." - 5 comentários
4. "eum et est..." - 5 comentários
5. "nesciunt quas..." - 5 comentários
```

## 🎨 Exemplo de Execução

```bash
$ node index.js

🚀 Iniciando Agregador de Dados...

📥 Buscando dados da API...
  ✓ Usuários: 10
  ✓ Posts: 100
  ✓ Comentários: 500
  ✓ Tarefas: 200

⚙️  Processando dados...
  ✓ Posts enriquecidos
  ✓ Comentários agrupados
  ✓ Estatísticas calculadas

📊 Gerando relatórios...
  ✓ Relatório geral
  ✓ Top 5 posts

💾 Salvando arquivos...
  ✓ output/usuarios.json
  ✓ output/posts-enriquecidos.json
  ✓ output/relatorio-geral.json
  ✓ output/estatisticas.txt

✅ Processo concluído com sucesso!

=== RESUMO ===
Tempo total: 2.5s
Arquivos gerados: 4
Status: Sucesso
```

## 💡 Dicas Importantes

### Performance

- Use `Promise.all()` para buscar dados em paralelo
- Processe dados localmente (sem fetch extra)
- Use métodos nativos de array (map, filter, reduce)

### Qualidade de Código

- Separe responsabilidades (cada arquivo tem uma função)
- Use async/await em vez de .then()
- Sempre trate erros com try/catch
- Adicione comentários explicativos

### Debugging

- Use `console.log()` para acompanhar o progresso
- Use `console.time()` e `console.timeEnd()` para medir performance
- Teste cada função separadamente antes de integrar

## 🔧 Desafios Extras (Opcional)

Se você terminar tudo e quiser mais:

1. **Cache de dados**: Salvar dados localmente e reutilizar se forem recentes
2. **CLI interativo**: Usar `readline` para menu de opções
3. **Gráficos no terminal**: Usar bibliotecas como `cli-chart`
4. **Exportar CSV**: Além de JSON, exportar em CSV
5. **Testes unitários**: Criar testes com Jest
6. **Validação com Zod**: Validar dados da API

## 📚 Conceitos Aplicados

Este projeto usa:

- ✅ Promises
- ✅ async/await
- ✅ Promise.all()
- ✅ try/catch
- ✅ fetch API
- ✅ File System (fs)
- ✅ Métodos de array (.map, .filter, .reduce, .find)
- ✅ Desestruturação
- ✅ Template strings
- ✅ Módulos (import/export)
- ✅ Error handling

## 🎓 Critérios de Avaliação

Seu projeto será avaliado por:

1. **Funcionalidade** (40%)
   - Todas as funções implementadas
   - Dados corretos nos arquivos gerados
   - Sem erros de execução

2. **Qualidade de Código** (30%)
   - Código organizado e limpo
   - Boas práticas de async/await
   - Separação de responsabilidades

3. **Tratamento de Erros** (20%)
   - try/catch em todas as funções assíncronas
   - Mensagens de erro claras
   - Sistema não quebra com erros

4. **Performance** (10%)
   - Uso de Promise.all()
   - Sem operações desnecessárias
   - Código eficiente

## ✅ Checklist de Conclusão

Antes de considerar o projeto concluído:

- [ ] Todos os arquivos criados
- [ ] Todas as funções implementadas
- [ ] Sistema executa sem erros
- [ ] 4 arquivos gerados na pasta output/
- [ ] Relatórios com dados corretos
- [ ] Código comentado
- [ ] Código organizado em módulos
- [ ] Tratamento de erros implementado

## 🏆 Parabéns!

Se você completou este projeto, você agora domina:
- ✅ Programação assíncrona em JavaScript
- ✅ Consumo de APIs REST
- ✅ Processamento de dados complexos
- ✅ Geração de relatórios
- ✅ Sistema de arquivos em Node.js

**Você está pronto para a Semana 3: Express + TypeScript!** 🚀
