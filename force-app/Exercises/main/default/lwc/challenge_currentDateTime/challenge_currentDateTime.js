import { LightningElement } from 'lwc';

export default class Challenge_currentDateTime extends LightningElement {
    currTime;
    
    renderedCallback(){
        let today = new Date();
        this.currTime =today.toISOString();
    }
    
    getDateTime(){
        let today = new Date();
        this.currTime =today.toISOString();
    }  
}