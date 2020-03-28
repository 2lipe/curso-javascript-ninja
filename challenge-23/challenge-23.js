(function( win, doc ) {
  'use strict';
  /*
  Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
  As regras são:

  - Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
  diretamente;
  - O input deve iniciar com valor zero;
  - Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
  - Deve haver 4 botões para as operações principais: soma (+), subtração(-),
  multiplicação(x) e divisão(÷);
  - Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
  que irá limpar o input, deixando-o com valor 0;

  - A cada número pressionado, o input deve atualizar concatenando cada valor
  digitado, como em uma calculadora real;
  - Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
  operação no input. Se o último caractere no input já for um símbolo de alguma
  operação, esse caractere deve ser substituído pelo último pressionado.
  Exemplo:
  - Se o input tem os valores: "1+2+", e for pressionado o botão de
  multiplicação (x), então no input deve aparecer "1+2x".
  - Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
  input;
  - Ao pressionar o botão "CE", o input deve ficar zerado.
  */

  /** Calculator var buttons */
    var $visor = doc.querySelector( '[data-js="visor"]' );
    const $operations = doc.querySelectorAll( '[data-js="operation-button"]' );
    const $numbers = doc.querySelectorAll( '[data-js="button-number"]' );
    const $clear = doc.querySelector( '[data-js="button-clear"]' );
    const $equal = doc.querySelector( '[data-js="button-equal"]' );
  /***/

  /** Events */
    Array.prototype.forEach.call( $numbers, button => {
      button.addEventListener( 'click', passValueForVisor, false );
    } );

    Array.prototype.forEach.call( $operations, button => {
      button.addEventListener( 'click', addOperator, false );
    } );

    $clear.addEventListener( 'click', clearCalculator, false );

    $equal.addEventListener( 'click', returnResult, false );
  /***/

  /** Functions */
    function passValueForVisor() {
      $visor.value += this.value;
    }

    function addOperator() {
      $visor.value = removeOrChangeOperator( $visor.value );
      $visor.value += this.value;
    }

    function isAOperator( item ) {
      let operations = [ '+', '-', 'x', '÷' ];
      let lastItem = item.split('').pop();

      return operations.some( operator => {
        return operator === lastItem;
      } );
    }

    function removeOrChangeOperator( item ) {
      if ( isAOperator( item ) ) {
        return item.slice( 0, -1 );
      }
      return item;
    }

    function clearCalculator() {
      $visor.value = null;
    }

    function returnResult() {
      let regexValues = new RegExp( '\\d+[.\\d+]?[+x÷-]?', 'g' );
      let allValues = $visor.value.match( regexValues );

      $visor.value = removeOrChangeOperator( $visor.value );
      $visor.value = allValues.reduce( function( accumulated, actual ) {
        let firstValue = accumulated.slice( 0, -1 );
        let operator = accumulated.split('').pop();
        let lastValue = removeOrChangeOperator( actual );
        let lastOperator = isAOperator( actual ) ? actual.split('').pop() : '';

        switch( operator ) {
          case '+':
            return ( Number( firstValue ) + Number( lastValue ) ) + lastOperator;
          case '-':
            return ( Number( firstValue ) - Number( lastValue ) ) + lastOperator;
          case 'x':
            return ( Number( firstValue ) * Number( lastValue ) ) + lastOperator;
          case '÷':
            return ( Number( firstValue ) / Number( lastValue ) ) + lastOperator;
        }

      } );

    }
  /***/

})( window, document );
