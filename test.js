const JsonFormBuilder = require('./JsonFormBuilder');

const jsonFormBuilder = JsonFormBuilder('jsonForm');

let jsonForm = jsonFormBuilder(['Multi']);

// console.log(jsonForm);

jsonForm[0].children[0][0].value = '';
jsonForm[0].children[0][1].value = 'otherstuff';
jsonForm[0].children[0][0].label = 'Keyword';
jsonForm[0].children[0][1].label = 'Description';

// console.log(jsonForm[0].children[0]);

const jsonFormValidator = JsonFormBuilder('jsonFormValidator');

const validated = jsonFormValidator(jsonForm);

console.log(validated);