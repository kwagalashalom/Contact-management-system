// search input
const phoneInput = document.querySelector('#phoneInput');
// add contact
const addContactButton = document.querySelector('#addButton');
// search button
const searchContactButton = document.querySelector('#searchButton');
// bottom section
const contactsContainer = document.querySelector('.bottom-section');
// edit button
// delete button

// Get Modal Stuff
const modal = document.querySelector('.modal');
const modalTitle = modal.querySelector('.modal-title');
const modalBody = modal.querySelector('.modal-body');
const modalClose = modal.querySelector('.modal-close-button');
const modalSubmit = modal.querySelector('.modal-submit-button');

// define modal functions
function OpenModal() {
  modal.style.display = 'grid'; // the display you used in css when designing the modal
}

function CloseModal() {
  modal.style.display = 'none';
}

// listen to events on modal buttons
modalClose.addEventListener('click', function () {
  CloseModal();
});

// contacts store
let contactsArray = [
  {
    name: 'Kizz',
    phone: '0704353301',
  },
  {
    name: 'Kellen',
    phone: '0754599523',
  },
  {
    name: 'Shalom',
    phone: '0759436776',
  },
];

// temporarily make the contacts array empty
// contactsArray = [];

// function to display the contacts in html
function displayContacts() {
  if (contactsArray.length === 0) {
    contactsContainer.innerHTML =
      '<h3 class="alert">No Contacts, Please Add Contact!</h3>';
  } else {
    contactsContainer.innerHTML = '';
    contactsArray.forEach(function (contact) {
      let newContactElement = document.createElement('div');
      newContactElement.innerHTML = `<div class="contact-row">
          <div class="user-info">
            <h3 id="userName" class="username">${contact.name}</h3>
            <h3 id="phoneNumber" class="phone-number">${contact.phone}</h3>
          </div>
          <div class="buttons-group">
            <button id="callButton" class="call-button contact-buttons buttons">Call</button>
            <button id="editButton" class="edit-button contact-buttons buttons">Edit</button>
            <button id="deleteButton" onclick="deleteContact('${contact.phone}')" class="delete-button contact-buttons buttons">Delete</button>
          </div>
        </div>`;
      contactsContainer.appendChild(newContactElement);
    });
  }
}

// ADD NEW CONTACT
// get user input by listening to change event on phoneInput element
let userPhone = '';
phoneInput.addEventListener('change', function (event) {
  userPhone = event.target.value;
});

// listen for button click and make use of user input to add new contact
addContactButton.addEventListener('click', function () {
  // prevent modal showing up when no user input and make sure input is valid
  if (userPhone !== '' && userPhone.length === 10) {
    OpenModal();
    modalTitle.textContent = 'Add New Contact';
    let newHtml = `<form class='modal-form'><label for='name-input'>Provide Name For Contact: ${userPhone}</label><input type="text" name="name-input" class="name-input" id="nameInput" placeholder="type contact name here..."></form>`;
    modalBody.innerHTML = newHtml;

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
  } else {
    alert('Please Provide A Valid Phone Number!');
  }
});

// function that adds a new contact to the contacts array, but prevents creating duplicate contacts
function addNewContact(username, phone) {
  console.log(username, phone);
  // check if no same phone number already in contacts
  // let allContactNumbers = contactsArray.map(function (contact) {
  //   return contact.phone;
  // });
  // if (allContactNumbers.includes(phone)) {
  //   alert('Phone Number Already Exists!');
  // } else {
  //   let newContact = {
  //     name: username,
  //     phone: phone,
  //   };
  //   // update contacts with new contact
  //   contactsArray.push(newContact);
  //   // refresh contacts
  //   displayContacts();
  // }
}

// function that deletes a contact based on phone numer
// Note: delete now works, it was not working because the phone number was being passed in a parameter not a string in html resuting into wrong results
// adding quotes like: onclick="deleteContact('${contact.phone}') fixed the issue
function deleteContact(phoneNumber) {
  let newContacts = contactsArray.filter(function (contact) {
    return contact.phone !== phoneNumber;
  });
  // update contacts
  contactsArray = newContacts;
  displayContacts();
}

// load contacts on page load
displayContacts();
