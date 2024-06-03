class Snake{
    canvas = document.getElementById('canvas');
    context2D = canvas.getContext('2d');
    button = document.getElementById('start-pause')
    pointSection = document.querySelector('#point p');
    snakeLenSection = document.querySelector('#snakeLen p');
    gamePause = true;
    snakeTab = [];
    foodPosition = {};
    snakeLength = 5;
    partSize = 10;
    dx = 0;
    dy = 0;
    pointCount = 0;

    init(){
        document.addEventListener('keydown', this.press.bind(this));
        this.button.addEventListener('click', this.changeButton.bind(this));
        this.makeSnake();
        const snake = this

        setInterval(() => {
            this.clearSnake();
            this.drawSnake();
            this.checkColision();
            this.snakeEats();
            if(!this.gamePause) this.moveSnake();
        }, 100);
    }

    makeSnake(){
        for(let i=0; i<this.snakeLength; i++){
            let x = this.canvas.width/2 + i * this.partSize;
            let y = this.canvas.height/2;
            this.snakeTab.push( {x: x, y: y} );
        }
    }

    drawSnake(){
        this.snakeTab.forEach( el => {
            this.context2D.strokeStyle = 'red';
            this.context2D.lineWidth = 2;
            this.context2D.lineJoin = 'bevel';
            this.context2D.strokeRect(el.x, el.y, this.partSize, this.partSize);
        })
    }

    press(e){
        switch(e.keyCode){
            case 87:
                this.dx = 0;
                this.dy = -10;
                break;
            case 68:
                this.dx = 10;
                this.dy = 0;
                break;
            case 83:
                this.dx = 0
                this.dy = 10;
                break;
            case 65:
                this.dx = -10;
                this.dy = 0;
                break;
        }
    }

    moveSnake(){
        let headX = this.snakeTab[0].x + this.dx;
        let headY = this.snakeTab[0].y + this.dy;
        this.snakeTab.unshift( {x: headX, y: headY} );
        this.snakeTab.pop()
    }

    clearSnake(){
        this.context2D.fillStyle = 'greenyellow';
        this.context2D.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawFood();
    }

    makeFood(){
        let randomX = Math.round((Math.random() * this.canvas.width) / 10) * 10;
        let randomY = Math.round((Math.random() * this.canvas.height) / 10) * 10;
        if(this.gamePause){
            if((Math.abs(randomX - this.snakeTab[0].x) >= 30) 
            && (Math.abs(randomY - this.snakeTab[0].y) >= 30)){
                this.foodPosition = {x: randomX, y: randomY}; 
            }else{
                console.log('es');
            }
        }else{
            this.foodPosition = {x: randomX, y: randomY}; 
        }
        
    }

    drawFood(){
        this.context2D.fillStyle = 'red';
        this.context2D.fillRect(this.foodPosition.x, this.foodPosition.y, this.partSize, this.partSize);
    }

    clearFood(){
        this.foodPosition = {};
    }

    snakeEats(){
        if(this.foodPosition.x == this.snakeTab[0].x 
            && this.foodPosition.y == this.snakeTab[0].y){
                this.snakeLength++;
                this.pointCount++;
                this.makeFood();
                this.completePointsSection();
                this.snakeTab.push( { x: this.foodPosition.x, y: this.foodPosition.y });
        }
    }

    completePointsSection(){
        this.pointSection.innerText = this.pointCount;
        this.snakeLenSection.innerText = this.snakeLength;
    }

    checkColision(){
        if(this.snakeTab[0].x > this.canvas.width || this.snakeTab[0].x < 0){
            this.changeButton();
        }
        if(this.snakeTab[0].y > this.canvas.height || this.snakeTab[0].y < 0){
            this.changeButton();
        }
    }

    resetGame(){
        this.gamePause = true;
        this.snakeTab = [];
        this.snakeLength = 5;
        this.partSize = 10;
        this.dx = 0;
        this.dy = 0;

        this.pointSection.innerText = '';
        this.snakeLenSection.innerText = 5;
        
    }

    changeButton(){
        if(this.gamePause){
            this.makeFood();
            this.dx = -10;
            this.gamePause = false;
            this.button.textContent = 'END';
        }else{
            this.resetGame();
            this.makeSnake();
            this.clearFood();
            this.button.textContent = 'START';
        }
    }
}

const snake = new Snake();
snake.init();
