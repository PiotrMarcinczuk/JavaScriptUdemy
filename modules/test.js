const data = 123;

export function getData(){
    return data;
}

export let testValue = 'test';

export function add(a,b){
    return a + b;
}

export function multiply(a,b){
    return a * b;
}

export function setTestValue(value){
    testValue = value;
}

export default {
    getData: getData,
    value: testValue,
}