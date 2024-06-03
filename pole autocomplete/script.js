window.onload = () => {
    instance.init();
    instance.input.addEventListener('input', (e) => {
        instance.value = e.target.value;
        instance.removeElements()
        instance.connect();
        
    })
}

class List{
    init(){
        this.input = document.getElementById('search');
        this.button = document.getElementById('search-button');
        this.liList = [];
        this.value = null;
    }

    connect(){
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.value}&apikey=D83PCD5HRM9R5PNO`)
        .then(response => response.json())
        .then( this.addHtmlElement )
    }

    addHtmlElement(data){
        if(!data.bestMatches) return;

        const list = data.bestMatches;
        list.forEach( (el) => {
            instance.createElement(el['1. symbol'] + ' ' + el['2. name']);
        })
    }

    createElement(data){
        const ul = document.querySelector('ul');
        let li = document.createElement('li');
        
        li.innerHTML = data;
        this.liList.push(li);

        ul.appendChild(li);
    }

    removeElements(){
        const ul = document.querySelectorAll('ul');
        this.liList.forEach( (el) => {
            el.remove();
        })
    }
}

const instance = new List();

