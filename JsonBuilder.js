module.exports = class JsonBuilder {
  constructor(type) {
    if(!this[type]) {
      console.log('Invalid JsonBuilder type, try "jsonForm"');
      return null;
    }
    return this[type].bind(this);
  }
  jsonForm(array) {
    return array.reduce((arr, type) => {
      if(!this._jsonFormTypes()[type]) {
        console.log('The following item was an invalid jsonForm type so it was skipped: ' + type);
        return arr;
      }
      return arr.concat(this._jsonFormTypes()[type]());
    }, [])
  }
  _jsonFormTypes() {
    return {
      input() {
        return ({
          type: 'input',
          label: '',
          value: '',
          required: false,
          prettyType: 'Text'
        })
      },
      Input() {
        return ({
          type: 'input',
          label: '',
          value: '',
          required: true,
          prettyType: 'Text'
        })
      },
      textarea() {
        return ({
          type: 'textarea',
          label: '',
          value: '',
          required: false,
          prettyType: 'Long Text'
        })
      },
      Textarea() {
        return ({
          type: 'textarea',
          label: '',
          value: '',
          required: true,
          prettyType: 'Long Text'
        })
      },
      Dropdown() {
        return ({
          type: 'dropdown',
          label: '',
          value: '',
          // comma seperated...
          selections: '',
          required: true,
          prettyType: 'Dropdown'
        })
      },
      dropdown() {
        return ({
          type: 'dropdown',
          label: '',
          value: '',
          // comma seperated...
          selections: '',
          required: false,
          prettyType: 'Dropdown'
        })
      },
      date() {
        return ({
          type: 'date',
          label: '',
          value: '',
          required: false,
          prettyType: 'Date'
        })
      },
      Date() {
        return ({
          type: 'date',
          label: '',
          value: '',
          required: true,
          prettyType: 'Date'
        })
      },
      multi() {
        const template = [
          { label: '', type: 'input', prettyType: 'Text', value: '' },
          { label: '', type: 'textarea', prettyType: 'Text Area', value: '' }
        ];
        return ({
          type: 'multi',
          label: '',
          value: '',
          template: template,
          children: [template],
          required: false,
          prettyType: 'Multi'
        })
      },
      Multi() {
        const template = [
          { label: '', type: 'input', prettyType: 'Text', value: '' },
          { label: '', type: 'textarea', prettyType: 'Text Area', value: '' }
        ];
        return ({
          type: 'multi',
          label: '',
          value: '',
          template: template,
          children: [template],
          required: true,
          prettyType: 'Multi'
        })
      }
    }
  }
}