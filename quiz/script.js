const title = document.querySelector('main h1')

const a1 = document.querySelector('label[for="answer1"]')
const a2 = document.querySelector('label[for="answer2"]')
const a3 = document.querySelector('label[for="answer3"]')

const button = document.getElementById('next-button');
const endButton = document.getElementById('end-button');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const labels = document.querySelectorAll('label');

class Quiz{
    constructor(){
        const answers = new Answers();
        this.questionList = [
            {question: 'Ile kg waży Sznyc?', answer1: 55, answer2: answers.answer1, answer3: 100, correctAnswer: answers.answer1},
            {question: 'Jak nazywa się Sznyc?', answer1: answers.answer2, answer2: 'Karol', answer3: 'Bożydar', correctAnswer: answers.answer2},
            {question: 'Jak na imię miał Jan Paweł II?', answer1: 'Magdalena', answer2: 'Jan', answer3: answers.answer3, correctAnswer: answers.answer3},
            {question: 'W którym roku Sułtan Mehmed II zdobył Konstantynopol?', answer1: answers.answer4, answer2: 1455, answer3: 'Żadne z podanych', correctAnswer: answers.answer4},
            {question: 'Ile lat średnio żyje samica rekina białego?', answer1: answers.answer5, answer2: '40 - 55', answer3: '100 - 120', correctAnswer: answers.answer5}
        ]
        this.labelName = null;
        this.questionNumber = 0;
        this.score = 0;
    }

    getHtmlElements(){
        let questionTemp = this.getQuestion();
        if(questionTemp){
            title.innerHTML = questionTemp.question;
            a1.innerHTML = questionTemp.answer1;
            a2.innerHTML = questionTemp.answer2;
            a3.innerHTML = questionTemp.answer3;
        }  
    }

    getQuestion(){  
        if(title.innerHTML) this.questionNumber += 1;
        if(this.questionList.length <= this.questionNumber){
            endButton.style.display = 'flex';
            button.style.display = 'none';
            return;
        }
        const question = this.questionList[this.questionNumber];
        
        return question;
    }

    nextQuestion(){
        quiz.getHtmlElements();
        quiz.clearCheckbox();
    }

    clearCheckbox(){
        checkboxes.forEach( (el) => {
            el.checked = false;
            el.disabled = false;
        })
    }

    leaveOneAnswer(el){ // el to event
        checkboxes.forEach( (e) => {
            if(e !== el.target){
                e.checked = false;
            }
        })
    }

    checkAnswer(){
        let index = quiz.questionNumber - 1; // odejmujemy 2 poniewaz chcemy aby sprawdzalo od poczatku quizu
        if(quiz.labelName == quiz.questionList[index].correctAnswer){
            console.log(1);
            quiz.score += 1;
        }else{
            console.log(quiz.questionList[index].correctAnswer);
            console.log(quiz.labelName);
        }
    }

    showResult(){
        title.innerHTML = `Uzyskałeś ${this.score} / ${this.questionNumber}`
        quiz.clearTest();
        quiz.endingMessage();
    }

    clearTest(){
        a1.style.display = 'none';
        a2.style.display = 'none';
        a3.style.display = 'none';
        checkboxes.forEach( (el) => {
            el.style.display = 'none';
        })

        button.style.display = 'none';
        endButton.style.display = 'none';

        a1.innerHTML = '';
        a2.innerHTML = '';
        a3.innerHTML = '';
    }

    endingMessage(){
        const p = document.getElementById('message');
        let max = this.questionList.length;
        if(this.score >= max * 0.85){
            p.innerHTML = 'Świetnie Ci poszło!';
        }else if(this.score >= max * 0.50){
            p.innerHTML = 'Niezły wynik';
        }else if(this.score < max * 0.50){
            p.innerHTML = 'Następnym razem będzie lepiej';
        }
        
    }
}

class Answers{
    constructor(){
        this.answer1 = 88;
        this.answer2 = 'Wojtek';
        this.answer3 = 'Karol';
        this.answer4 = 1453;
        this.answer5 = '70 - 100';
    }
}

quiz = new Quiz();

quiz.getHtmlElements();

checkboxes.forEach( el => { 
    el.addEventListener('click', () => {
        if(el.checked){
            const label = document.querySelector(`label[for="${el.id}"]`);
            quiz.labelName = label.innerText;
        }
    })

    el.addEventListener('change', quiz.leaveOneAnswer);
})

button.addEventListener('click', quiz.nextQuestion);
button.addEventListener('click', quiz.checkAnswer);







