class FormField{
    constructor(formFieldSelector, 
        { minLength = 3, maxLength = 20,
          errorMsgSelector, matchWithPasswordId}){
            this.formField = document.querySelector(formFieldSelector);
            this.type = this.formField.type;
            this.minLength = +minLength;
            this.maxLength = +maxLength;
            if(!errorMsgSelector) errorMsgSelector = `${formFieldSelector} + span`;
            this.errorMsgEl = document.querySelector(errorMsgSelector);
            this.matchWithPasswordId = matchWithPasswordId;
    }

    validate = () => {
        switch(this.type){
            case 'password':
                if(!this.checkTextLength()) return false;
                if(!this.checkValidPassword()) return false;
                return true;
                break;
            case 'text':
                if(!this.checkTextLength()) return false;
                return true;
                break;
            case 'email':
                if(!this.checkEmail()) return false;
                return true;
                break;
        }
        return false;
    }

    checkValidPassword = () => {
        if(!this.matchWithPasswordId) return true;
        const matchWith = document.querySelector(this.matchWithPasswordId);

        if(this.formField.value.length > 0
            && this.formField.value === matchWith.value){
                this.showSuccess();
                return true;
            }else{
                this.showError('Hasła muszą sięzgadzać');
                return false;
            }

    }

    checkTextLength = () => {
        if(this.formField.value.length < this.minLength){
            this.showError(`Wymagane minimum znaków: ${this.minLength}`);
            return false
        }else if(this.formField.value.length > this.maxLength){
            this.showError(`Maksymalnie mozna uzyc ${this.maxLength}`);
            return false;
        }else{
            this.showSuccess();
            return true;
        }
    }

    checkEmail = () => {
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(re.test(this.formField.value.trim())){
            this.showSuccess();
            return true;
        }else{
            this.showError('Wpisz prawidlowy email');
            return false
        }
    }

    showError = (err) => {
        this.errorMsgEl.innerHTML = err;
        this.errorMsgEl.classList.add('error');
        this.formField.classList.add('error');
        this.errorMsgEl.classList.remove('success');
        this.formField.classList.remove('success');
    }

    showSuccess = () => {
        this.errorMsgEl.innerHTML = '';
        this.errorMsgEl.classList.remove('error');
        this.formField.classList.remove('error');
        this.errorMsgEl.classList.add('success');
        this.formField.classList.add('success');
    }
}