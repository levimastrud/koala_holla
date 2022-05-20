console.log('js');


$(document).ready(function () {
  console.log('JQ');
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();
  $("#viewKoalas").on("click", ".nuke", deleteKoala);
  $("#viewKoalas").on("click", ".mark", readyToTransfer);

}); // end doc ready

function setupClickListeners() {
  $('#addButton').on('click', saveKoala);
}

function getKoalas() {
  console.log('in getKoalas');
  // ajax call to server to get koalas
  $.ajax({
    method: 'GET',
    url: '/koalas'
  }).then(function (response) {
    $('#viewKoalas').empty()
    let koala = response;
    console.log(koala);
    for (let i = 0; i < koala.length; i++) {
      $('#viewKoalas').append(`
        <tr>
          <td>${koala[i].name}</td>
          <td>${koala[i].age}</td>
          <td>${koala[i].gender}</td>
          <td>${koala[i].ready_to_transfer ? 'Yes' : 'No'}</td>
          <td>${koala[i].notes}</td>
          <td><button class ="nuke" data-koalaid=${koala[i].id}>Delete</button></td>
          <td><button class ="mark" data-koalaid=${koala[i].id}>Ready to transfer</button></td>
        </tr>
      `)
    }
  }).catch(error => {
    console.log('ERROR INSERTING KOALA', error);
  })
} // end getKoalas


// let koalaToSend = {
//   name: $('#nameIn').val(),
//   age: $('#ageIn').val(),
//   gender: $('#genderIn').val(),
//   ready_to_transfer: $('#readyForTransferIn').val(),
//   notes: $('#notesIn').val(),
// };

function saveKoala() {
  
  console.log('in saveKoala');
  // ajax call to server to get koalas
  let readyLowercase = $('#readyForTransferIn').val().toLowerCase()
  if (readyLowercase !== 'true' && readyLowercase !== 'false') {
    alert('Please enter true or false for "Ready for transfer"')
    return
  };
  $.ajax({
    method: 'POST',
    url: '/koalas',
    data:{  
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      ready_to_transfer: readyLowercase,
      notes: $('#notesIn').val(),
  }

  }).then(() => {
    $('#nameIn').val('');
    $('#ageIn').val('');
    $('#genderIn').val('');
    $('#readyForTransferIn').val('');
    $('#notesIn').val('');
    getKoalas();

  }).catch(error => {
    console.log('ERROR doind a POST of koalas', error);
  })
}


function deleteKoala(event) {
  // grab the current id of the button we clicked on
  const koalaId = $(event.target).data("koalaid");
  console.log(`deleting song with id of`, koalaId);

  // ajax DELETE request to /songs/:id
  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koalaId}`
  }).then(response => {
    // update the DOM by calling getSongs();
    getKoalas();
    swal({
      icon: 'success',
      title: 'Thanks for Saving one koala',
      text: response
    });
  }).catch(err => {
    console.log(`Error deleteting koalas: `, err);
  })
}

// Marking Koala as ready to transfer with PUT

function readyToTransfer(event) {
  let koalaid = $(event.target).data("koalaid")
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koalaid}`
  }).then(response => {
    getKoalas()
  }).catch(error => {
    console.log('error transfering koala', error)
  })
}