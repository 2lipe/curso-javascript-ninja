(function( DOM,doc ) {
  'use strict';
  /*
  Já temos as funcionalidades de adicionar e remover um carro. Agora, vamos persistir esses dados,
  salvando-os temporariamente na memória de um servidor.

  Nesse diretório do `challenge-32` tem uma pasta `server`. É um servidor simples, em NodeJS, para
  que possamos utilizar para salvar as informações dos nossos carros.

  Para utilizá-lo, você vai precisar fazer o seguinte:

  - Via terminal, acesse o diretório `server`;
  - execute o comando `npm install` para instalar as dependências;
  - execute `node app.js` para iniciar o servidor.

  Ele irá ser executado na porta 3000, que pode ser acessada via browser no endereço:
  `http://localhost:3000`

  O seu projeto não precisa estar rodando junto com o servidor. Ele pode estar em outra porta.
  As mudanças que você irá precisar fazer no seu projeto são:

  - Para listar os carros cadastrados ao carregar o seu projeto, faça um request GET no endereço
  `http://localhost:3000/car`
  - Para cadastrar um novo carro, faça um POST no endereço `http://localhost:3000/car`, enviando
  os seguintes campos:
    - `image` com a URL da imagem do carro;
    - `brandModel`, com a marca e modelo do carro;
    - `year`, com o ano do carro;
    - `plate`, com a placa do carro;
    - `color`, com a cor do carro.

  Após enviar o POST, faça um GET no `server` e atualize a tabela para mostrar o novo carro cadastrado.

  Crie uma branch `challenge-32` no seu projeto, envie um pull request lá e cole nesse arquivo a URL
  do pull request.
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
        app.post();
        app.get();

        const $tableCar = new DOM( '[data-js="table-car"]' );
        $tableCar.get().appendChild( app.handleCar() );
      },

      handleCar() {
        const $fragment = doc.createDocumentFragment();
        const $tr = doc.createElement('tr');

        this.addNewCar( $tr );
        this.removeCar( $tr );

        return $fragment.appendChild( $tr );
      },

      addNewCar( tr ) {
        const { $tdImage, $image, $tdBrand, $tdYear, $tdPlate, $tdColor } =
        this.createCarElements();

        this.getCarElements( $tdBrand, $tdYear, $tdPlate, $tdColor );
        this.addCarElements( tr, $tdImage, $tdBrand, $tdYear, $tdPlate, $tdColor );
        this.carImage( $image, $tdImage );
      },

      createCarElements() {
        const $tdImage = doc.createElement('td');
        const $image = doc.createElement('img');
        const $tdBrand = doc.createElement('td');
        const $tdYear = doc.createElement('td');
        const $tdPlate = doc.createElement('td');
        const $tdColor = doc.createElement('td');
        const $button = doc.createElement('button');
        const $textButton = doc.createTextNode('X');
        const $tdRemoveCar = doc.createElement('td');

        return { $tdImage, $image,  $tdBrand, $tdYear, $tdPlate, $tdColor, $button,
        $textButton, $tdRemoveCar };
      },

      getCarElements( brand, year, plate, color ) {
        brand.textContent = new DOM('[data-js="brand"]').get().value;
        year.textContent = new DOM('[data-js="year"]').get().value;
        plate.textContent = new DOM('[data-js="plate"]').get().value;
        color.textContent = new DOM('[data-js="color"]').get().value;
      },

      addCarElements( tr, image, brand, year, plate, color ) {
        const car = [ image, brand, year, plate, color ];
        car.forEach( function( item ) {
          tr.appendChild( item );
        } );
      },

      carImage( image, tdImage ) {
        image.setAttribute('src', new DOM('[data-js="image"]').get().value);
        tdImage.appendChild( image );
      },

      removeCar( tr ) {
        const { $button, $textButton, $tdRemoveCar } =
        this.createCarElements();

        this.buttonRemove( $button, $textButton, $tdRemoveCar, tr );
        $button.addEventListener( 'click', e => {
          e.preventDefault();
          tr.innerHTML = '';
        }, false );
      },

      buttonRemove( button, textButton, tdRemoveCar, tr ) {
        button.setAttribute('class', 'btn-remove-car');
        button.appendChild( textButton );
        tdRemoveCar.setAttribute('class', 'td-remove');
        tdRemoveCar.appendChild( button );
        tr.appendChild( tdRemoveCar );
      },

      car() {
        const image = new DOM('[data-js="image"]').get().value;
        const brand = new DOM('[data-js="brand"]').get().value;
        const year = new DOM('[data-js="year"]').get().value;
        const plate = new DOM('[data-js="plate"]').get().value;
        const color = new DOM('[data-js="color"]').get().value;

        return { image, brand, year, plate, color };
      },

      post() {
        const post = new XMLHttpRequest();
        const { image, brand, year, plate, color } = this.car();

        post.open( 'POST', 'http://localhost:3000/car' );
        post.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
        post.send(
          `image=${image}&brandModel=${brand}&year=${year}&plate=${plate}&color=${color}`
        );

        post.onreadystatechange = () => {
          if ( app.isReady() ) {
            return post.responseText;
          }
        }
      },

      get() {
        const get = new XMLHttpRequest();

        get.open( 'GET', 'http://localhost:3000/car' );
        get.send();

        get.onreadystatechange = () => {
          if( app.isReady() ) {
            return JSON.parse( get.responseText );
          }
        }
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

})( window.DOM, document );

console.log('Link do pull request do seu projeto');
