import { LightningElement, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';


export default class LeftParent extends LightningElement {
    name = 'chicka chicka slim shady';

    @wire(CurrentPageReference) pageRef;

    handleNameChange(event) {
        this.name = event.detail;

        fireEvent(this.pageRef, 'nameChanged', { name: this.name });
    }

}