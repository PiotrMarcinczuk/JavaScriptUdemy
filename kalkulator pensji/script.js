window.onload = function(){
    
}

class Employee{
    init(){
        this.retirmentContribution = null;
        this.pensionContribution = null;
        this.sicknessContribution = null;
        this.workerSocialContributionSum = null;
        this.baseForHealthContribution = null;
        this.healthInsurance = null;
        this.advanceTax = null;
        this.healthContribution = null;
        this.finalEmployeeMoney = null;

        this.income = null;

        this.downloadDOMElements();
    }

    downloadDOMElements(){
        this.retirmentContribution = document.querySelector('.retirmentContribution');
        this.pensionContribution = document.querySelector('.pensionContribution');
        this.sicknessContribution = document.querySelector('.sicknessContribution');
        this.workerSocialContributionSum = document.querySelector('.workerSocialContributionSum');
        this.baseForHealthContribution = document.querySelector('.baseForHealthContribution');
        this.healthInsurance = document.querySelector('.healthInsurance');
        this.advanceTax = document.querySelector('.advanceTax');
        this.healthContribution = document.querySelector('.healthContribution');
        this.finalEmployeeMoney = document.querySelector('.finalEmployeeMoney');
    }

    setValue(value, monthNum, accumulatedYearlyIncomeSum){
        let grossAmount = parseFloat(value);
        let temp = 0;

        // składka emerytalna 9.76%
        temp = grossAmount * 0.0976;
        temp = parseFloat(temp.toFixed(2));
        this.retirmentContribution.innerText = temp

        // składka rentowa 1.5%
        temp = grossAmount * 0.015;
        temp = parseFloat(temp.toFixed(2));
        this.pensionContribution.innerText = temp;

        // składka chorobowa 2.45%
        temp = grossAmount * 0.0245;
        temp = parseFloat(temp.toFixed(2));
        this.sicknessContribution.innerText = temp;

        // Suma składek na ubezpieczenie społeczne
        let retirment = parseFloat(this.retirmentContribution.innerText);
        let pension = parseFloat(this.pensionContribution.innerText);
        let sickness = parseFloat(this.sicknessContribution.innerText);
        this.workerSocialContributionSum.innerText = (retirment + pension + sickness).toFixed(2);

        // Podstawa wymiaru składki na ubezpieczenie zdrowotne
        temp = grossAmount - this.workerSocialContributionSum.innerText;
        temp = parseFloat(temp.toFixed(2));
        this.baseForHealthContribution.innerText = temp;

        // składka na ubezpiecznie zdrowotne 9%
        temp = this.baseForHealthContribution.innerText * 0.09;
        temp = parseFloat(temp.toFixed(2));
        this.healthInsurance.innerText = temp

        // wynagrodzenie musi byc wysokie bo beda wartosci na - przy zaliczce
        temp = this.baseForHealthContribution.innerText - 250
        temp = parseFloat(temp.toFixed(2));
        this.income = temp;

        if(accumulatedYearlyIncomeSum < 85528 
            && this.income + accumulatedYearlyIncomeSum >= 85528){
                temp = this.income * 0.17;
                temp = parseFloat(temp.toFixed(2));

                this.advanceTax.innerText = temp;
                const taxAbove = ((this.income + accumulatedYearlyIncomeSum) - 85528) * 0.32;

                temp += taxAbove;
                this.advanceTax.innerText = temp;
            }else if(this.income + accumulatedYearlyIncomeSum >= 85528){
                temp = this.income * 0.32;
                parseFloat(temp.toFixed(2));
                this.advanceTax.innerText = temp;
            }else{
                temp = (this.income * 0.17) - 43.76;
                parseFloat(temp.toFixed(2));
                this.advanceTax.innerText = temp;
            }

        // składka na ubezpiecznie zdrowotne 9%
        temp = this.baseForHealthContribution.innerText * 0.0775;
        temp = parseFloat(temp.toFixed(2));
        this.healthContribution.innerText = temp;

        // zaliczak na podatek dochodowy
        temp = this.advanceTax.innerText - this.healthContribution.innerText;
        temp = parseFloat(temp.toFixed(2));
        this.advanceTax.innerText = temp;

        // kwota netto
        temp = grossAmount - this.workerSocialContributionSum.innerText - this.healthContribution.innerText - this.advanceTax.innerText;
        temp = parseFloat(temp.toFixed(2));
        this.finalEmployeeMoney.innerText = temp;
    }

}

class Employer{
    init(){
        this.employerRetirmentContribution = null;
        this.employerPensionContribution = null;
        this.employerAccidentInsurance = null;
        this.employerWorkFundContribution = null;
        this.employerGuarantedWorkFuncContribution = null;
        this.finalEmployerMoney = null;

        this.downloadDOMElements();
    }

    downloadDOMElements(){
        this.employerRetirmentContribution = document.querySelector('.employerRetirmentContribution');
        this.employerPensionContribution = document.querySelector('.employerPensionContribution');
        this.employerAccidentInsurance = document.querySelector('.employerAccidentInsurance');
        this.employerWorkFundContribution = document.querySelector('.employerWorkFundContribution');
        this.employerGuarantedWorkFundContribution = document.querySelector('.employerGuarantedWorkFundContribution');
        this.finalEmployerMoney = document.querySelector('.finalEmployerMoney');
    }

    setValue(value, monthNum, accumulatedYearlyIncomeSum){
        let grossAmount = parseFloat(value);
        let temp = 0;

        // Składka na ubezpieczenie emerytalne 9.76%
        temp = grossAmount * 0.0976;
        temp = parseFloat(temp.toFixed(2));
        this.employerRetirmentContribution.innerText = temp;

        // Składka na ubezpieczenie rentowe 6.5%
        temp = grossAmount * 0.065;
        temp = parseFloat(temp.toFixed(2));
        this.employerPensionContribution.innerText = temp;

        // Składka na ubezpieczenie wypadkowe 1.67%
        temp = grossAmount * 0.0167;
        temp = parseFloat(temp.toFixed(2));
        this.employerAccidentInsurance.innerText = temp;

        // Składka na fundusz pracy 2.45%
        temp = grossAmount * 0.0245;
        temp = parseFloat(temp.toFixed(2));
        this.employerWorkFundContribution.innerText = temp;

        // Składka na Fundusz Gwarantowanych Świadczeń Pracowniczych 0.1%
        temp = grossAmount *  0.001;
        temp = parseFloat(temp.toFixed(2));
        this.employerGuarantedWorkFundContribution.innerText = temp;

        // suma skladek pracodawcy
        temp = parseFloat(this.employerRetirmentContribution.innerText) +
        parseFloat(this.employerPensionContribution.innerText) +
        parseFloat(this.employerAccidentInsurance.innerText) + 
        parseFloat(this.employerWorkFundContribution.innerText) +
        parseFloat(this.employerGuarantedWorkFundContribution.innerText);

        temp = temp.toFixed(2);

        this.finalEmployerMoney.innerText = temp;
    }
}

class Money{
    init(){
        this.salary = 0;
        this.input = null;
    }

    setSalary(){
        this.input = document.getElementById('value');
        this.input.addEventListener('input', (el) => {
            if(isNaN(el.target.value)) return;
            this.salary = el.target.value;
            employee.setValue(this.salary, 1, 0);
            employer.setValue(this.salary, 1, 0);
        })
    }
}

const money = new Money();
money.setSalary();

const employee = new Employee();
employee.init();

const employer = new Employer();
employer.init();

