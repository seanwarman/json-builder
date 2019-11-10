# Json Builder
A tool to create json type components for quick and standardised input forms.

Choose the type of builder you want:

```js
const jsonFormBuilder = JsonBuilder('jsonForm');
```

Then add an array of field types to quickly construct the json object. Adding title-cases to the fields you want to be `required`:

```js
let jsonForm = jsonFormBuilder(['input', 'Input', 'textarea']);

// jsonForm = [ 
//   { type: 'input',
//     label: '',
//     value: '',
//     required: false,
//     prettyType: 'Text' },
//   { type: 'input',
//     label: '',
//     value: '',
//     required: true,
//     prettyType: 'Text' },
//   { type: 'textarea',
//     label: '',
//     value: '',
//     required: false,
//     prettyType: 'Long Text' } 
// ]
```

## Sanitising
There's also some sanitising tools that come with the builder:

```js
const jsonFormSanitiser = JsonFormBuilder('jsonFormSanitiser');
```

This will sanitise all values of the jsonForm then convert the whole object to a string ready to go to a MYSQL database.

```js
const data {
    jsonForm: jsonFormSanitiser(jsonForm);
}
```

The other tools included are:

- **sanitiseValues(Json)** - this will sanitise the values without converting the object to a string.
- **sanitiseString(String)** - this will simply sanitise any string.  