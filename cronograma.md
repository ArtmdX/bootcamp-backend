# 📅 Bootcamp Backend - Cronograma Completo e Checklists

## 📊 Visão Geral

**Duração Total:** 12 semanas  
**Aluno:** Samuel  
**Mentor:** Arthur  
**Stack:** JavaScript/TypeScript, Node.js, Express, Prisma, PostgreSQL  
**Objetivo:** Desenvolvedor Backend Júnior

---

## 🗓️ Estrutura Semanal

### **Dias de Aula:**

- **Segunda:** Reuniões do Tech Lead (Arthur) - Samuel recebe material
- **Terça a Sexta:** Aulas práticas (1h30-2h cada)
- **Sábado:** Code Review (30-45min)

### **Tempo de Dedicação:**

- Aulas: ~7h/semana
- Prática individual: ~15h/semana
- **Total:** ~22h/semana

---

# 📘 MÓDULO 1: Fundamentos (Semanas 1-3)

## 🎯 Objetivo do Módulo

Do zero ao primeiro servidor Express rodando com TypeScript

---

## 📅 SEMANA 1: JavaScript/TypeScript Básico

### **Temas da Semana:**

- **Terça:** Funções, arrow functions, métodos de array (.map, .filter, .find)
- **Quarta:** Revisão de funções
- **Quinta:** Objetos, destructuring, introdução ao TypeScript, Interfaces, tipagem de funções
- **Sexta:** princípios da orientação a objeto, mini-projeto

### **Entregável:**

Sistema de cadastro de posts em memória (TypeScript)

### **✅ Checklist de Conceitos:**

- [ ] Usa `const` e `let` adequadamente (não usa `var`)
- [ ] Funções têm nomes descritivos
- [ ] Tipagem TypeScript presente (interfaces, tipos de retorno)
- [ ] Usa métodos de array (`.map()`, `.filter()`, `.find()`) ao invés de loops manuais
- [ ] Código organizado e legível

### **🚨 Bloqueador:**

Se não conseguir manipular arrays básicos, precisa revisar antes de seguir

### **📝 Perguntas do Code Review:**

1. "Me explica o que é uma interface"
2. "Por que usamos `const` ao invés de `let` para o array?"
3. "O que o método `.filter()` retorna?"
4. "O que acontece se tentar adicionar número onde deveria ser string?"

---

## 📅 SEMANA 2: Assincronismo e APIs

### **Temas da Semana:**

- **Terça:** Conceito de assincronismo, Promises, `.then()` e `.catch()`
- **Quarta:** `async/await`, tratamento de erros com `try/catch`
- **Quinta:** Consumir APIs com `fetch`, trabalhar com JSON
- **Sexta:** Projeto: agregador de dados de API

### **Entregável:**

Fazer uma API que consome API pública (JSONPlaceholder) e formata resposta JSON e salva em memória

### **✅ Checklist de Conceitos:**

- [ ] Usa `async/await` corretamente
- [ ] Trata erros com `try/catch`
- [ ] Não deixa Promises "penduradas" (sempre aguarda resolução)
- [ ] Entende quando usar `Promise.all()` para paralelismo
- [ ] Tipagem correta (tipos de retorno `Promise<T>`)

### **🚨 Bloqueador:**

Se não entender `async/await`, vai sofrer muito no Express

### **📝 Perguntas do Code Review:**

1. "O que é uma Promise?"
2. "Qual a diferença entre `.then()` e `async/await`?"
3. "Por que precisamos do `await`?"
4. "Como você trata erros em código assíncrono?"

---

## 📅 SEMANA 3: Express + TypeScript Setup

### **Temas da Semana:**

- **Terça:** O que é servidor HTTP, instalar Express e TypeScript
- **Quarta:** Rotas básicas (GET, POST), middleware `express.json()`
- **Quinta:** Rotas PUT e DELETE, estrutura de pastas
- **Sexta:** Projeto: API de Blog em memória

### **Entregável:**

API REST com CRUD de posts (ainda em memória, sem banco)

### **✅ Checklist de Conceitos:**

- [ ] Servidor Express rodando sem erros
- [ ] TypeScript configurado corretamente
- [ ] Rotas GET e POST funcionando
- [ ] PUT e DELETE implementados corretamente
- [ ] Usa status HTTP adequados (200, 201, 404)
- [ ] Validação básica de entrada (verifica se campos existem)
- [ ] Código organizado em pastas (`routes/`)

### **🚨 Bloqueador:**

Se o servidor não subir ou rotas não funcionarem, precisa revisar setup

### **📝 Perguntas do Code Review:**

1. "O que é uma rota HTTP?"
2. "Qual a diferença entre GET e POST?"
3. "Por que usamos status 201 ao invés de 200 no POST?"
4. "O que faz o middleware `express.json()`?"

---

# 📘 MÓDULO 2: O Coração da API (Semanas 4-8)

## 🎯 Objetivo do Módulo

Migrar API para PostgreSQL, dominar Prisma e relações complexas

---

## 📅 SEMANA 4: SQL Puro + PostgreSQL + Prisma

### **Temas da Semana:**

#### **Dias 1-2 (Terça-Quarta): SQL Puro**

- Criar tabelas (DDL)
- INSERT, SELECT, UPDATE, DELETE
- WHERE, ORDER BY, LIMIT
- **JOINs** (INNER, LEFT) - crítico!
- GROUP BY e agregações (COUNT, AVG, SUM)
- Índices

#### **Dias 3-5 (Quinta-Sexta): Prisma ORM**

- Schema Prisma
- Migrations
- Prisma Client (queries básicas)
- Comparar SQL vs Prisma

### **Entregável:**

- Arquivo `analise.sql` com queries SQL puras
- API migrada para PostgreSQL com Prisma

### **✅ Checklist - SQL Puro:**

- [ ] Criou tabelas com PKs e FKs corretamente
- [ ] Escreveu INSERTs, UPDATEs e DELETEs
- [ ] **Domina JOINs (INNER e LEFT)** ⭐
- [ ] Usa GROUP BY e agregações
- [ ] Criou índices
- [ ] Arquivo `analise.sql` com queries complexas

### **✅ Checklist - Prisma:**

- [ ] Schema Prisma configurado corretamente
- [ ] Entende como Prisma gera SQL
- [ ] Migrou API para usar Prisma
- [ ] Sabe usar `include`, `select`, `where`, `orderBy`
- [ ] Usa `async/await` corretamente
- [ ] Trata erros adequadamente

### **🚨 Bloqueador:**

- Se não souber JOINs em SQL, vai ter dificuldade com `include` no Prisma
- Se não entender FKs, vai errar relacionamentos

### **📝 Perguntas do Code Review:**

1. "Me explica o que é uma Foreign Key e por que usamos?"
2. "Como você faria um JOIN entre posts e usuários em SQL puro?"
3. "O que o Prisma faz quando você usa `include: { autor: true }`?"
4. "Por que criamos índices? Quando devemos criar um?"
5. "Me mostra como buscar todos os posts de um usuário específico"

---

## 📅 SEMANA 5: Relações 1:N (User → Posts)

### **Temas da Semana:**

- **Terça:** Modelagem de dados, conceito de relações
- **Quarta:** Criar modelo User, relação com Post
- **Quinta:** Queries com `include` (trazer dados relacionados)
- **Sexta:** Validação de Foreign Keys

### **Entregável:**

API com usuários e posts relacionados (relação 1:N funcionando)

### **✅ Checklist de Conceitos:**

- [ ] Schema tem relação 1:N corretamente configurada
- [ ] Migration executada com sucesso
- [ ] CRUD de usuários funcionando
- [ ] Validação de email único implementada
- [ ] Queries com `include` funcionando
- [ ] Validação de foreign key antes de criar post
- [ ] Cascade delete configurado e testado

### **🚨 Bloqueador:**

Se não entender relações 1:N, vai sofrer nas próximas relações

### **📝 Perguntas do Code Review:**

1. "O que significa relação 1:N?"
2. "Como você garante que um post sempre tem um autor válido?"
3. "O que acontece com os posts se deletarmos um usuário?"
4. "Como você buscaria um post com dados do autor junto?"

---

## 📅 SEMANA 6: Relações N:N (Posts ↔ Categorias)

### **Temas da Semana:**

- **Terça:** Adicionar modelo Comment (outra relação 1:N)
- **Quarta:** Criar modelo Categoria
- **Quinta:** Relação N:N entre Post e Categoria
- **Sexta:** Queries complexas com múltiplos `include`

### **Entregável:**

API completa com comentários e categorias (todas as entidades relacionadas)

### **✅ Checklist de Conceitos:**

- [ ] Relação N:N está funcionando (connect/disconnect)
- [ ] Queries com múltiplos `include` funcionando
- [ ] Comentários vinculados corretamente a posts e usuários
- [ ] Categorias podem ser reutilizadas em múltiplos posts
- [ ] `select` sendo usado para não expor senha
- [ ] Ordenação de comentários por data

### **🚨 Bloqueador:**

Se não entender N:N, vai ter problemas em projetos reais

### **📝 Perguntas do Code Review:**

1. "Qual a diferença entre relação 1:N e N:N?"
2. "Como você adiciona uma categoria a um post?"
3. "Como você remove uma categoria sem deletar o post?"
4. "Por que não incluímos a senha do usuário nas respostas?"

---

## 📅 SEMANA 7: Organização de Código (Services)

### **Temas da Semana:**

- **Terça:** Arquitetura em camadas (Routes → Services → Prisma)
- **Quarta:** Criar Services para Users e Posts
- **Quinta:** DTOs (Data Transfer Objects)
- **Sexta:** Tratamento centralizado de erros

### **Entregável:**

Código refatorado com Services, DTOs e estrutura organizada

### **✅ Checklist de Conceitos:**

- [ ] Rotas só lidam com Request/Response
- [ ] Lógica de negócio está nos services
- [ ] DTOs estão sendo usados
- [ ] Classes de erro customizadas implementadas
- [ ] Middleware de erro funcionando
- [ ] Código não possui duplicação
- [ ] Estrutura de pastas organizada

### **🚨 Bloqueador:**

Se não entender separação de responsabilidades, código vai virar bagunça

### **📝 Perguntas do Code Review:**

1. "Por que separamos a lógica em Services?"
2. "O que é um DTO e por que usamos?"
3. "Onde devemos colocar validações de negócio?"
4. "Qual a vantagem de ter classes de erro customizadas?"

---

## 📅 SEMANA 8: Queries Avançadas e Performance

### **Temas da Semana:**

- **Terça:** Paginação (offset/limit)
- **Quarta:** Filtros e busca textual
- **Quinta:** Agregações e estatísticas
- **Sexta:** Índices e otimização

### **Entregável:**

Sistema de paginação, busca e filtros funcionando

### **✅ Checklist de Conceitos:**

- [ ] Paginação implementada em todas as listagens
- [ ] Filtros funcionando corretamente
- [ ] Queries de agregação funcionando
- [ ] Índices adicionados no schema
- [ ] `Promise.all()` usado para queries paralelas
- [ ] Query params validados antes de usar
- [ ] Documentação de endpoints atualizada

### **🚨 Bloqueador:**

Se não conseguir implementar paginação, API não será escalável

### **📝 Perguntas do Code Review:**

1. "Como funciona a paginação offset/limit?"
2. "Por que usamos índices no banco de dados?"
3. "O que faz o `Promise.all()`?"
4. "Como você otimizaria uma query lenta?"

---

# 📘 MÓDULO 3: Nível Júnior (Semanas 9-12)

## 🎯 Objetivo do Módulo

Autenticação, autorização, validações robustas e deploy em produção

---

## 📅 SEMANA 9: Autenticação (JWT + Bcrypt)

### **Temas da Semana:**

- **Terça:** Hash de senhas com Bcrypt
- **Quarta:** Tokens JWT (gerar e validar)
- **Quinta:** Rota de registro (signup)
- **Sexta:** Rota de login

### **Entregável:**

Sistema de autenticação completo (registro + login com JWT)

### **✅ Checklist de Conceitos:**

- [ ] Senhas são hasheadas com bcrypt (NUNCA em texto puro)
- [ ] Login retorna token JWT válido
- [ ] Token contém userId e email no payload
- [ ] JWT_SECRET está em variável de ambiente
- [ ] Senhas NUNCA aparecem nas respostas da API
- [ ] Validações de entrada implementadas
- [ ] Mensagens de erro não revelam se email existe (segurança)

### **🚨 Bloqueador:**

Se não entender JWT ou bcrypt, não consegue proteger rotas

### **📝 Perguntas do Code Review:**

1. "Por que não podemos salvar senha em texto puro?"
2. "O que é um hash? É reversível?"
3. "O que vai dentro do payload do JWT?"
4. "Onde guardamos o JWT_SECRET?"
5. "Como o cliente usa o token nas próximas requisições?"

---

## 📅 SEMANA 10: Autorização e Rotas Protegidas

### **Temas da Semana:**

- **Terça:** Criar middleware de autenticação
- **Quarta:** Proteger rotas (adicionar middleware)
- **Quinta:** Ownership validation (usuário só edita o que é dele)
- **Sexta:** Rota de perfil do usuário

### **Entregável:**

API com rotas públicas e protegidas, validação de ownership

### **✅ Checklist de Conceitos:**

- [ ] Middleware de autenticação funcionando
- [ ] Token é extraído do header Authorization corretamente
- [ ] userId está disponível em `req.userId` nas rotas protegidas
- [ ] Rotas públicas acessíveis sem token
- [ ] Rotas protegidas retornam 401 sem token
- [ ] Validação de ownership implementada (403 quando não é dono)
- [ ] Status HTTP corretos (401 vs 403 vs 404)

### **🚨 Bloqueador:**

Se não entender middleware ou ownership, vai ter problemas de segurança

### **📝 Perguntas do Code Review:**

1. "Qual a diferença entre autenticação e autorização?"
2. "Como o middleware de auth funciona?"
3. "Qual a diferença entre status 401 e 403?"
4. "Como você garante que um usuário só edita seus próprios posts?"
5. "O que acontece se o token for inválido ou expirado?"

---

## 📅 SEMANA 11: Validações Robustas (Zod)

### **Temas da Semana:**

- **Terça:** Classes de erro customizadas
- **Quarta:** Middleware global de erro
- **Quinta:** Schemas de validação com Zod
- **Sexta:** Refatorar todas as rotas com validação

### **Entregável:**

API com validações robustas em todas as rotas

### **✅ Checklist de Conceitos:**

- [ ] Classes de erro customizadas implementadas
- [ ] Middleware global de erro funcionando
- [ ] Todas as rotas validam entrada com Zod
- [ ] Services lançam erros customizados (não retornam null)
- [ ] Mensagens de erro são consistentes e úteis
- [ ] Query params são validados
- [ ] Logs de erro estão sendo gerados
- [ ] Status HTTP corretos em todos os cenários

### **🚨 Bloqueador:**

Se validações não estiverem implementadas, API é vulnerável

### **📝 Perguntas do Code Review:**

1. "Por que usar Zod ao invés de validação manual?"
2. "O que é uma classe de erro customizada?"
3. "Como funciona o middleware de erro global?"
4. "Qual a diferença entre erro operacional e erro de programação?"

---

## 📅 SEMANA 12: Deploy e Documentação

### **Temas da Semana:**

- **Terça:** Preparar app para produção (CORS, variáveis de ambiente)
- **Quarta:** Deploy no Railway (banco + API)
- **Quinta:** Documentação completa (README)
- **Sexta:** Postman collection, testes finais

### **Entregável:**

API em produção + documentação completa

### **✅ Checklist de Conceitos:**

- [ ] API acessível via URL pública
- [ ] Banco de dados funcionando em produção
- [ ] Todas as rotas testadas em produção
- [ ] README bem documentado
- [ ] Postman collection funcional
- [ ] CORS configurado
- [ ] Variáveis de ambiente seguras (não commitadas)
- [ ] Deploy automatizado (push no GitHub = deploy)

### **🚨 Bloqueador:**

Se API não estiver acessível pela internet, não foi concluído

### **📝 Perguntas do Code Review:**

1. "O que é CORS e por que precisamos?"
2. "Como você configurou as variáveis de ambiente em produção?"
3. "Como funcionam as migrations em produção?"
4. "Como alguém pode testar sua API agora?"

---

# 📋 Resumo dos Entregáveis

| Semana | Módulo      | Entregável Principal             |
| ------ | ----------- | -------------------------------- |
| **1**  | Fundamentos | Sistema de posts em memória (TS) |
| **2**  | Fundamentos | Script de consumo de API + JSON  |
| **3**  | Fundamentos | Servidor Express com CRUD        |
| **4**  | Coração     | analise.sql + API com Prisma     |
| **5**  | Coração     | API com Users e Posts (1:N)      |
| **6**  | Coração     | API com Comentários e Categorias |
| **7**  | Coração     | Código refatorado (Services)     |
| **8**  | Coração     | Paginação + Busca + Filtros      |
| **9**  | Júnior      | Autenticação (registro + login)  |
| **10** | Júnior      | Rotas protegidas + autorização   |
| **11** | Júnior      | Validações com Zod               |
| **12** | Júnior      | Deploy + Documentação            |

---

# 🎯 Critérios de Aprovação por Módulo

## ✅ Módulo 1 → Módulo 2

- [ ] Manipula arrays e objetos sem ajuda
- [ ] Entende `async/await`
- [ ] Servidor Express rodando com CRUD básico
- [ ] Comfortável com TypeScript básico

## ✅ Módulo 2 → Módulo 3

- [ ] Domina JOINs em SQL
- [ ] Sabe usar Prisma (CRUD + relacionamentos)
- [ ] Código organizado em Services
- [ ] Paginação implementada
- [ ] Entende relações 1:N e N:N

## ✅ Módulo 3 → Desenvolvedor Júnior

- [ ] Sistema de autenticação funcionando
- [ ] Rotas protegidas implementadas
- [ ] Validações robustas com Zod
- [ ] API em produção e documentada
- [ ] Capaz de explicar decisões técnicas

---

# 🚨 Bloqueadores Críticos (Impedem Avanço)

### **Semana 1:**

- ❌ Não consegue manipular arrays básicos

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

# 📊 Tracking de Progresso

## Semana 1: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 2: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 3: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 4: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 5: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 6: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 7: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 8: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 9: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 10: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 11: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

## Semana 12: ⬜

**Status:** Não iniciada  
**Conceitos-chave pendentes:**  
**Dificuldades encontradas:**  
**Observações:**

---

# 💡 Legenda de Status

- ⬜ Não iniciada
- 🟡 Em andamento
- ✅ Concluída com sucesso
- ⚠️ Concluída com ressalvas (precisa revisar)
- ❌ Bloqueada (precisa refazer)

---

# 📝 Notas Gerais

**Observações do Mentor:**

**Ajustes de Ritmo:**

**Pontos Fortes do Aluno:**

**Pontos de Atenção:**

---

**Última atualização:** [Data]  
**Versão:** 1.0  
**Criado por:** Arthur (Tech Lead Backend)
