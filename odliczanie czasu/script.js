const button = document.getElementById('countdown-button');
const dateTimeButton = document.getElementById('timer');
let finalTime = null;
let timerId = null;

button.addEventListener('click', init)
dateTimeButton.addEventListener('input', enableButton);

function enableButton(){
    button.disabled = false;
}

loadFromStorage();

function init(){
    finalTime = document.getElementById('timer').value;
    if(finalTime == '') return;
    finalTime = new Date(finalTime);

    timer();
    timerId = setInterval(timer, 1000);
}

function timer(){
    const current = new Date().getTime();
    let result = null;
    if(localStorage.getItem('finalTime') !== null){
        let temp = JSON.parse(localStorage.getItem('finalTime'));
        let finalTemp = new Date(temp);
        saveStorage(finalTemp, current);
        loadFromStorage();
    }else{
        result = finalTime - current;
        math(result);
        saveStorage(finalTime, current);
    }
}

function math(result){
    result = Math.floor(result / 1000)

    const pDays = document.getElementById('days');
    let days = Math.floor(result / ((60 * 60) * 24));
    pDays.innerHTML = days;

    const pHours = document.getElementById('hours');
    let hours = Math.floor(result % ((60 * 60) * 24) / (60 * 60));
   pHours.innerHTML = hours;

   const pMinutes = document.getElementById('minutes');
    let minutes = Math.floor((result % (60 * 60)) / 60);
    pMinutes.innerHTML = minutes;

    const pSeconds = document.getElementById('seconds');
    let seconds = Math.floor(result % 60);
    pSeconds.innerHTML = seconds;

    if(result <= 0){
        clearInterval(timerId);
        let div = document.getElementById('messege');
        div.style.display = 'block';
    } 
}

function saveStorage(finalTime, currentTime){
    if(finalTime !== 'null'){
        localStorage.setItem('finalTime', JSON.stringify(finalTime));
        localStorage.setItem('currentTime', JSON.stringify(currentTime));
    }
}

function loadFromStorage(){
    let storedfinalTime = localStorage.getItem('finalTime');
    if(storedfinalTime){
        const finalTimeTemp = new Date(JSON.parse(storedfinalTime));
        const currentTimeTemp = new Date().getTime();
        const result = finalTimeTemp - currentTimeTemp; 
        if(result > 0){
            math(result);
            saveStorage(finalTimeTemp, currentTimeTemp);
        }else{
            clearInterval(timerId);
            let div = document.getElementById('messege');
            div.style.display = 'block';
        }
        return finalTimeTemp;
    }
}
