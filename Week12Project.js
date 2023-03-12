const readList = [];
const addReadModal = new bootstrap.Modal(document.querySelector('#addReadModal'));
const tableBody = document.querySelector('table tbody');
const noDataRow = document.querySelector('#noDataRow');

// show modal when "Add New Read" is clicked
document.querySelector('#addNewReadButton').addEventListener('click', () => {
  addReadModal.show();
});

// close modal 
document.querySelector('#closeModalButton').addEventListener('click', () => {
  addReadModal.hide();
});

// get references to the form and the modal
const form = document.querySelector('form');
const modal = document.querySelector('#addReadModal');

// get references to the input fields
const bookTitleInput = document.querySelector('#bookTitle');
const bookAuthorInput = document.querySelector('#bookAuthor');
const dateAddedInput = document.querySelector('#dateAdded');
const notesInput = document.querySelector('#notes');

// get a reference to the "Add Book" button
const addBookButton = document.querySelector('#addBookButton');

// add event listener to the "Add Book" button click event
addBookButton.addEventListener('click', () => {
  // get the values from the input fields
  const bookTitle = bookTitleInput.value;
  const bookAuthor = bookAuthorInput.value;
  const dateAdded = dateAddedInput.value;
  const notes = notesInput.value;

  // create a new row for table
  const row = document.createElement('tr');

  // create cells for row
  const bookTitleCell = document.createElement('td');
  const bookAuthorCell = document.createElement('td');
  const dateAddedCell = document.createElement('td');
  const notesCell = document.createElement('td');
  const editButtonCell = document.createElement('td');
  const deleteButtonCell = document.createElement('td');

  // set text for the cells
  bookTitleCell.textContent = bookTitle;
  bookAuthorCell.textContent = bookAuthor;
  dateAddedCell.textContent = dateAdded;
  notesCell.textContent = notes;
  editButtonCell.innerHTML = '<button type="button" class="btn btn-primary edit-button">Edit</button>';
  deleteButtonCell.innerHTML = '<button type="button" class="btn btn-danger delete-button">Delete</button>';

  // append the cells to the row
  row.appendChild(bookTitleCell);
  row.appendChild(bookAuthorCell);
  row.appendChild(dateAddedCell);
  row.appendChild(notesCell);
  row.appendChild(editButtonCell);
  row.appendChild(deleteButtonCell);

  // append the row to the table

  tableBody.appendChild(row);
    // add the new entry to the readList array
    const newEntry = {
        bookTitle: bookTitle,
        bookAuthor: bookAuthor,
        dateAdded: dateAdded,
        notes: notes
      };
      readList.push(newEntry);

  // send a POST request to the server to add the new entry
  $.ajax({
    url: '/api/readList',
    type: 'POST',
    data: newEntry,
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.error(error);
    }
  });

  const editButton = editButtonCell.querySelector('.edit-button');
  editButton.addEventListener('click', () => {
    // fill form with the row data
    bookTitleInput.value = bookTitleCell.textContent;
    bookAuthorInput.value = bookAuthorCell.textContent;
    dateAddedInput.value = dateAddedCell.textContent;
    notesInput.value = notesCell.textContent;

    // show the modal
    addReadModal.show();

    // add event listener to the "Save Changes" button click 
    const saveChangesButton = document.querySelector('#saveChangesButton');
    saveChangesButton.addEventListener('click', () => {
      // update the row data with the new values from the form
      bookTitleCell.textContent = bookTitleInput.value;
      bookAuthorCell.textContent = bookAuthorInput.value;
      dateAddedCell.textContent = dateAddedInput.value;
      notesCell.textContent = notesInput.value;
  // create a new row for the table
  const newRow = document.createElement('tr');

  // create the cells for the row
  const newBookTitleCell = document.createElement('td');
  const newBookAuthorCell = document.createElement('td');
  const newDateAddedCell = document.createElement('td');
  const newNotesCell = document.createElement('td');
  const newEditButtonCell = document.createElement('td');
  const newDeleteButtonCell = document.createElement('td');

  // set the text content for the cells
  newBookTitleCell.textContent = bookTitleInput.value;
  newBookAuthorCell.textContent = bookAuthorInput.value;
  newDateAddedCell.textContent = dateAddedInput.value;
  newNotesCell.textContent = notesInput.value;
  newEditButtonCell.innerHTML = '<button type="button" class="btn btn-primary edit-button">Edit</button>';
  newDeleteButtonCell.innerHTML = '<button type="button" class="btn btn-danger delete-button">Delete</button>';

  // append the cells to the row
  newRow.appendChild(newBookTitleCell);
  newRow.appendChild(newBookAuthorCell);
  newRow.appendChild(newDateAddedCell);
  newRow.appendChild(newNotesCell);
  newRow.appendChild(newEditButtonCell);
  newRow.appendChild(newDeleteButtonCell);

  // replace the old row with the new row
  tableBody.replaceChild(newRow, row);

      // update the entry in the readList array
      const updatedEntry = {
        bookTitle: bookTitleInput.value,
        bookAuthor: bookAuthorInput.value,
        dateAdded: dateAddedInput.value,
        notes: notesInput.value
      };
      const index = readList.findIndex(entry => entry.bookTitle === bookTitle && entry.bookAuthor === bookAuthor && entry.dateAdded === dateAdded && entry.notes === notes);
      readList[index] = updatedEntry;

      $.ajax({
        url: '/api/readList/' + index,
        type: 'PUT',
        data: updatedEntry,
        success: function (data) {
          console.log(data);
        },
        error: function (error) {
          console.error(error);
        }
      });
    
      // hide the modal
      addReadModal.hide();
      // reset the form
form.reset();
    });
  });

  // add event listener to the delete button click 
const deleteButton = deleteButtonCell.querySelector('.delete-button');
deleteButton.addEventListener('click', () => {
  row.remove();
});
    // remove the entry from the readList array
    const index = readList.findIndex(entry => entry.bookTitle === bookTitle && entry.bookAuthor === bookAuthor && entry.dateAdded === dateAdded && entry.notes === notes);
    readList.splice(index, 1);
    $.ajax({
        url: '/api/readList/' + index,
        type: 'DELETE',
        success: function (data) {
          console.log(data);
        },
        error: function (error) {
          console.error(error);
        }
      });

  if (!tableBody.hasChildNodes()) {
    noDataRow.style.display = 'none';
  }
  form.reset();
  addReadModal.hide();
});

modal.addEventListener('show.bs.modal', () => {
  bookTitleInput.focus();
});

