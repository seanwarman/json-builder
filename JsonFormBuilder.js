module.exports = JsonFormBuilder = function(type) {
  this.sanitiseString = (value) => {
    return JSON.stringify(
      typeof value === 'string' ?
      value.replace(/'/g, '"')
      :
      value
    ).slice(1,-1)
  }

  // This double sanitises the whole json overall
  // so that it saves to a mysql db. The extra
  // escape sequences here get removed by mysql.
  this.sanitiseJson = (json) => {
    return JSON.stringify(json.map( obj => {
      if(typeof obj.value === 'string' && 
         (
           obj.type === 'textarea' ||
           obj.type === 'input'
         )
      ) {
        obj.value = this.sanitiseString(obj.value);
      }
      return obj;
    }))
  } 
  
  this.sanitiseJsonValues = (json) => {
    return json.map( obj => {
      if(typeof obj.value === 'string' && 
        (
          obj.type === 'textarea' ||
          obj.type === 'input'
        )
      ) {
        obj.value = this.sanitiseString(obj.value);
      }
      return obj;
    })
  } 
  
  this.sanitiseMultiTypeChildValues = (child) => {
    child.value = this.sanitiseString(child.value);
    return child;
  } 
  
  this.sanitiseMultiChildren = (jsonForm) => {
    return jsonForm.reduce((jsonArg, item) => {
      if(item.type === 'multi') {
        let children = [];
        item.children.forEach( child => children.push(child.map(this.sanitiseMultiTypeChildValues)));
        return jsonArg.concat({ ...item, children });
      } else {
        return jsonArg.concat({ ...item });
      }
    }, [])
  } 
  
  this.sanitiseValues = (jsonForm) => {
    return this.sanitiseJsonValues(this.sanitiseMultiChildren(jsonForm))
  } 
  
  this.jsonFormSanitiser = (jsonForm) => {
    return this.sanitiseJson(this.sanitiseMultiChildren(jsonForm))
  }

  this.jsonFormValidator = (form, saved) => {
    if(saved) return false;
    let valid = true;
    let formCopy = form.filter( item => (
      item.required === true && item.type !== 'multi'
    ));
    let multis = form.filter( item => (
      item.required === true && item.type === 'multi'
    ));
    formCopy = multis.reduce( (arr, input) => {
      return this.flattenArr(arr).concat(this.flattenArr(input.children));
    }, formCopy);
    if(formCopy.find( item => (
      (typeof item.value === 'string' && item.value.length < 1)
      ||
      (typeof item.value === 'object' && item.value === null)
    ))) {
      valid = false;
    }
    return valid;
  }

  this.jsonForm = (array) => {
    return array.reduce((arr, type) => {
      if(!this._jsonFormTypes()[type]) {
        console.log('The following item was an invalid jsonForm type so it was skipped: ' + type);
        return arr;
      }
      return arr.concat(this._jsonFormTypes()[type]());
    }, [])
  }

  this._jsonFormTypes = () => {
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

  return this[type].bind(this)
}