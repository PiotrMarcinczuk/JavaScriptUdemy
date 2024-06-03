class ValidateForm{
    constructor(name, email, password, passwordRepeat){
        this.name =  name,
        this.email = email,
        this.password = password,
        this.passwordRepeat = passwordRepeat

        this.inputs = [this.name, this.email, this.password, this.passwordRepeat];
    }

    init(){
        this.inputs.forEach( (el) => {
            this.checkFields(el);
        })
    }

    checkFields(inputName){
        const rePassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        switch(inputName.id){
            case 'name':
                if(inputName.value.length < 8 || inputName.value.length > 16){
                    this.addStyle(false, inputName, nameFail);
                }else{
                    this.addStyle(true, inputName, nameFail);
                }
                break;
            case 'email':
                const reEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                if(reEmail.test(inputName.value.trim())){
                    this.addStyle(true, inputName, emailFail);
                }else{
                    this.addStyle(false, inputName, emailFail);
                }
                break;
            case 'password':
                if(rePassword.test(inputName.value.trim())){
                    this.addStyle(true, inputName, passwordFail);
                }else{
                    this.addStyle(false, inputName, passwordFail);
                }
                break;
            case 'passwordRepeat':
                if(inputPassword.value === inputName.value && rePassword.test(inputName.value.trim())){
                    this.addStyle(true, inputName, passwordRepeatFail);
                }else{
                    this.addStyle(false, inputName, passwordRepeatFail);
                }
                break;
        }
    }

    addStyle(argument, input, pId){
        switch(argument){
            case true:
                input.classList.remove('failValidate');
                input.classList.add('successValidate');
                pId.style.display = 'none';
                break;
            case false:       
                input.classList.remove('successValidate');
                input.classList.add('failValidate');
                pId.style.display = 'flex';
                break;
        }
    }
}

