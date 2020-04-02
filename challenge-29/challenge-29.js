(function( DOM ) {
  'use strict';
  /*
  Vamos estruturar um pequeno app utilizando módulos.
  Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
  A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
  seguinte forma:
  - No início do arquivo, deverá ter as informações da sua empresa - nome e
  telefone (já vamos ver como isso vai ser feito)
  - Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
  um formulário para cadastro do carro, com os seguintes campos:
    - Imagem do carro (deverá aceitar uma URL)
    - Marca / Modelo
    - Ano
    - Placa
    - Cor
    - e um botão "Cadastrar"

  Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
  carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
  aparecer no final da tabela.

  Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
  empresa que vende carros. Esse nosso app será só um catálogo, por enquanto.
  Dê um nome para a empresa e um telefone fictício, preechendo essas informações
  no arquivo company.json que já está criado.

  Essas informações devem ser adicionadas no HTML via Ajax.

  Parte técnica:
  Separe o nosso módulo de DOM criado nas últimas aulas em
  um arquivo DOM.js.

  E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
  que será nomeado de "app".
  */

  const app = ( function appController() {
    return {

      init() {
        console.log( 'app init' );
        this.companyInfo();
        this.initEvents();
      },

      initEvents() {
        const $form = new DOM( '[data-js="form-register"]' );
        $form.on( 'submit', this.handleSubmit, false );
      },

      handleSubmit( e ) {
        e.preventDefault();
        const $tableCar = new DOM( '[data-js="table-car"]' );
        $tableCar.get().appendChild( app.addNewCar() );
      },

      addNewCar() {
        let $fragment = document.createDocumentFragment();
        let $tr = document.createElement( 'tr' );
        let $tdImage = document.createElement( 'td' );
        let $image = document.createElement( 'img' )
        let $tdBrand = document.createElement( 'td' );
        let $tdYear = document.createElement( 'td' );
        let $tdPlate = document.createElement( 'td' );
        let $tdColor = document.createElement( 'td' );

        $image.setAttribute( 'src', new DOM( '[data-js="car-image"]' ).get().value );
        $tdImage.appendChild( $image );

        $tdBrand.textContent = new DOM( '[data-js="car-brand"]' ).get().value;
        $tdYear.textContent = new DOM( '[data-js="car-year"]' ).get().value;
        $tdPlate.textContent = new DOM( '[data-js="car-plate"]' ).get().value;
        $tdColor.textContent = new DOM( '[data-js="car-color"]' ).get().value;

        $tr.appendChild( $tdImage );
        $tr.appendChild( $tdBrand );
        $tr.appendChild( $tdYear );
        $tr.appendChild( $tdPlate );
        $tr.appendChild( $tdColor );

        return $fragment.appendChild( $tr );
      },

      companyInfo() {
        console.log( 'Company Info is OK' )
        const companyPath = './company.json';
        const ajax = new XMLHttpRequest();

        ajax.open( 'GET', companyPath, true );
        ajax.send();
        ajax.addEventListener( 'readystatechange', this.getCompanyInfo, false );
      },

      getCompanyInfo() {
        console.log( 'Get Info is OK' )
        if( !app.isReady.call( this ) )
          return;

        const data = JSON.parse( this.responseText );
        const $companyName = new DOM( '[data-js="company-name"]' );
        const $companyPhone = new DOM( '[data-js="company-phone"]' );
        $companyName.get().textContent = data.name;
        $companyPhone.get().textContent = data.phone;
      },

      isReady() {
        return this.readyState === 4 && this.status === 200;
      }
    };
  })();
  app.init();

})( window.DOM );
