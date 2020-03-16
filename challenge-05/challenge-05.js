/*
Crie uma variável qualquer, que receba um array com alguns valores aleatórios
- ao menos 5 - (fica por sua conta os valores do array).
*/

var myArray = [
  'Felipe',
  25,
  true,
  {nomeCompleto: 'Felipe Vieira'},
  [1, 2, 3]
];

/*
Crie uma função que receba um array como parâmetro, e retorne esse array.
*/

function myFunction(args) {
  return args;
};

/*
Imprima o segundo índice do array retornado pela função criada acima.
*/

console.log(myFunction( myArray[1] ));

/*
Crie uma função que receba dois parâmetros: o primeiro, um array de valores; e o
segundo, um número. A função deve retornar o valor de um índice do array que foi passado
no primeiro parâmetro. O índice usado para retornar o valor, deve ser o número passado no
segundo parâmetro.
*/

function arrayFunction(args, x) {
  return args[x];
};

/*
Declare uma variável que recebe um array com 5 valores, de tipos diferentes.
*/
var myArray2 = [
  0,
  null,
  'Música',
  {estiloMusical: 'Rock'},
  [10, 5, 0]
]

/*
Invoque a função criada acima, fazendo-a retornar todos os valores do último
array criado.
*/

console.log(arrayFunction( myArray2,0 ));
console.log(arrayFunction( myArray2,1 ));
console.log(arrayFunction( myArray2,2 ));
console.log(arrayFunction( myArray2,3 ));
console.log(arrayFunction( myArray2,4 ));

/*
Crie uma função chamada `book`, que recebe um parâmetro, que será o nome do
livro. Dentro dessa função, declare uma variável que recebe um objeto com as
seguintes características:
- esse objeto irá receber 3 propriedades, que serão nomes de livros;
- cada uma dessas propriedades será um novo objeto, que terá outras 3
propriedades:
    - `quantidadePaginas` - Number (quantidade de páginas)
    - `autor` - String
    - `editora` - String
- A função deve retornar o objeto referente ao livro passado por parâmetro.
- Se o parâmetro não for passado, a função deve retornar o objeto com todos
os livros.
*/

function book(name) {

  var books = {

    livro1: {
      quantidadePaginas: 100,
      autor: 'autor1',
      editora: 'editora1'
    },

    livro2: {
      quantidadePaginas: 200,
      autor: 'autor2',
      editora: 'editora2'
    },

    livro3: {
      quantidadePaginas: 300,
      autor: 'autor3',
      editora: 'editora3'
    }

  };

  if(!name) {
    return books;

  }

  return books[name];

};

var infoLivros = book();

/*
Usando a função criada acima, imprima o objeto com todos os livros.
*/

console.log( infoLivros );

/*
Ainda com a função acima, imprima a quantidade de páginas de um livro qualquer,
usando a frase:
"O livro [NOME_DO_LIVRO] tem [X] páginas!"
*/

var name = ['livro1', 'livro2', 'livro3'];

console.log( 'O livro ' + name[1] + ' tem ' + book(name[1]).quantidadePaginas + ' paginas!' );

/*
Ainda com a função acima, imprima o nome do autor de um livro qualquer, usando
a frase:
"O autor do livro [NOME_DO_LIVRO] é [AUTOR]."
*/

console.log( 'O autor do livro ' + name[0] + ' é ' + book(name[0]).autor + '.' );

/*
Ainda com a função acima, imprima o nome da editora de um livro qualquer, usando
a frase:
"O livro [NOME_DO_LIVRO] foi publicado pela editora [NOME_DA_EDITORA]."
*/

console.log( 'O livro ' + name[2] + ' foi publicado pela editora ' + book(name[2]).editora + '.' );
