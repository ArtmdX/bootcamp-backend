# 📚 Instruções - Sexta-feira (Projeto Final da Semana 2)

## 🎯 Objetivo da Aula

Integrar **TODOS** os conceitos da semana em um projeto completo e funcional!

## 📋 O que você vai fazer hoje

Você vai criar um **Agregador de Dados** que:
1. Consome dados da API JSONPlaceholder
2. Processa e combina os dados
3. Gera relatórios estatísticos
4. Salva tudo em arquivos JSON e TXT

## 🗂️ Estrutura do Projeto

O projeto já está **parcialmente** criado. Você precisa **completar** as implementações!

```
projeto/
├── README.md              ← Leia PRIMEIRO! Explica o projeto completo
├── package.json           ← Já pronto
├── config.js              ← Já pronto (configurações)
├── index.js               ← COMPLETE os TODOs aqui
├── services/
│   ├── api.service.js    ← COMPLETE os TODOs aqui
│   └── data.service.js   ← COMPLETE os TODOs aqui
├── utils/
│   └── file.utils.js     ← COMPLETE os TODOs aqui
└── output/               ← Será criado automaticamente
```

## 📝 Passos para Completar o Projeto

### 1. Leia o README.md

Abra o arquivo [projeto/README.md](./projeto/README.md) e leia TUDO com atenção!

Ele contém:
- Descrição completa do projeto
- Funcionalidades esperadas
- Tarefas a completar
- Exemplos de execução
- Critérios de avaliação

### 2. Entenda o que já está pronto

Estes arquivos **NÃO** precisam ser alterados:
- ✅ `config.js` - Todas as configurações
- ✅ `package.json` - Metadados do projeto

### 3. Complete os TODOs em cada arquivo

**ORDEM RECOMENDADA:**

#### 3.1. Comece por `utils/file.utils.js`
- [ ] `garantirPasta()` - criar pasta se não existir
- [ ] `salvarJSON()` - salvar dados em JSON
- [ ] `salvarTexto()` - salvar texto em TXT

**Por que começar aqui?**
- São funções simples
- Não dependem de outras partes
- Você pode testar isoladamente

#### 3.2. Depois faça `services/api.service.js`
- [ ] `fetchComRetry()` - fetch com retry
- [ ] `buscarUsuarios()` - buscar usuários
- [ ] `buscarPosts()` - buscar posts
- [ ] `buscarComentarios()` - buscar comentários
- [ ] `buscarTodos()` - buscar tarefas
- [ ] `buscarTodosDados()` - buscar tudo em paralelo

**Por que agora?**
- Você precisa dos dados para processar
- As funções são similares entre si
- Use Promise.all() na última!

#### 3.3. Em seguida, `services/data.service.js`
- [ ] `enriquecerPosts()` - adicionar dados do autor
- [ ] `agruparComentarios()` - agrupar por post
- [ ] `calcularEstatisticas()` - calcular métricas
- [ ] `encontrarTop5Posts()` - posts mais comentados
- [ ] `encontrarUsuarioMaisAtivo()` - mais posts

**Por que agora?**
- Você já tem os dados da API
- Essas funções processam esses dados
- Use .map(), .filter(), .reduce()!

#### 3.4. Por fim, `index.js`
- [ ] Buscar dados com apiService
- [ ] Processar com dataService
- [ ] Salvar com fileUtils
- [ ] Exibir resumo

**Por que por último?**
- Usa TODAS as outras funções
- É o orquestrador final
- Testa tudo integrado

### 4. Teste frequentemente!

Não espere completar tudo para testar!

**Teste cada função:**
```javascript
// Exemplo: testando uma função isolada
const apiService = require('./services/api.service');

apiService.buscarUsuarios()
  .then(usuarios => console.log('Usuários:', usuarios.length))
  .catch(erro => console.log('Erro:', erro.message));
```

**Execute o projeto completo:**
```bash
cd "Módulo 1/Semana 2/Sexta/projeto"
node index.js
```

### 5. Verifique os arquivos gerados

Se tudo funcionar, você terá na pasta `output/`:
- ✅ `usuarios.json` - Lista de usuários
- ✅ `posts-enriquecidos.json` - Posts com dados do autor
- ✅ `comentarios-agrupados.json` - Comentários organizados por post
- ✅ `relatorio-geral.json` - Relatório em JSON
- ✅ `estatisticas.txt` - Relatório formatado em texto

## 🐛 Se der erro

### Erro: "Cannot find module"
- Verifique se você está na pasta correta
- Use `cd "Módulo 1/Semana 2/Sexta/projeto"`

### Erro: "fetch is not defined" (Node < 18)
- Use Node.js versão 18+ OU
- Instale node-fetch: `npm install node-fetch@2`
- Importe no topo: `const fetch = require('node-fetch');`

### Erro: "ENOENT: no such file or directory"
- A função `garantirPasta()` não está funcionando
- Verifique a implementação no `file.utils.js`

### Erro de timeout
- Sua internet pode estar lenta
- Aumente `REQUEST_TIMEOUT` no `config.js`

### Dados vazios ou incorretos
- Verifique se você está usando `await` corretamente
- Use `console.log()` para ver o que cada função retorna
- Veja se `Promise.all()` está sendo usado

## 💡 Dicas Importantes

### Para debugar
```javascript
console.log('Dados recebidos:', dados);
console.log('Tipo:', typeof dados);
console.log('Tamanho:', dados.length);
```

### Para medir performance
```javascript
console.time('Operação');
// ... código ...
console.timeEnd('Operação');
```

### Para ver estrutura de objetos
```javascript
console.log(JSON.stringify(objeto, null, 2));
```

## ✅ Checklist de Conclusão

Antes de considerar o projeto pronto:

- [ ] Todos os TODOs implementados
- [ ] Código executa sem erros
- [ ] 5 arquivos gerados na pasta output/
- [ ] Estatísticas corretas no console
- [ ] Relatório em texto legível
- [ ] Código comentado e organizado
- [ ] Entendi o que cada parte faz

## 🏆 Bônus (Se terminar cedo)

1. **Adicione mais estatísticas:**
   - Usuário com mais tarefas completas
   - Posts mais longos
   - Média de caracteres por post

2. **Crie filtros:**
   - Exportar só posts de um usuário
   - Exportar só comentários de posts longos

3. **Adicione CLI interativo:**
   - Menu de opções
   - Usuário escolhe o que quer gerar

4. **Melhore a apresentação:**
   - Use cores no terminal (chalk)
   - Crie gráficos ASCII
   - Formatação mais bonita

## 📚 Conceitos Revisados

Ao completar este projeto, você revisou:

- ✅ **Promises** - todas as funções assíncronas
- ✅ **async/await** - em todo lugar!
- ✅ **try/catch** - tratamento de erros
- ✅ **Promise.all()** - buscar dados em paralelo
- ✅ **fetch()** - consumir API
- ✅ **File System** - salvar arquivos
- ✅ **Módulos** - require/exports
- ✅ **Métodos de array** - map, filter, reduce
- ✅ **Processamento de dados** - combinar e transformar
- ✅ **Geração de relatórios** - análise de dados

## 🎉 Parabéns!

Ao completar este projeto, você fechou com chave de ouro a Semana 2!

Você agora domina:
- Programação assíncrona
- Consumo de APIs
- Processamento de dados complexos
- Organização de código em módulos

**Próxima semana:** Express + TypeScript - criando sua própria API! 🚀

---

**Dúvidas?** Releia o README.md do projeto ou revise as aulas da semana!
