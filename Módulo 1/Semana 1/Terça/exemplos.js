const pessoa = {
  nome: 'Ana',
  idade: 25,
  profissao: 'Desenvolvedora',
  endereco: {
    rua: 'Rua das Flores',
    cidade: 'São Paulo',
    estado: 'SP'
  },
  listaDeCompras: ['banana', 'Açerola', 'Pera', 'Bacalhau']
};
// ... = spread operator
const { nome, idade, profissao, ...resto } = pessoa;

const [a, b, c, d] = pessoa.listaDeCompras;

console.log(d);
