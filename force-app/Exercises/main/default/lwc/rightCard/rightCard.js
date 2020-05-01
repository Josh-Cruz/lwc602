import { LightningElement, wire } from 'lwc';
import { registerListener } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import img1 from '@salesforce/resourceUrl/helloimg';


export default class RightCard extends LightningElement {
    name;
    hellimg = img1;

    @wire(CurrentPageReference) pageRef;

    connectedCallback() {
        registerListener('nameChanged', this.handleNewName, this);
    }

    handleNewName(event) {
        console.log('event from right card', event)
        this.name = event.name;
    }


}