window.onload = function(){
    ui.init();
};

class MonthlyEmployeeIncome{
    grossAmount // kwota brutto
    monthNum // aktaulny miesiac
    accumulatedYearlyIncomeSum // zukumulowany dochod od poczatku roku
    
    retirmentContribution // składka emerytalna 9.76%
    pensionContribution // skladka rentowa 1.5%
    sicknessContribution // składka chorobowa 2.45%
    workerSocialContributionSum // Suma składek na ubezpieczenie społeczne
    baseForHealthContribution // Podstawa wymiaru składki na ubezpieczenie zdrowotne
    healthContribution // składka na ubezpieczenie zdrowotne 9%
    advanceTax // Zaliczka na podatek
    healthAmountToExclude // składka zdrowotna według stawki 7.75%
    finalWorkerNetMoney // kwota netto
    income // dochód który jest wynikiem pomniejszenia o koszty uzyskania przychodu 250zl
     
    calculate(grossAmount, monthNum, accumulatedYearlyIncomeSum){
        // składka emerytalna 9.76%
        if(!accumulatedYearlyIncomeSum) accumulatedYearlyIncomeSum = 0;

        this.grossAmount = grossAmount;
        this.monthNum = monthNum;
        this.accumulatedYearlyIncomeSum = accumulatedYearlyIncomeSum;

        // Składka emerytalna 9.76%
        this.retirmentContribution = grossAmount * 0.0976;

        // Składka rentowa 1.5%
        this.pensionContribution = grossAmount * 0.015;

        // Składka chorobowa 2.45%
        this.sicknessContribution = grossAmount * 0.0245;

        // Suma składek na ubezpieczenie społeczne
        // finansowane przez pracownika
        this.workerSocialContributionSum = this.retirmentContribution
                    + this.pensionContribution + this.sicknessContribution;
                    
        // Podstawa wymiaru składki na ubezpieczenie zdrowotne:
        this.baseForHealthContribution = grossAmount - this.workerSocialContributionSum;

        // Składka na ubezpieczenie zdrowotne
        this.healthContribution = this.baseForHealthContribution * 0.09;

        this.income = Math.ceil(this.baseForHealthContribution - 250);

        // Zaliczka na podatek
        if(accumulatedYearlyIncomeSum < 85528 && this.income + accumulatedYearlyIncomeSum >= 85528){
            // pierwszy miesiac gdzie przekroczony prog 17% do 85k
            this.advanceTax = this.income * 0.17;
            const taxAbove = ((this.income + accumulatedYearlyIncomeSum) - 85528 ) * 0.32;
            this.advanceTax += taxAbove;
        }else if(this.income + accumulatedYearlyIncomeSum >= 85528){
            this.advanceTax = this.income * 0.32;
        }else{
            this.advanceTax = (this.income * 0.17) - 43.76;
        }

        // Składka zdrowotna według stawki 7.75%
        this.healthAmountToExclude = this.baseForHealthContribution * 0.0775;

        // Ostateczna zaliczka na podatek dochodowy
        this.advanceTax = Math.floor(this.advanceTax - this.healthAmountToExclude);

        // Kwota netto
        this.finalWorkerNetMoney = grossAmount - this.accumulatedYearlyIncomeSum - this.workerSocialContributionSum - this.healthContribution - this.advanceTax;
    }

}

const monthylIncome = new MonthlyEmployeeIncome();

class MonthlyEmployerCost{
    grossAmount // kwota brutto
    monthNum // aktaulny miesiac
    accumulatedYearlyIncomeSum // zukumulowany dochod od poczatku roku

    employerRetirementContribution // składka na ubezpieczenie emertytalne 9.76%
    employerPensionContribution // składka na ubezpieczenie rentowe 6.5%
    employerAccidentInsurance // składka na ubezpieczenie wypadkowe 1.67%
    employerWorkFundContribution // składka na fundusz pracy 2.45%
    employerGuarantedWorkFundContribution // składka na fundusz gwarantowanych świadczeń pracowniczych 0.1%
    employerContributionSum // suma składek pracodawcy


    calculate(grossAmount, monthNum, accumulatedYearlyIncomeSum){
        this.grossAmount = grossAmount;
        this.monthNum = monthNum;
        this.accumulatedYearlyIncomeSum = accumulatedYearlyIncomeSum;

        // składka na ubezpieczenie emerytalne 9.76%
        this.employerRetirementContribution = grossAmount * 0.0976;

        // składka na ubezpieczenie rentowe 6.5%
        this.employerPensionContribution = grossAmount * 0.065;

        // składka na ubezpieczenie wypadkowe 1.67%
        this.employerAccidentInsurance = grossAmount * 0.0167

        // składka na fundusz pracy 2.45%
        this.employerWorkFundContribution = grossAmount * 0.0245;

        // składka na fundusz gwarantowanych świadczeń pracowniczych 0.1%
        this.employerGuarantedWorkFundContribution = grossAmount * 0.001;

        // Suma składek pracodawcy
        this.employerContributionSum = this.employerRetirementContribution;
                    + this.employerPensionContribution
                    + this.employerAccidentInsurance
                    + this.employerWorkFundContribution
                    + this.employerGuarantedWorkFundContribution
    }

}

const monthlyEmployerCost = new MonthlyEmployerCost();

class Ui{
    salaryInput;
    salaryGross;

    init(){ 
        this.salaryInput = document.getElementById('salary');
        this.salaryInput.addEventListener('input', this.salaryChange);

        
    }

    salaryChange = (e) => {
        
        if(e) this.salaryGross = e.target.value;
        if( !this.salaryGross | isNaN(this.salaryGross)) this.salaryGross = 0;
        
        monthylIncome.calculate(this.salaryGross, 1, 0);
        monthlyEmployerCost.calculate(this.salaryGross, 1, 0);

        this.updateDom();
    }

    updateDom = () => {
        this.setValueById('retirementContribution', monthylIncome.retirmentContribution.toFixed(2));
        this.setValueById('pensionContribution', monthylIncome.pensionContribution.toFixed(2));
        this.setValueById('sicknessContribution', monthylIncome.sicknessContribution.toFixed(2));
        this.setValueById('workerSocialContributionSum', monthylIncome.workerSocialContributionSum.toFixed(2));
        this.setValueById('baseForHealthContribution', monthylIncome.baseForHealthContribution.toFixed(2));
        this.setValueById('healthContribution', monthylIncome.healthContribution.toFixed(2));
        this.setValueById('advanceTax', monthylIncome.advanceTax.toFixed(2));
        this.setValueById('healthAmountToExclude', monthylIncome.healthAmountToExclude.toFixed(2));
        this.setValueById('finalWorkerNetMoney', monthylIncome.finalWorkerNetMoney.toFixed(2));

        /////////////////////////////

        this.setValueById('employerRetirementContribution', monthlyEmployerCost.employerRetirementContribution.toFixed(2));
        this.setValueById('employerPensionContribution', monthlyEmployerCost.employerPensionContribution.toFixed(2));
        this.setValueById('employerAccidentInsurance', monthlyEmployerCost.employerAccidentInsurance.toFixed(2));
        this.setValueById('employerWorkFundContribution', monthlyEmployerCost.employerWorkFundContribution.toFixed(2));
        this.setValueById('employerGuaranteedWorkFundContribution', monthlyEmployerCost.employerGuarantedWorkFundContribution.toFixed(2));
        this.setValueById('employerContributionSum', monthlyEmployerCost.employerContributionSum.toFixed(2));

    }

    setValueById(id, v){
        document.getElementById(id).innerHTML = v;
    }
}

const ui = new Ui();