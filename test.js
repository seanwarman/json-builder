const JsonBuilder = require('./JsonBuilder');

const jsonFormBuilder = new JsonBuilder('jsonForm');

let jsonForm = jsonFormBuilder(['input', 'Input', 'Textarea']);

console.log(jsonForm);