(function( DOM, doc ) {
  'use strict';
  /*
  Agora vamos criar a funcionalidade de "remover" um carro. Adicione uma nova
  coluna na tabela, com um botão de remover.

  Ao clicar nesse botão, a linha da tabela deve ser removida.

  Faça um pull request no seu repositório, na branch `challenge-31`, e cole
  o link do pull request no `console.log` abaixo.

  Faça um pull request, também com a branch `challenge-31`, mas no repositório
  do curso, para colar o link do pull request do seu repo.
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

        this.getCarElements( $tdBrand, $tdYear, $tdPlate, $tdColor);
        this.addCarElements( tr, $tdImage, $tdBrand, $tdYear, $tdPlate, $tdColor );
        this.carImage( $tdImage, $image );
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
        brand.textContent = new DOM('[data-js="car-brand"]').get().value;
        year.textContent = new DOM('[data-js="car-year"]').get().value;
        plate.textContent = new DOM('[data-js="car-plate"]').get().value;
        color.textContent = new DOM('[data-js="car-color"]').get().value;
      },

      addCarElements( tr, image, brand, year, plate, color ) {
        tr.appendChild( image );
        tr.appendChild( brand );
        tr.appendChild( year );
        tr.appendChild( plate );
        tr.appendChild( color );
      },

      carImage( tdImage, image ) {
        image.setAttribute('src', new DOM('[data-js="car-image"]').get().value);
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
