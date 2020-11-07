myLibrary = []
const bookcase = document.getElementById('bookcase-books');
const addBookBtn = document.getElementById('add-book');
const submitBtn = document.getElementById('submitBtn');
const cancelFormBtn = document.getElementById('cancelBtn');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book, id) {
    const newDiv = document.createElement('div');
    newDiv.setAttribute("id", id);
    newDiv.setAttribute("class", "book");
    newDiv.className += " book" + id;

    const deleteBook = document.createElement('button');
    deleteBook.innerHTML = "<i class='fa fa-trash' aria-hidden='true'></i>";
    deleteBook.setAttribute("class", "deleteBookBtn");
    deleteBook.addEventListener("click", removeBook);

    const bookTitle = document.createElement('p');
    bookTitle.innerText = book.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = book.author;

    const bookLength = document.createElement('p');
    bookLength.innerText = book.pages;

    const isRead = document.createElement('button');
    isRead.setAttribute("class", 'isReadBtn');
    isRead.innerHTML = "<i class='fa fa-book-reader'></i>"
    isRead.addEventListener("click", changeRead);
    setReadStatus(newDiv, isRead, id);

    bookcase.appendChild(newDiv);
    newDiv.appendChild(bookTitle);
    newDiv.appendChild(bookAuthor);
    newDiv.appendChild(bookLength);
    newDiv.append(isRead);
    newDiv.appendChild(deleteBook);

}

function promptCreateBook() {
    title = document.getElementById('bookTitle').value;
    author = document.getElementById('bookAuthor').value;
    pages = document.getElementById('bookLength').value;
    read = document.querySelector('input[name=read]:checked').value;
    if (read === 'true') {
        read = true;
    }
    else {
        read = false;
    }
    newBook = new Book(title, author, pages, read);
    let id = myLibrary.push(newBook) - 1;
    addBookToLibrary(newBook, id);

    resetForm();
    document.getElementById("popUp").style.display="none";

}

function drawLibrary() {
    reset();
    for (let i = 0; i < myLibrary.length; i++) {
        addBookToLibrary(myLibrary[i], i);
    }
}

function reset() {
    bookcase.innerHTML = '';
}

function removeBook(e) {
    myParent = e.target.parentElement;
    grandParent = myParent.parentElement;
    myId = grandParent.id;
    myLibrary.splice(myId, 1);
    drawLibrary();
}

function changeRead (e) {
    myParent = e.target.parentElement;
    grandParent = myParent.parentElement
    myId = grandParent.id;
    myLibrary[myId].read = !myLibrary[myId].read;

    newDiv = bookcase.querySelector(".book" + myId);
    isRead = newDiv.querySelector(".isReadBtn");
    setReadStatus(newDiv, isRead, myId);
}

function openForm() {
    document.getElementById("popUp").style.display="block";
}

function resetForm() {
    document.getElementById('bookTitle').value = "";
    document.getElementById('bookAuthor').value = "";
    document.getElementById('bookLength').value = "";
}

function cancelForm() {
    document.getElementById("popUp").style.display="none";
}

function setReadStatus(newDiv, isRead, id) {
    if (myLibrary[id].read === true) {
        newDiv.className += " isRead";
        isRead.className += " readStyle";
        
    }
    else {
        newDiv.classList.remove("isRead");
        isRead.classList.remove("readStyle");
    }
}

addBookBtn.addEventListener("click", openForm);
submitBtn.addEventListener("click", promptCreateBook);
cancelFormBtn.addEventListener("click", cancelForm);
