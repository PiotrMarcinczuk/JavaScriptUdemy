class ExchangeRates{
    url = 'https://api.nbp.pl/api/exchangerates/tables/a/last/?format=json'
    table = document.querySelector('.table-1');
   
    init(){
        this.loadData();
    }

    loadData(){
        fetch(this.url).then( response => response.json())
        .then(this.printData);
        
    }

    printData(data){
        data = data[0].rates;
        for(let i=0; i<data.length; i++){
            rates.createElement(data[i].currency, data[i].mid);
        }
    }

    createElement(currency, mid){
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <tr>
                <td>${currency}</td>
                <td>${mid.toFixed(4)} zł</td>
            </tr>
        `
        this.table.appendChild(tr);
    }

}

const rates =  new ExchangeRates();
rates.init();