slider = document.getElementById('slider-range');
div = document.getElementById('slide-img');

function change(){
    div.style.width = slider.value + '%';    
}