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
            value: '',
            required: false,
            prettyType: 'Text'
        })
      },
      Input() {
        return ({
            type: 'input',
            value: '',
            required: true,
            prettyType: 'Text'
        })
      },
      textarea() {
        return ({
            type: 'textarea',
            value: '',
            required: false,
            prettyType: 'Long Text'
        })
      },
      Textarea() {
        return ({
            type: 'textarea',
            value: '',
            required: true,
            prettyType: 'Long Text'
        })
      }
    }
    
  }
}