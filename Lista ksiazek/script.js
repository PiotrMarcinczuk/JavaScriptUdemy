window.onload = () => {
    bookList.init();
};

class BookList{
    constructor(){
        this.list = [];
        this.author = document.getElementById('author'); // nie moze byc .value bo byloby to jednorazowe przypisanie
        this.bookId = document.getElementById('bookId');
    }   

    init(){
        const button = document.querySelector('button');
        button.addEventListener('click', (e) => {
            this.buttonClick(e);
        })
        this.loadDataFromStorage()
    }

    buttonClear(){
        this.author.value = '';
        this.bookId.value = '';
    }

    buttonClick(e){
        e.preventDefault();

        if(this.author.value && this.bookId.value){
            const book = new Book(this.author.value, this.bookId.value);
            bookList.addBook(book);
            this.buttonClear();
        }
    }

    addBook(book){ 
        storageTemp.setItems(book); // tu musi byc book bo linie nizej pobieramy wartosc ze storage
        const item = bookList.loadData();
        bookList.addToList(item);     
    }
    
    addElement(book){
        const main = document.querySelector('main');
        let elementDiv = document.createElement('div');
        let elementTable = document.querySelector('table');

        let tr = document.createElement('tr');
        const buttonRemove = document.createElement('button');
        const buttonUp = document.createElement('button');
        buttonRemove.innerText = 'Remove';
        buttonUp.innerText = 'Up';

        main.appendChild(elementTable);
        elementTable.appendChild(tr);

        tr.innerHTML = `
            <td>${book.name}</td>
            <td>${book.id}</td>
            <td></td>
            <td></td>
        `;
        const tdElements = tr.querySelectorAll('td');
        tdElements[2].appendChild(buttonUp);
        tdElements[3].appendChild(buttonRemove);

        buttonRemove.addEventListener('click', () => { // usuwanie pr zyciskiem remove
            //usuwamy tez z localStorage
            const t = storageTemp.getItems();
            for(let [key, value] of t.entries()){
                if(value.name === book.name){
                    tr.remove(); // elementTable.remove(tr) to nie dziala nie wiem czemu
                    this.list.splice(key,1);
                }
            }
            this.saveData();
        });

        buttonUp.addEventListener('click', () => {
            const t = storageTemp.getItems();
            for(let [key, value] of this.list.entries()){
                if(value.listId === book.listId){
                    if(key >= 1){
                        let tempNumber = book.listId;
                        book.listId = book.listId-1; 
                        book.listId = tempNumber;

                        let temp = this.list[key-1];               
                        this.list[key-1] = this.list[key];
                        this.list[key] = temp;
                    }
                }   
            }
            this.saveData();
            this.deleteAll();
            this.loadDataFromStorage();
        })
    }

    addToList(book){
        if(this.list.length === 0){
            this.list.push(book)
            this.addElement(book);
        }
        const isDuplicate = this.list.some((existingBook) => {
            return existingBook.name === book.name && existingBook.id === book.id;
        });

        if(!isDuplicate){
            this.list.push(book);
            this.addElement(book);
        } 
        this.saveData();
    }

    loadData(){
        const data = storageTemp.getItems();
        return data;
    }

    loadDataFromStorage(){
        const data = storageTemp.getItems();
        if(data === null || data === undefined) return;
        this.list = data;
        data.forEach((value, index) => {
            bookList.addElement(value);
        })
    }

    saveData(){
        storageTemp.setItems(this.list);
    }

    deleteAll(){
        const tableRows = document.querySelectorAll('table tr:not(#names)');
        tableRows.forEach( (el) => {
            el.remove();
        })
    }
}
const bookList = new BookList();

class Book{
    constructor(name, id){
        this.name = name;
        this.id = id;
        this.listId = Book.getNextId();
    }    

    static listId = 0;
    static getNextId(){
        const id = Book.listId;
        Book.listId++;
        return id;
    }
}

class Storage{
    setItems(book){
        localStorage.setItem('books', JSON.stringify(book));
    }

    getItems(){ // w momencie wczytywanie na poczatku z LocalStorage zmienna booksTemp zawiera cala liste ksiazek
        // a jesli chcemy dodac nowa ksiazke po kliknieciu to zmienna zawiera najnowsza ksiazke
        let booksTemp = null;
        if(localStorage.getItem('books') !== null){
            booksTemp = JSON.parse(localStorage.getItem('books')); 
        }else{
            booksTemp = [];
        }
        return booksTemp;          
    }
}
const storageTemp = new Storage();
