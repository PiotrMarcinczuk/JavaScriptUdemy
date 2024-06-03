let finalDate = null;
let timerId = null;

document.getElementById('countdown-button').addEventListener('click', function(){
    initTimer();
});

function initTimer(){
    finalDate = document.getElementById('timer').value;

    if(finalDate == '') return;
    finalDate = new Date(finalDate);

    timer();
    timerId = setInterval(timer, 1000);
}

function timer(){
    let current = new Date().getTime();
    let result = finalDate - current;

    if(result <= 0){
        document.getElementById('messege').style.display = 'block';
        clearInterval(timerId);
        clearTime();
        return;
    }
    setTime(result);
}

function setTime(value){
    value = value / 1000

    let days = value / ((60 * 60) * 24);
    days = Math.floor(days);
    setHtmlBySelector('#days', days);

    let hours = value % ((60 * 60) * 24) / (60 * 60);
    hours = Math.floor(hours);
    setHtmlBySelector('#hours', hours);

    let minutes = value % (60 * 60) / 60;
    minutes = Math.floor(minutes);
    setHtmlBySelector('#minutes', minutes);

    let seconds = value % 60;
    seconds = Math.floor(seconds);
    setHtmlBySelector('#seconds', seconds);
}

function setHtmlBySelector(selector, v){
    document.querySelector(selector).innerHTML = v;
}

function clearTime(){
    setHtmlBySelector('#days', '-');
    setHtmlBySelector('#hours', '-');
    setHtmlBySelector('#minutes', '-');
    setHtmlBySelector('#seconds', '-');
}
