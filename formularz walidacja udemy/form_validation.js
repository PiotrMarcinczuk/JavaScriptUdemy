class FormValidator{
    constructor(){
        this.formFields = [];
        this.form = document.getElementById('form');
        // this.addFormField('#username', {
        //     minLength: 4, maxLength: 20
        // }),
        // this.addFormField('#email', {
        //     minLength: 4, maxLength: 50
        // }),
        // this.addFormField('#password', {
        //     minLength: 5, maxLength: 25
        // })
        // this.addFormField('#password2', {
        //     minLength: 5, maxLength: 30, matchWithPasswordId: '#password'
        // })

        this.proccesForm();
        
        this.init();
    }

    proccesForm = () => {
        this.form.querySelectorAll('input').forEach( e => {
            let minLength = e.getAttribute('minLength');
            if(!minLength) minLength = undefined;
            let maxLength = e.getAttribute('maxLength');
            if(!maxLength) maxLength = undefined;
            let matchWithPasswordId = e.getAttribute('data-match-witch-password-id')
            if(!matchWithPasswordId) matchWithPasswordId = undefined;

            this.addFormField( `#${e.id}`, {
                minLength: minLength,
                maxLength: maxLength,
                matchWithPasswordId: matchWithPasswordId
            })
        })
    }

    addFormField = (cssSelector, options) => {
        const formField = new FormField(cssSelector, options);
        this.formFields.push(formField);
    }

    init(){
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            this.validateForm();
        })
    }

    validateForm = () => {
        const formResults = this.formFields.map( f => f.validate() );
        
        if(formResults.includes(false)){
            console.log('Blad');
        }else{
            console.log('Ok');
        }
    }
}