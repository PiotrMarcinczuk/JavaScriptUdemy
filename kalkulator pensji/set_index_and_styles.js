window.onload = function(){
    const tdIndexEmployee = document.querySelectorAll('.employeeContributions .number');
    const tdIndexEmployer = document.querySelectorAll('.employerContributions .number');
    const tr = document.getElementsByTagName('tr');
    
    for(let i=0; i<tdIndexEmployee.length; i++){
        tdIndexEmployee[i].innerHTML = i + 1; // Employee table
    }

    for(let i=0; i<tdIndexEmployer.length; i++){
        tdIndexEmployer[i].innerHTML = i + 1;  // Employer table
    }

    for(let i=0; i<tr.length; i++){
        let specialTr = tr[i].classList.value;
        
        if(i % 2 === 0){
            tr[i].classList.add('not-even-element');
        }else{
            
            tr[i].classList.add('even-element')
        }
    }
}