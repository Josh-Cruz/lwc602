import { LightningElement, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/Contacts.getContacts';



const columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'E-Mail', fieldName: 'email', type: 'email' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },

];

const alphabet = [{ "label": "A", "value": "A" }, { "label": "B", "value": "B" }, { "label": "C", "value": "C" }, { "label": "D", "value": "D" }, { "label": "E", "value": "E" }, { "label": "F", "value": "F" }, { "label": "G", "value": "G" }, { "label": "H", "value": "H" }, { "label": "I", "value": "I" }, { "label": "J", "value": "J" }, { "label": "K", "value": "K" }, { "label": "L", "value": "L" }, { "label": "M", "value": "M" }, { "label": "N", "value": "N" }, { "label": "O", "value": "O" }, { "label": "P", "value": "P" }, { "label": "Q", "value": "Q" }, { "label": "R", "value": "R" }, { "label": "S", "value": "S" }, { "label": "T", "value": "T" }, { "label": "U", "value": "U" }, { "label": "V", "value": "V" }, { "label": "W", "value": "W" }, { "label": "X", "value": "X" }, { "label": "Y", "value": "Y" }, { "label": "Z", "value": "Z" }]


export default class Challenge_contactDirectory extends LightningElement {


    @track columns = columns;
    value = '';
    @track alphabet = alphabet;
    error;

    // @wire(getContacts, { firstLetter: '$value' })
    // data;
    @wire(getContacts, { firstLetter: '$value' })
    wiredContacts({ error, data }) {
        if (data) {
            this.data = data;
          console.log(JSON.stringify(data));

            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }


    // get letters() {
    //     let arrOfLetters = [];

    //     alphabet.forEach(element => {
    //         let letterObj = {};
    //         letterObj.label = element;
    //         letterObj.value = element;

    //         arrOfLetters.push(letterObj);
    //     });
    //     console.log(JSON.stringify(arrOfLetters));
    //     return arrOfLetters;
    // }


    handleChange(event) {
        this.value = event.detail.value;

    }


}