window.onload = () => {
    game.init();
}

class Game{
    init(){
        this.player ='X';
        this.winConfig = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        this.cells = document.querySelectorAll('.cell');
        this.header = document.querySelector('h1');
        
        this.cell();

        document.querySelector('main button').addEventListener('click', () => {
            this.restartGame();
        })
    }

    cell(){
        this.cells.forEach( (el) => {
            el.addEventListener('click', (e) => {
                this.insertSign(e.target);
            })
        })
    }

    insertSign(element){
        if(this.header.innerHTML.includes('Wygrał')) return;
        if(element.innerText != '') return;

        if(this.player == 'X'){
            element.innerText = 'X';
            this.changePlayer();
        }else{
            element.innerText = 'O';
            this.changePlayer();
        }
    }

    changePlayer(){
        this.checkWin();
        this.player = this.player == 'X' ? this.player = 'O' : this.player = 'X';
    }

    checkWin(){
        this.winConfig.forEach( (config) => {
            const[a,b,c] = config; //destruk

            const cellA = this.cells[a];
            const cellB = this.cells[b];
            const cellC = this.cells[c];

            if(cellA.innerText === cellB.innerText && cellB.innerText === cellC.innerText && cellA.innerText !== ''){
                this.header.innerHTML = 'Wygrał ' + this.player;
            }
        })
    }

    restartGame(){
        this.header.innerHTML = 'Kółko i krzyżyk';
        this.cells.forEach( (el) => {
            el.innerHTML = '';
        })
        this.init();
    }
}

const game = new Game()