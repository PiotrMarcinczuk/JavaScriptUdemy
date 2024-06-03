window.onload = function(){
    calculator.init();
    calculator.printData();
}

let calculator = {
    buttons: undefined,
    output: undefined,

    init: function(){
        this.buttons = document.querySelectorAll('button');
        this.output = document.querySelector('input');
        console.log(this.buttons);
        console.log(this.output);
    },

    printData: function(){
        for(let i=0; i<this.buttons.length; i++){
            this.buttons[i].addEventListener('click', function(){
                switch(this.innerHTML){
                    case '=':
                        calculator.mathOperations();
                    break;
                    case 'C':
                        calculator.clearOutput();
                    break
                    case '9':
                    case '8':
                    case '7':
                    case '6':
                    case '5':
                    case '4':
                    case '3':
                    case '2':
                    case '1':
                    case '0':
                    case '00':
                    case '.':
                    case '+':
                    case '-':
                    case '/':
                    case '*': 
                        calculator.output.value += this.innerHTML;
                    break;   
                }  
            })
        }
    },

    clearOutput: function(){
        let clearButton = document.getElementById('clear');
        this.output.value = '';
    },

    mathOperations: function(){
        let result = math.evaluate(this.output.value);
        this.output.value = result;
    }

    
}