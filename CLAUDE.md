# 🎓 Bootcamp Backend - Contexto para Claude Code

## 📋 Informações do Projeto

### **Aluno:** Samuel

- Idade: Iniciante absoluto em programação
- Conhecimento atual: Tipos primitivos e declaração de variáveis (vídeos assistidos)
- Dificuldade identificada: Confunde parâmetros de função com argumentos na chamada
- Objetivo: Tornar-se Desenvolvedor Backend Júnior em 12 semanas

### **Mentor:** Arthur

- Cargo: Head de Backend (22 anos)
- Formação: Análise e Desenvolvimento de Sistemas (UNICEUB)
- Experiência: Promovido a Tech Lead em 3 meses
- Stack principal: Node.js, TypeScript, NestJS, Prisma, PostgreSQL

---

## 🗓️ Estrutura do Bootcamp

### **Formato das Aulas:**

- **Segunda-feira:** Sem aulas (Arthur tem reuniões) - Samuel recebe material
- **Terça a Sexta:** Aulas práticas (1h30-2h cada)
- **Sábado:** Code Review (30-45min)
- **Dedicação:** 3-4h/dia de estudo + 15h/semana de prática

### **Duração Total:** 12 semanas (3 meses)

### **Stack do Bootcamp:**

- JavaScript/TypeScript
- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT + Bcrypt (autenticação)
- Zod (validação)
- Railway (deploy)

---

## 📚 Módulos do Bootcamp

### **MÓDULO 1: Fundamentos (Semanas 1-3)**

**Objetivo:** Do zero ao primeiro servidor Express rodando

**Semana 1:** JavaScript/TypeScript Básico

- Funções, arrow functions, métodos de array
- Objetos, destructuring
- Interfaces TypeScript, princípios OOP
- Mini-projeto: Sistema de Posts em memória

**Semana 2:** Assincronismo e APIs

- Promises, async/await
- Consumir APIs externas
- Processar e salvar dados
- Projeto: Script que consome JSONPlaceholder

**Semana 3:** Express + TypeScript

- Configurar servidor HTTP
- Rotas CRUD (GET, POST, PUT, DELETE)
- Estrutura de pastas
- Projeto: API de Blog em memória

---

### **MÓDULO 2: O Coração da API (Semanas 4-8)**

**Objetivo:** Migrar para PostgreSQL e dominar relações

**Semana 4:** SQL Puro + Prisma

- **Dias 1-2:** SQL puro (JOINs, agregações, índices)
- **Dias 3-5:** Prisma ORM, migrations, queries

**Semana 5:** Relações 1:N

- Modelo User → Posts
- Foreign Keys
- Queries com `include`

**Semana 6:** Relações N:N

- Comentários (1:N)
- Categorias (N:N)
- Queries complexas

**Semana 7:** Services

- Arquitetura em camadas
- DTOs
- Tratamento de erros

**Semana 8:** Queries Avançadas

- Paginação
- Filtros e busca
- Agregações
- Performance

---

### **MÓDULO 3: Nível Júnior (Semanas 9-12)**

**Objetivo:** Autenticação, validações e deploy

**Semana 9:** Autenticação

- Bcrypt (hash de senhas)
- JWT (tokens)
- Rotas de registro e login

**Semana 10:** Autorização

- Middleware de autenticação
- Rotas protegidas
- Ownership validation

**Semana 11:** Validações

- Zod schemas
- Classes de erro customizadas
- Middleware global de erro

**Semana 12:** Deploy

- Preparar para produção
- Deploy no Railway
- Documentação completa

---

## 🎯 Metodologia de Ensino do Arthur

### **Princípios:**

1. **100% Prático:** Código desde a primeira aula
2. **Blocos Incrementais:** Cada semana adiciona complexidade
3. **Code Review Ativo:** Análise crítica, não apenas "funciona"
4. **Projetos Cumulativos:** Cada semana expande o anterior

### **Técnicas:**

- Pair Programming (nas primeiras vezes)
- Debugging Guiado (ensinar a ler erros)
- Checklists de Validação (saber o que dominar)
- Perguntas do Code Review (validar compreensão)

### **Filosofia:**

> "Não ensino apenas sintaxe - ensino o que realmente é cobrado em processos seletivos. Cada projeto é pensado para ser item de portfólio."

---

## 🚨 Bloqueadores Críticos (Impedem Avanço)

### **Semana 1:**

- ❌ Não consegue manipular arrays básicos
- ❌ Não entende `.map()` vs `.filter()`

### **Semana 2:**

- ❌ Não entende `async/await`

### **Semana 3:**

- ❌ Servidor não sobe ou rotas não funcionam

### **Semana 4:**

- ❌ Não domina JOINs em SQL
- ❌ Não entende Foreign Keys

### **Semana 5:**

- ❌ Não entende relações 1:N

### **Semana 6:**

- ❌ Não entende relações N:N

### **Semana 7:**

- ❌ Não entende separação de responsabilidades

### **Semana 8:**

- ❌ Não consegue implementar paginação

### **Semana 9:**

- ❌ Não entende JWT ou Bcrypt

### **Semana 10:**

- ❌ Não entende middleware ou ownership

### **Semana 11:**

- ❌ Validações não implementadas

### **Semana 12:**

- ❌ API não acessível pela internet

---

## 📅 Semana Atual: Semana 1

### **Tema:** JavaScript/TypeScript Básico

### **Estrutura:**

- **Terça:** Funções, arrow functions, .map/.filter/.find
- **Quarta:** Objetos, destructuring, introdução TypeScript
- **Quinta:** Interfaces, tipagem de funções, princípios OOP
- **Sexta:** Mini-projeto integrado

### **Dificuldade Atual do Samuel:**

Confunde parâmetros de função (o que vai DENTRO) com argumentos (o que vai NA CHAMADA).

**Exemplo do problema:**

```javascript
// ❌ ERRO que Samuel comete:
function somar(a, b) {
  return numero1 + numero2; // Usa nomes errados
}

// ✅ CORRETO:
function somar(a, b) {
  return a + b; // Usa os PARÂMETROS
}

const resultado = somar(5, 3); // Passa os ARGUMENTOS
```

### **Exercícios Criados:**

Lista completa de 5 níveis de exercícios focados em escopo de funções e parâmetros.

### **Status:**

Samuel está fazendo os exercícios de escopo antes de prosseguir para as aulas práticas.

---

## 🎯 Entregável Final do Bootcamp

### **Projeto:** API de Blog Completa

**Funcionalidades:**

- Sistema de usuários com autenticação JWT
- Posts com categorias e comentários
- Relacionamentos complexos (1:N e N:N)
- Rotas protegidas e autorização
- Paginação e sistema de busca
- Validações robustas com Zod
- Deploy em produção (Railway)
- Documentação completa

**Tecnologias:**

- Node.js + TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT + Bcrypt
- Zod
- Railway

---

## 💡 Diretrizes para Claude Code

### **Ao Ajudar o Samuel:**

1. **Sempre explicar ANTES de mostrar código**

   - Use analogias simples
   - Desenhe o fluxo mentalmente com palavras
   - Valide se ele entendeu antes de seguir

2. **Para exercícios de escopo:**

   - Peça para ele identificar onde está cada variável
   - Faça ele explicar em voz alta qual parâmetro usar
   - Use `console.log()` em cada passo

3. **Quando criar código:**

   - Adicione comentários explicativos
   - Use nomes de variáveis descritivos
   - Evite "mágica" - seja explícito

4. **Tom e linguagem:**

   - Paciente e encorajador
   - Técnico mas acessível
   - Sem assumir conhecimento prévio
   - Celebrar pequenas vitórias

5. **Prioridades:**
   - Entendimento > código perfeito
   - Prática > teoria
   - Projetos funcionais > sintaxe elegante
   - Autonomia > dependência

### **Não fazer:**

- ❌ Dar resposta pronta sem explicação
- ❌ Usar termos técnicos sem definir
- ❌ Assumir que ele sabe algo
- ❌ Pular etapas básicas
- ❌ Complicar além do necessário

### **Fazer:**

- ✅ Fazer perguntas guiadas
- ✅ Usar analogias do mundo real
- ✅ Validar compreensão antes de avançar
- ✅ Incentivar ele a tentar primeiro
- ✅ Debugar junto, não sozinho

---

## 📝 Checklist de Conceitos - Semana 1

### **Terça-feira:**

- [ ] Entende função vs chamada de função
- [ ] Consegue usar `.map()` sem ajuda
- [ ] Consegue usar `.filter()` sem ajuda
- [ ] Entende `.find()` e `.reduce()`
- [ ] Usa parâmetros corretos dentro das funções

### **Quarta-feira:**

- [ ] Cria e manipula objetos
- [ ] Usa destructuring corretamente
- [ ] Entende spread operator
- [ ] Define interfaces TypeScript básicas
- [ ] Tipa funções corretamente

### **Quinta-feira:**

- [ ] Cria interfaces complexas
- [ ] Entende union types
- [ ] Usa classes básicas (constructor, métodos)
- [ ] Entende `private` e encapsulamento
- [ ] Separa dados (interface) de comportamento (class)

### **Sexta-feira:**

- [ ] Integra todos os conceitos
- [ ] Cria mini-projeto funcional
- [ ] Organiza código em services
- [ ] Valida dados antes de processar
- [ ] Trata erros adequadamente

### **Sábado (Code Review):**

- [ ] Explica diferença entre `.map()` e `.filter()`
- [ ] Explica por que usar TypeScript
- [ ] Explica destructuring
- [ ] Explica interface vs class
- [ ] Explica separação em services

---

## 🎤 Perguntas Típicas do Code Review

### **Semana 1:**

1. "Me explica o que é uma interface"
2. "Por que usamos `const` ao invés de `let` para o array?"
3. "O que o método `.filter()` retorna?"
4. "O que acontece se tentar adicionar número onde deveria ser string?"
5. "Explica a diferença entre `.map()` e `.filter()`"
6. "Por que usar TypeScript ao invés de só JavaScript?"
7. "O que é destructuring e quando é útil?"
8. "Explica a diferença entre interface e class"
9. "No mini-projeto, por que separamos em services?"

---

## 📊 Critérios de Aprovação

### **Módulo 1 → Módulo 2:**

- [ ] Manipula arrays e objetos sem ajuda
- [ ] Entende `async/await`
- [ ] Servidor Express rodando com CRUD básico
- [ ] Confortável com TypeScript básico

### **Módulo 2 → Módulo 3:**

- [ ] Domina JOINs em SQL
- [ ] Sabe usar Prisma (CRUD + relacionamentos)
- [ ] Código organizado em Services
- [ ] Paginação implementada
- [ ] Entende relações 1:N e N:N

### **Módulo 3 → Desenvolvedor Júnior:**

- [ ] Sistema de autenticação funcionando
- [ ] Rotas protegidas implementadas
- [ ] Validações robustas com Zod
- [ ] API em produção e documentada
- [ ] Capaz de explicar decisões técnicas

---

## 🔧 Comandos Úteis

### **Git:**

```bash
git init
git add .
git commit -m "mensagem"
git push origin main
```

### **Node/NPM:**

```bash
npm install
npm run dev
npm start
```

### **Prisma:**

```bash
npx prisma init
npx prisma migrate dev
npx prisma studio
npx prisma generate
```

### **TypeScript:**

```bash
npx tsc --init
npx ts-node arquivo.ts
```

---

## 📁 Estrutura de Pastas Padrão

### **Semana 1-3 (Em memória):**

```
projeto/
├── src/
│   ├── index.ts
│   └── routes/
│       └── posts.ts
├── exercicios/
├── package.json
└── tsconfig.json
```

### **Semana 4+ (Com banco):**

```
projeto/
├── src/
│   ├── index.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   └── posts.routes.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   └── post.service.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── schemas/
│   │   ├── auth.schema.ts
│   │   └── post.schema.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       └── errors.ts
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── tsconfig.json
```

---

## 🎨 Estilo de Código do Arthur

### **Preferências:**

- **Nomes descritivos** sobre nomes curtos
- **Arrow functions** sobre functions tradicionais (exceto métodos com `this`)
- **Const** sobre let (sempre que possível)
- **Interfaces** para dados, **Classes** para comportamento
- **Async/await** sobre `.then()`
- **Comentários explicativos** para lógica complexa
- **Single responsibility** - cada função faz UMA coisa

### **Exemplo de código bem escrito:**

```typescript
interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autorId: number;
}

class PostService {
  private posts: Post[] = [];
  private proximoId: number = 1;

  criar(titulo: string, conteudo: string, autorId: number): Post {
    const novoPost: Post = {
      id: this.proximoId++,
      titulo,
      conteudo,
      autorId
    };

    this.posts.push(novoPost);
    return novoPost;
  }

  buscarPorId(id: number): Post | undefined {
    return this.posts.find(post => post.id === id);
  }
}
```

---

## 💬 Frases Motivacionais do Arthur

> "Programação não é dom - é prática. Se você está disposto a dedicar tempo, aceitar que vai errar muito no começo e tem vontade genuína de aprender, eu consigo te ensinar."

> "Não precisa ser gênio - precisa ser consistente."

> "Erros fazem parte do processo. Todo desenvolvedor passa por isso."

> "O importante não é decorar sintaxe, mas entender o conceito."

> "Vamos calibrar o ritmo juntos. O bootcamp é intenso, mas adaptável."

---

## 🎓 Sobre o Arthur (Para Contextualizar)

Arthur tem 22 anos e é Tech Lead de Backend. Formou-se em Análise e Desenvolvimento de Sistemas pelo UNICEUB e, em apenas 3 meses na empresa, foi promovido a Head de Backend.

Trabalha diariamente com Node.js, TypeScript, NestJS, Prisma e PostgreSQL, construindo APIs escaláveis e arquiteturas complexas. Além de liderar tecnicamente, conduz entrevistas técnicas e sabe exatamente o que o mercado espera de um desenvolvedor backend júnior.

Decidiu mentorar porque sabe que com o direcionamento certo, qualquer pessoa dedicada consegue. Sua missão é ensinar o caminho mais direto entre o zero e o primeiro emprego como desenvolvedor, sem enrolação e sem teoria em excesso.

---

## 📌 Notas Importantes

1. **Samuel está na Semana 1** do bootcamp
2. **Dificuldade atual:** Escopo de funções (parâmetros vs argumentos)
3. **Próximo marco:** Mini-projeto de sexta-feira
4. **Objetivo de curto prazo:** Dominar arrays, objetos e TypeScript básico
5. **Objetivo de longo prazo:** API completa em produção em 12 semanas

---

## ⚙️ Como Claude Code Deve Usar Este Arquivo

### **Para Entender Contexto:**

- Consulte sempre que o Arthur mencionar "o bootcamp" ou "Samuel"
- Use para calibrar nível de complexidade das explicações
- Entenda onde Samuel está no cronograma

### **Para Ajudar com Código:**

- Siga o estilo de código do Arthur
- Use a estrutura de pastas adequada para a semana atual
- Respeite os bloqueadores críticos (não avance se não dominar)

### **Para Criar Exercícios:**

- Adapte ao nível da semana atual
- Foque nas dificuldades identificadas
- Use o formato dos exercícios já criados

### **Para Debugging:**

- Explique o erro de forma didática
- Mostre como ler a mensagem de erro
- Ensine o processo de debug, não apenas corrija

---

**Versão:** 1.0  
**Última atualização:** Semana 1 - Terça-feira  
**Criado por:** Arthur (Tech Lead Backend)  
**Para:** Claude Code (assistente de desenvolvimento)
