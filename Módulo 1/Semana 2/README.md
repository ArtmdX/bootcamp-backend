# 📚 Semana 2 - Assincronismo e APIs com TypeScript

## 🎯 Objetivo da Semana

Dominar programação assíncrona em TypeScript e consumo de APIs!

## 📦 Configuração Inicial

```bash
# 1. Navegue até a pasta da Semana 2
cd "Módulo 1/Semana 2"

# 2. Instale as dependências
npm install

# 3. Execute qualquer arquivo TypeScript
npx ts-node Terça/1_promises_basico.ts
```

## 📅 Cronograma

### **Terça-feira** - Promises e async/await
- `1_promises_basico.ts` - O que são Promises
- `2_exercicio_promises.ts` - Exercícios práticos
- `3_async_await_introducao.ts` - Introdução ao async/await
- `4_exercicio_async.ts` - Exercícios de async/await
- `casa.ts` - Dever: Sistema de pedidos

### **Quarta-feira** - async/await na Prática
- `1_tratamento_erros.ts` - try/catch e error handling
- `2_multiplas_promises.ts` - Promise.all, race, allSettled
- `3_exercicio_multiplas.ts` - Exercícios paralelos
- `4_promise_chain.ts` - Encadeamento
- `casa.ts` - Dever: E-commerce completo

### **Quinta-feira** - Consumindo APIs
- `1_fetch_basico.ts` - fetch e APIs REST
- `2_jsonplaceholder.ts` - Explorando JSONPlaceholder
- `3_exercicio_fetch.ts` - Exercícios de fetch
- `4_tratamento_erros_api.ts` - Error handling para APIs
- `casa.ts` - Dever: Agregador de dados

### **Sexta-feira** - Projeto Final
- `projeto/` - Sistema completo de agregação de dados
- Leia `INSTRUCOES.md` para detalhes

## 🔧 Como Executar os Arquivos

```bash
# Executar um arquivo específico
npx ts-node Terça/1_promises_basico.ts

# Ou compilar e executar
npx tsc Terça/1_promises_basico.ts
node Terça/1_promises_basico.js
```

## 📝 Diferenças do TypeScript

### Tipagem de Promises

```typescript
// JavaScript
const promessa = new Promise((resolve, reject) => {
  resolve("resultado");
});

// TypeScript
const promessa: Promise<string> = new Promise((resolve, reject) => {
  resolve("resultado");
});
```

### Tipagem de funções async

```typescript
// Função async que retorna Promise<string>
async function buscarDados(): Promise<string> {
  return "dados";
}

// Função async que retorna Promise<number>
async function calcular(): Promise<number> {
  return 42;
}
```

### Interfaces para dados de API

```typescript
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

async function buscarUsuario(id: number): Promise<Usuario> {
  const response = await fetch(`/api/users/${id}`);
  return await response.json();
}
```

## 💡 Dicas Importantes

1. **Sempre defina tipos para Promises:**
   ```typescript
   const promise: Promise<TipoDoRetorno> = ...
   ```

2. **Use interfaces para estruturas complexas:**
   ```typescript
   interface Post {
     id: number;
     title: string;
     body: string;
   }
   ```

3. **Funções async sempre retornam Promise:**
   ```typescript
   async function exemplo(): Promise<void> {
     // código
   }
   ```

4. **Use tipos para parâmetros e retornos:**
   ```typescript
   function processar(dados: string[]): number {
     return dados.length;
   }
   ```

## ✅ Checklist de Conceitos

Ao final da semana, você deve dominar:

- [ ] Promises (criação, uso, estados)
- [ ] async/await
- [ ] try/catch
- [ ] Promise.all, Promise.race
- [ ] fetch API
- [ ] Tipagem em TypeScript
- [ ] Interfaces
- [ ] Tipos para funções assíncronas
- [ ] Error handling robusto

## 🚀 Próximos Passos

Após completar a Semana 2:
- **Semana 3:** Express + TypeScript (criando APIs)
- **Semana 4:** PostgreSQL + Prisma ORM

Bons estudos! 🎓
