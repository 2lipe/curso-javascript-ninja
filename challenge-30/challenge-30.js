(function( DOM ) {
  'use strict';
/*
A loja de carros será nosso desafio final. Na aula anterior, você fez a parte
do cadastro dos carros. Agora nós vamos começar a deixar ele com cara de
projeto mesmo.

Crie um novo repositório na sua conta do GitHub, com o nome do seu projeto.

Na hora de criar, o GitHub te dá a opção de criar o repositório com um
README. Use essa opção.

Após criar o repositório, clone ele na sua máquina.

Crie uma nova branch chamada `challenge-30`, e copie tudo o que foi feito no
desafio da aula anterior para esse novo repositório, nessa branch
`challenge-30`.

Adicione um arquivo na raiz desse novo repositório chamado `.gitignore`.
O conteúdeo desse arquivo deve ser somente as duas linhas abaixo:

node_modules
npm-debug.log

Faça as melhorias que você achar que são necessárias no seu código, removendo
duplicações, deixando-o o mais legível possível, e então suba essa alteração
para o repositório do seu projeto.

Envie um pull request da branch `challenge-30` para a `master` e cole aqui
nesse arquivo, dentro do `console.log`, o link para o pull request no seu
projeto.
*/

const app = ( function appController() {
  return {

    init() {
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
      const { $fragment, $tr, $tdImage, $image, $tdBrand, $tdYear, $tdPlate, $tdColor } =
      this.createCarElements();

      this.getCarElements( $tdBrand, $tdYear, $tdPlate, $tdColor);
      this.addCarElements( $tr, $tdImage, $tdBrand, $tdYear, $tdPlate, $tdColor );
      this.carImage( $tdImage, $image );

      return $fragment.appendChild( $tr );
    },

    createCarElements() {
      const $fragment = document.createDocumentFragment();
      const $tr = document.createElement('tr');
      const $tdImage = document.createElement('td');
      const $image = document.createElement('img');
      const $tdBrand = document.createElement('td');
      const $tdYear = document.createElement('td');
      const $tdPlate = document.createElement('td');
      const $tdColor = document.createElement('td');

      return { $fragment, $tr, $tdImage, $image,  $tdBrand, $tdYear, $tdPlate, $tdColor };
    },

    getCarElements( brand, year, plate, color ) {
      brand.textContent = new DOM('[data-js="car-brand"]').get().value;
      year.textContent = new DOM('[data-js="car-year"]').get().value;
      plate.textContent = new DOM('[data-js="car-plate"]').get().value;
      color.textContent = new DOM('[data-js="car-color"]').get().value;
    },

    addCarElements( param , image, brand, year, plate, color ) {
      param.appendChild( image );
      param.appendChild( brand );
      param.appendChild( year );
      param.appendChild( plate );
      param.appendChild( color );
    },

    carImage( param, image ) {
      image.setAttribute('src', new DOM('[data-js="car-image"]').get().value);
      param.appendChild( image );
    },

    companyInfo() {
      const companyPath = './company.json';
      const ajax = new XMLHttpRequest();

      ajax.open( 'GET', companyPath, true );
      ajax.send();
      ajax.addEventListener( 'readystatechange', this.getCompanyInfo, false );
    },

    getCompanyInfo() {
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
