const JsonFormBuilder = require('JsonFormBuilder');

const jsonFormBuilder = JsonFormBuilder('jsonForm');
const jsonFormSanitiser = JsonFormBuilder('jsonFormSanitiser');

let jsonForm = jsonFormBuilder(['input', 'Input', 'textarea']);

console.log(jsonFormSanitiser(jsonForm))

