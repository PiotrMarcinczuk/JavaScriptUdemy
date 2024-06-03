window.onload = function(){
    quiz.init();
}

class Quiz{
    questions = [
        {q: 'Ile to jest 10 / 2?', answers: ['4','5','6'], correctAnswerNum: 1},
        {q: 'Ile to jest 16 + 2?', answers: ['5','20','18'], correctAnswerNum: 2}
    ];

    currentQuestionIndex = -1;
    heading = null;
    questionParagraph = null;
    answer0 = null;
    answer1 = null;
    answer2 = null;
    correctAnswerNum = null;

    userSelectedInput = null;
    userCorrectAnswersNum = 0;
    userBadAnswersNum = 0;
    saveAnswerButton = null;
    nextQuestionButton = null;

    modalWindow = null;

    initModal = () => {
        this.modalWindow = new bootstrap.Modal(document.getElementById('modalWindow'));
        const button = document.querySelector('.modal-fotter button');

        button.addEventListener('click', this.restartQuiz);
    }

    init(){
        this.heading = document.querySelector('.alert-heading');
        this.answer0 = document.getElementById('answer0');
        this.answer1 = document.getElementById('answer1');
        this.answer2 = document.getElementById('answer2');

        this.nextQuestionButton = document.getElementById('nextQuestionButton');
        this.saveAnswerButton = document.getElementById('saveAnswerButton');

        this.setNextQuestionData();

        quiz.nextQuestionButton.addEventListener('click', quiz.setNextQuestionData);
        quiz.saveAnswerButton.addEventListener('click', quiz.checkAnswer);

        this.initModal();
    }

    checkAnswer = () => {
        this.userSelectedInput = document.querySelector('input[type="radio"]:checked');
        if(!this.userSelectedInput) return;

        const selectedIndex = this.userSelectedInput.getAttribute('data-index');
        if(selectedIndex == this.correctAnswerNum){
            this.userCorrectAnswersNum++;
            this.userSelectedInput.classList.add('is-valid');
        }else{
            this.userBadAnswersNum++;
            this.userSelectedInput.classList.add('is-invalid');
        }

        this.setUserStats();

        this.saveAnswerButton.classList.add('disabled');
        this.nextQuestionButton.classList.remove('disabled');
    }

    setUserStats = () => {
        document.querySelector('#correctAnswers').innerHTML = this.userCorrectAnswersNum;
        document.querySelector('#badAnswers').innerHTML = this.userBadAnswersNum;
    }

    setNextQuestionData = () => {
        this.currentQuestionIndex++;

        if(this.currentQuestionIndex >= this.questions.length){
            this.showModalResults();
            return;
        }

        const question = this.questions[ this.currentQuestionIndex ];
        const qStr = `Pytanie ${this.currentQuestionIndex+1}
                        z ${this.questions.length}:
        `;

        this.heading.innerHTML = qStr + question.q;
        this.answer0.innerHTML = question.answers[0];
        this.answer1.innerHTML = question.answers[1];
        this.answer2.innerHTML = question.answers[2];
        this.correctAnswerNum = question.correctAnswerNum;

        document.querySelectorAll('input[type="radio"]').forEach( (el) => {
            el.classList.remove('is-valid');
            el.classList.remove('is-invalid');
            el.checked = false;
        });

        this.saveAnswerButton.classList.remove('disabled');
        this.nextQuestionButton.classList.add('disabled');
    }

    showModalResults = () => {
        const modelParagraph = document.querySelector('.modalResults');
        let information = null;

        if(this.userCorrectAnswersNum >= this.userBadAnswersNum){
           information = 'Brawo przynajmniej połowa odpowiedzi jest prawidłowa';
        }else{
            information = 'Niestety mniej niż połowa odpowiedzi jest dobra';
        }

        modelParagraph.innerHTML = information;
        this.modalWindow.toggle();
    }

    restartQuiz = () => {
        this.currentQuestionIndex = -1;
        this.userBadAnswersNum = 0;
        this.userCorrectAnswersNum = 0;

        this.modalWindow.toggle();
        this.setUserStats();
        this.setNextQuestionData();
    }
}

const quiz = new Quiz();
