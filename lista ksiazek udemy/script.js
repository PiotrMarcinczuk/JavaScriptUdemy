window.onload = function(){
    bookList.init();
}

class Book{
    constructor(title, author){
        this.title = title;
        this.author = author;
        this.id = Date.now(); // timestamp
    }
}

class BookList{
    constructor(){
        this.books = [];
    }

    init(){
        document.getElementById('saveButton').addEventListener('click', (e) => this.saveButton(e));
        this.loadDataFromStorage();
    }

    loadDataFromStorage(){
        const data = storage.getItems();
        if(data === null || data === undefined) return;
        this.books = data;

        this.books.forEach( (value) => { // zamiast this.books bylo data
            ui.addBookToTable(value);
        })

    }

    saveButton(e){
        const author = document.getElementById('bookAuthor').value;
        const title = document.getElementById('bookTitle').value; 

        if(author === '' || title === ''){
            console.log('blank data');
            return;
        }

        e.preventDefault();
        const book = new Book(title, author);
        this.addBook(book);
    }

    addBook(book){
        this.books.push(book);
        ui.addBookToTable(book);
        this.saveData();
    }

    saveData(){
        storage.saveItems(this.books);
    }

    removeBookById(bookId){
        this.books.forEach( (el, index) => {
            if(el.id == bookId) this.books.splice(index, 1);
        })
        
        this.saveData();
    }

    moveBookUp(bookId){
        let arr = this.books;
        for(let a=0; a<arr.length; a++){
            let el = arr[a];
            if(el.id == bookId){
                if(a >= 1){
                    let temp = arr[a - 1];
                    arr[a - 1] = arr[a];
                    arr[a] = temp;
                    break;
                }
            }
        }
        this.saveData();
        ui.deleteAllBookRow();
        this.loadDataFromStorage();
    }

    moveBookDown(bookId){
        let arr = this.books;
        for(let a=0; a<arr.length; a++){
            let el = arr[a];
            if(el.id == bookId){
                if(a <= arr.length - 2){
                    let temp = arr[a + 1];
                    arr[a + 1] = arr[a];
                    arr[a] = temp;
                    break;
                }
            }
        }
        this.saveData();
        ui.deleteAllBookRow();
        this.loadDataFromStorage();
    }
}

class Ui{
    addBookToTable(book){
        const tbdoy = document.querySelector('#booksTable tbody');
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <button type="button" data-book-id="${book.id}" 
                    class="btn btn-danger brn-sm delete"> Skasuj 
                </button>
                <button type="button" data-book-id="${book.id}" 
                    class="btn btn-secondary brn-sm up-arrow"> ▲ 
                </button>
                <button type="button" data-book-id="${book.id}" 
                    class="btn btn-secondary brn-sm down-arrow"> ▼ 
                </button>
            </td>

        `

        tbdoy.appendChild(tr);

        let deleteButton = document.querySelector(`button.delete[data-book-id='${book.id}']`);
        deleteButton.addEventListener('click', (e) => this.deleteBook(e))

        let upButton = document.querySelector(`button.up-arrow[data-book-id='${book.id}']`);
        upButton.addEventListener('click', (e) => this.arrowUp(e))

        let downButton = document.querySelector(`button.down-arrow[data-book-id='${book.id}']`);
        downButton.addEventListener('click', (e) => this.arrowDown(e))

        this.clearForm();
    }

    arrowUp(e){
        let bookId = e.target.getAttribute('data-book-id');
        bookList.moveBookUp(bookId);

    }

    arrowDown(e){
        let bookId = e.target.getAttribute('data-book-id');
        bookList.moveBookDown(bookId);
    }

    deleteBook(e){
        const bookId = e.target.getAttribute('data-book-id');
        e.target.parentElement.parentElement.remove();
        bookList.removeBookById(bookId);
    }

    deleteAllBookRow(){
        const tbodyRows = document.querySelectorAll('#booksTable tbody tr');
        tbodyRows.forEach( (el) => {
            el.remove();
        })
    }

    clearForm(){
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
        document.getElementById('bookForm').classList.remove('was-validated');
    }

}

class Storage{
    saveItems(books){
        localStorage.setItem('books', JSON.stringify(books));
    }

    getItems(){
        let booksTemp = null;
        if(localStorage.getItem('books') !== null){
            booksTemp = JSON.parse(localStorage.getItem('books'));
        }else{
            booksTemp = [];
        }
        return booksTemp;
    }
}

const bookList = new BookList();
const ui = new Ui();
const storage = new Storage();

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
  localStorage.clear();