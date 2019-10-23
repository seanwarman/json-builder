# json-builder
A tool to create json type components for quick and standardised input forms.

Choose the type of builder you want:

```js
const jsonFormBuilder = new JsonBuilder('jsonForm');
```

Then add an array of field types to quickly construct the json object. Adding title-cases to the fields you want to be `required`:

```js
let jsonForm = jsonFormBuilder(['input', 'Input', 'textarea']);
```
