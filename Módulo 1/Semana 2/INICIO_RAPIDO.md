# 🚀 Início Rápido - Semana 2 (TypeScript)

## ⚡ Para Começar AGORA

```bash
# 1. Entre na pasta da Semana 2
cd "Módulo 1/Semana 2"

# 2. Instale as dependências
npm install

# 3. Execute o primeiro arquivo
npx ts-node Terça/1_promises_basico.ts
```

## 📅 Cronograma Semanal

### Terça - Promises e async/await
```bash
npx ts-node Terça/1_promises_basico.ts
npx ts-node Terça/2_exercicio_promises.ts
npx ts-node Terça/3_async_await_introducao.ts
npx ts-node Terça/4_exercicio_async.ts
npx ts-node Terça/casa.ts  # Dever de casa
```

### Quarta - async/await na Prática
```bash
npx ts-node Quarta/1_tratamento_erros.ts
npx ts-node Quarta/2_multiplas_promises.ts
npx ts-node Quarta/3_exercicio_multiplas.ts
npx ts-node Quarta/4_promise_chain.ts
npx ts-node Quarta/casa.ts  # Dever de casa
```

### Quinta - Consumindo APIs
```bash
npx ts-node Quinta/1_fetch_basico.ts
npx ts-node Quinta/2_jsonplaceholder.ts
npx ts-node Quinta/3_exercicio_fetch.ts
npx ts-node Quinta/4_tratamento_erros_api.ts
npx ts-node Quinta/casa.ts  # Dever de casa
```

### Sexta - Projeto Final
```bash
cd Sexta/projeto
npm install
npm start
```

## 💡 Dicas TypeScript

### Tipando Promises
```typescript
const promise: Promise<string> = new Promise((resolve) => {
  resolve("resultado");
});
```

### Tipando Funções Async
```typescript
async function buscar(): Promise<number> {
  return 42;
}
```

### Criando Interfaces
```typescript
interface Usuario {
  id: number;
  nome: string;
}
```

## 📖 Documentação

- `README.md` - Visão geral completa
- `RESUMO_CONVERSAO.md` - Detalhes da conversão
- `Sexta/INSTRUCOES.md` - Guia do projeto final
- `Sexta/projeto/README.md` - Documentação do projeto

## ❓ Problemas Comuns

### "Cannot find module 'typescript'"
```bash
npm install
```

### "fetch is not defined" (Node < 18)
Atualize para Node.js 18+ ou instale:
```bash
npm install node-fetch@2
```

### Erro de tipos
Verifique se instalou as dependências:
```bash
npm install
```

## ✅ Pronto!

Agora é só seguir o cronograma e praticar!

**Bons estudos! 🎓**
