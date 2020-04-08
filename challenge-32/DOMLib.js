(function( win ) {
  'use strict';
  class DOM {

    constructor( element ) {
      this.element = document.querySelectorAll( element );
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
    get( index ) {
      if( !index )
        return this.element[0];
      return this.element[index];
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
  }
  DOM.isArray = function isArray( param ) {
    return Object.prototype.toString.call( param ) === '[object Array]';
  }
  DOM.isObject = function isObject( param ) {
    return Object.prototype.toString.call( param ) === '[object Object]';
  }
  DOM.isFunction = function isFunction( param ) {
    return Object.prototype.toString.call( param ) === '[object Function]';
  }
  DOM.isNumber = function isNumber( param ) {
    return Object.prototype.toString.call( param ) === '[object Number]';
  }
  DOM.isString = function isString( param ) {
    return Object.prototype.toString.call( param ) === '[object String]';
  }
  DOM.isBoolean = function isBoolean( param ) {
    return Object.prototype.toString.call( param ) === '[object Boolean]';
  }
  DOM.isNull = function isNull( param ) {
    return Object.prototype.toString.call( param ) === '[object Null]' ||
    Object.prototype.toString.call( param ) === '[object Undefined]';
  }

  win.DOM = DOM;
})( window );
