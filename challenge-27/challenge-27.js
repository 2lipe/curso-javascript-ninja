(function() {
  'use strict';
  /*
    Aproveitando a lib DOM que fizemos na semana anterior, crie agora para ela
    métodos semelhantes aos que existem no array, mas que sirvam para os
    elementos do DOM selecionados.
    Crie os seguintes métodos:
    - forEach, map, filter, reduce, reduceRight, every e some.

    Crie também métodos que verificam o tipo do objeto passado por parâmetro.
    Esses métodos não precisam depender de criar um novo elmento do DOM, podem
    ser métodos estáticos.

    Métodos estáticos não obrigam o uso do `new`, podendo ser usados diretamente
    no objeto, como nos exemplos abaixo:
    DOM.isArray([1, 2, 3]); // true
    DOM.isFunction(function() {}); // true
    DOM.isNumber('numero'); // false

    Crie os seguintes métodos para verificação de tipo:
    - isArray, isObject, isFunction, isNumber, isString, isBoolean, isNull.
    O método isNull deve retornar `true` se o valor for null ou undefined.
    */
  class DOM {
    constructor( element ) {
      this.element = this.getDOMElements(element);
    }
    getDOMElements( element ) {
      return document.querySelectorAll(element);
    }
    on( event, callback ) {
      Array.prototype.forEach.call( this.element, element => {
        element.addEventListener( event, callback, false );
      });
    }
    off( event, callback ) {
      Array.prototype.forEach.call( this.element, element => {
        element.removeEventListener( event, callback, false );
      });
    }
    get() {
      return this.element;
    }
     forEach() {
      return Array.prototype.forEach.apply( this.element, arguments );
    }
    map() {
      return Array.prototype.map.apply( this.element, arguments );
    }
    filter() {
      return Array.prototype.filter.apply( this.element, arguments );
    }
    reduce() {
      return Array.prototype.reduce.apply( this.element, arguments );
    }
    reduceRight() {
      return Array.prototype.reduceRight.apply( this.element, arguments );
    }
    every() {
      return Array.prototype.every.apply( this.element, arguments );
    }
    some() {
      return Array.prototype.some.aplly( this.element, arguments );
    }
    isArray( param ) {
      return Object.prototype.toString.call( param ) === '[object Array]';
    }
    isObject( param ) {
      return Object.prototype.toString.call( param ) === '[object Object]';
    }
    isFunction( param ) {
      return Object.prototype.toString.call( param ) === '[object Function]';
    }
    isNumber( param ) {
      return Object.prototype.toString.call( param ) === '[object Number]';
    }
    isString( param ) {
      return Object.prototype.toString.call( param ) === '[object String]';
    }
    isBoolean( param ) {
      return Object.prototype.toString.call( param ) === '[object Boolean]';
    }
    isNull( param ) {
      return Object.prototype.toString.call( param ) === '[object Null]' ||
      Object.prototype.toString.call( param ) === '[object Undefined]';
    }
  }

  var $a = new DOM('[data-js="link"]');

  $a.forEach( item => {
    console.log( item.firstChild );
  } );
  console.log( $a.map( item => {
   return item.getAttribute('data-js');
  }) );

  console.log( DOM.prototype.isArray( [1, 2, 3] ) );
  console.log( DOM.prototype.isBoolean( true ) );
  console.log( DOM.prototype.isNull() );

})();
