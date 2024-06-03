(function(window, document){
    const video = document.getElementById('video');
    const playPauseButton = document.getElementById('play-pause');
    const progressInput = document.getElementById('progress-input');
    const volumeButton = document.getElementById('volume-change');
    const videoProgess = document.getElementById('video-progess');
    const fullscreenButton = document.getElementById('fullscreen');

    const fullscreenSupported = !!document.fullscreenEnabled; 
    // kiedy nie istnieje mozliwosc 
    // (przez przegladarke) to podwojne zaprzeczenie 
    // da nam true kiedy bedzie a false kiedy nie bedzie takiej opcji

    function playPause(){
        if(video.paused){
            video.play();
        }else{
            video.pause();
        }
    }

    function changePlayPause(){
        if(video.paused){
            playPauseButton.innerHTML = '<i class="fa-solid fa-play"></i>'
        }else{
            playPauseButton.innerHTML = '<i class="fa-solid fa-pause">';
        }
        video.addEventListener('ended', () => {
            playPauseButton.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
            progressInput.value = 0;
        })
    }

    function setTime(){
        video.currentTime =  video.duration * (progressInput.value * 0.01);
    }

    function volumeChange(){
        if(!video.muted){
            volumeButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            video.muted = true;
        }else{
            volumeButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            video.muted = false;
        }
    }

    function setTimer(){
        let seconds = Math.floor(video.currentTime % 60);
        let minutes = Math.floor(video.currentTime / 60);
        if(minutes < 10) minutes = '0' + minutes;
        if(seconds < 10) seconds = '0' + seconds;
        videoProgess.innerHTML = `${minutes}:${seconds}`

        // lub tak
        // videoProgess.innerHTML = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function setFullScreen(){
        if(!fullscreenSupported) return;
        if(!document.fullscreenElement){ // jesli okno przegladarki nie jest zmaksymalizowane
           document.documentElement.requestFullscreen();
        }else{
            document.exitFullscreen();
        }
    }

    function init(){
        playPauseButton.addEventListener('click', playPause);
        playPauseButton.addEventListener('click', changePlayPause);
        volumeButton.addEventListener('click', volumeChange);
        progressInput.addEventListener('change', setTime);

        if(fullscreenSupported){
            fullscreenButton.addEventListener('click', setFullScreen);
        }else{
            fullscreenButton.style.display = 'none';
        }

        video.addEventListener('timeupdate', setTimer);
        
    }

    window.onload = init;
})(window, document)