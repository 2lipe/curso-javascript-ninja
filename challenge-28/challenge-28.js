(function( DOM ) {
  'use strict';
  /*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."

  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
  */
function app() {

  const ajax = new XMLHttpRequest();
  const $formCep = new DOM( '[data-js="form-search"]' );
  const $inputCep = new DOM( '[data-js="getInput"]' );
  var $status = new DOM( '[data-js="status"]' );
  let $cep = new DOM( '[data-js="cep"]' );
  let $logradouro = new DOM( '[data-js="logradouro"]' );
  let $bairro = new DOM( '[data-js="bairro"]' );
  let $cidade = new DOM( '[data-js="cidade"]' );
  let $estado = new DOM( '[data-js="estado"]' );

  $formCep.on( 'submit', getAddres, false );

  function getAddres( e ) {
    e.preventDefault();
    var url = getUrl();

    ajax.open( 'GET', url );
    ajax.send();
    getMessage('loading');
    ajax.addEventListener( 'readystatechange', handleReadyStateChange, false );
  }

  function getUrl() {
    return replaceCep( 'https://viacep.com.br/ws/[CEP]/json/' );
  }

  function handleReadyStateChange() {
    if ( isRequestOk() ) {
      fillCepFields();
      getMessage('ok');
    }
  }

  function isRequestOk() {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  function fillCepFields() {
    var data = parseData();
    if ( !data ) {
      getMessage('error');
      data = clearData();
    }

    $cep.get()[0].value = data.cep;
    $logradouro.get()[0].value = data.logradouro;
    $bairro.get()[0].value = data.bairro;
    $cidade.get()[0].value = data.localidade;
    $estado.get()[0].value = data.uf;
  }

  function clearData() {
   return {
      cep : '-',
      logradouro : '-',
      bairro : '-',
      localidade : '-',
      uf : '-'
   }
  }

  function parseData() {
    var result;

    try {
      result = JSON.parse( ajax.responseText );
    } catch ( err ) {
      result = null;
    }
    return result;
  }

  function getMessage( type ) {
    let messages = {
      loading : replaceCep( 'Buscando informações para o CEP [CEP]' ),
      ok : replaceCep( 'Endereço referente ao CEP [CEP]' ),
      error : replaceCep( 'Não encontramos o endereço para o CEP [CEP]' ),
    };
    $status.get()[0].value = messages[type];
  }

  function clearCep() {
    return $inputCep.get()[0].value.replace( /\D/g, '' );
  }

  function replaceCep( message ) {
    return message.replace( '[CEP]', clearCep() );
  }

  return {
    getMessage : getMessage,
    replaceCep : replaceCep
  }

}

window.app = app();
app();

})( window.DOM );
