const inputs = document.querySelectorAll('input');

inputs.forEach( (input) => {
    input.addEventListener('click', (el) => {
        if(el.target.value !== '' && el.target.value !== 'Prześlij'){
            el.target.value = '';
        }
    })
})

