const JsonBuilder = require('./JsonBuilder');
const {sanitiseValues} = require('./JsonSanitiser');

const jsonFormBuilder = new JsonBuilder('jsonForm');

let jsonForm = jsonFormBuilder(['multi', 'Input', 'Textarea']);

// console.log(jsonForm);
console.log(sanitiseValues(jsonForm));