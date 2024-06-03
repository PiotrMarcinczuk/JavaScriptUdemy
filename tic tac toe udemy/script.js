window.onload = function(){
    app.init();
}

class App{
    currentPlayer = 'X';
    winningWariants = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    init(){
        document.querySelectorAll('.cell').forEach(
            cell => cell.addEventListener('click', this.cellClick)
        );

        document.getElementById('restart-game').addEventListener('click', () => {
            this.restartGame();
        })
    }

    initGame(){
        this.currentPlayer = 'X'
        document.querySelectorAll('.cell').forEach(
            el => { el.innerHTML = '' }
        )
    }

    cellClick = (e) => {
        this.playerTurn(e.target)
    }

    playerTurn(el){
        if(el.innerHTML == 'X' || el.innerHTML == 'O') return;
        el.innerHTML = this.currentPlayer;
        this.currentPlayer = this.currentPlayer == 'X' ? 'O' : 'X';
        this.checkWinner();
    }

    checkWinner(){
        for(let i=0; i<this.winningWariants.length; i++){
            const variant = this.winningWariants[i];
            const a = this.getCellValue(variant[0]);
            const b = this.getCellValue(variant[1]);
            const c = this.getCellValue(variant[2]);

            if(a == '' || b == '' || c == '') continue;
            if(a == b && b == c){
                console.log(a);
                this.setWinner('Wygrał: ' + a);
            } 
        }

    }

    getCellValue(index){
        return document.querySelector(`.cell[data-index='${index}']`).innerHTML;
    }

    setWinner(str){
        document.getElementById('winner').innerHTML = str;
    }

    restartGame(){
        this.initGame();
    }
}

const app = new App();