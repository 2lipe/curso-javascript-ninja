/*
Crie um array com 5 items (tipos variados).
*/

var itens = [
  'nail',
  'keys',
  'tools',
  'paper',
  'pen'
];

/*
Crie uma função chamada `addItem`, que irá adicionar itens no array criado.
A função deverá retornar o array atualizado.
*/
function addItem( itemName ) {
  itens.push( itemName );

  return itens;

};

/*
Adicione um novo array ao array criado no início do desafio, com ao menos 3
itens de tipos diferentes, mostrando o resultado no console.
*/

addItem([ 'beer', 'cup', 'coffee' ]);

console.log(itens);

/*
Mostre no console o segundo elemento desse último array, criado acima, com a
frase:
"O segundo elemento do segundo array é [ELEMENTO]."
*/

console.log( 'O segundo elemento do segundo array é ' + itens[5][1] + '.' );

/*
Mostre no console quantos itens tem o primeiro array criado, com a frase:
"O primeiro array tem [QUANTIDADE DE ITENS] itens."
*/

var qtdArray1 = itens.length;

console.log( 'O primeiro array tem ' + qtdArray1 + ' itens.' );

/*
Agora mostre no console quantos itens tem o segundo array criado, com a frase:
"O segundo array tem [QUANTIDADE DE ITENS] itens."
*/

var qtdArray2 = itens[5].length;

console.log( 'O segundo array tem ' + qtdArray2 + ' itens.' );

/*
Utilizando a estrutura de repetição `while`, mostre no console todos os números
pares entre 10 e 20, inclusive esses 2.
*/

var num = 10;

while ( num <= 20 ) {

  num % 2 === 0 ? console.log( 'Números pares entre 10 e 20: ' + num ) : '';

  num++;

};




/*
Na mesma ideia do exercício acima: mostre agora os números ímpares.
*/

var num2 = 10

while ( num2 <= 20 ) {

  num2 % 2 !== 0 ? console.log( 'Números impares entre 10 e 20: ' + num2 ) : '';

  num2++;

};





/*
Repita os mesmos exercícios feitos acima, mas agora usando o loop "for".
Só vamos mudar o range:
- No primeiro "for", mostre os números pares entre 100 e 120, inclusive eles;
- No segundo "for", mostre os números ímpares entre 111 e 125, inclusive eles.
*/


for ( var index1 = 100; index1 <= 120 && index1 % 2 === 0; index1++ ) {

  console.log( 'Números pares entre 100 e 120: ' + index1++ );

};

for ( var index2 = 111; index2 <= 125 && index2 % 2 !== 0; index2++ ) {

  console.log( 'Números ímpares entre 111 e 125: ' + index2++ );

};




