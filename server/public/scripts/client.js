console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: 'testName',
      age: 'testName',
      gender: 'testName',
      readyForTransfer: 'testName',
      notes: 'testName',
    };
    // call saveKoala with the new obejct
    saveKoala( koalaToSend );
  }); 
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then(function(response){
    let koala = response;
    console.log(koala);
    for(let i=0; i<koala.length; i++){
      $('#viewKoalas').append(`
        <tr>
          <td>${koala[i].names}</td>
          <td>${koala[i].age}</td>
          <td>${koala[i].gender}</td>
          <td>${koala[i].ready_to_transer}</td>
          <td>${koala[i].notes}</td>
        </tr>
      `)}
  }).catch(error =>{
    console.log('ERROR INSERTING KOALA', error);
  })
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
 
}
