import { LightningElement, api } from 'lwc';

const DELAY = 300;
export default class LeftChild extends LightningElement {


    @api
    name;

    handleChange(event) {

        window.clearTimeout(this.delayTimeout);
        const name = event.target.value;
        this.delayTimeout = setTimeout(() => {
            this.name = name;

            const namechange = new CustomEvent('namechanged', { detail: this.name });

            // Dispatches the event.
            this.dispatchEvent(namechange);
        }, DELAY);


    }
}