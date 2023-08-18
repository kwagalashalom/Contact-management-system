// listen for button click and make use of user input to add new contact
addContactButton.addEventListener('click', function () {
  // prevent modal showing up when no user input and make sure input is valid
  if (userPhone !== '' && userPhone.length === 10) {
    OpenModal();
    modalTitle.textContent = 'Add New Contact';
    let newHtml = `<form class='modal-form'><label for='name-input'>Provide Name For Contact: ${userPhone}</label><input type="text" name="name-input" class="name-input" id="nameInput" placeholder="type contact name here..."></form>`;
    modalBody.innerHTML = newHtml;
  } else {
    alert('Please Provide A Valid Phone Number!');
  }
});

let userName = '';

// query modal body to get name input element,
let nameInput = modalBody.querySelector('.name-input');
nameInput.addEventListener('change', function (event) {
  userName = event.target.value;
});
// create new contact on click of submit button, again if name is provided!
modalSubmit.addEventListener('click', function () {
  if (typeof userName !== 'number' && userName.length !== 0) {
    // create contact
    // console.log(userPhone, userName);
    addNewContact(userName, userPhone);
    // close modal and after refreshing contacts
    CloseModal();
  } else {
    alert('Invalid Contact Name!');
  }
});
