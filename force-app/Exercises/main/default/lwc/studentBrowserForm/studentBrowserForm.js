import { LightningElement, track, wire } from 'lwc';
import getInstructors from
    '@salesforce/apex/StudentBrowserForm.getInstructors';
import getDeliveriesByInstructor from
    '@salesforce/apex/StudentBrowserForm.getDeliveriesByInstructor';


export default class StudentBrowserForm extends LightningElement {
    @track instructors;
    error;
    selectedInstructorId = '';
    @track deliveries;
    selectedDeliveryId = '';

    @wire(getInstructors)
    wired_getInstructors({ error, data }) {
        this.instructors = [];
        if (data) {
            this.instructors.push({
                value: '',
                label: 'Select an instructor'
            });
            data.forEach(instructor => {
                console.log(instructor);
                this.instructors.push({
                    value: instructor.Id,
                    label: instructor.Name
                });
            });
        } else if (error) {
            this.error = error;
        }
    }


    @wire(getDeliveriesByInstructor, {
        instructorId:
            '$selectedInstructorId'
    })
    wired_getDeliveriesByInstructor({ error, data }) {
        this.deliveries = [];
        if (data && data.length) {
            if (this.selectedInstructorId) {
                this.deliveries.push({
                    value: '',
                    label: 'Any delivery'
                });
            }
            data.forEach(delivery => {
                console.log('del', delivery);

                this.deliveries.push({
                    value: delivery.Id,
                    label: `${delivery.Start_Date__c} ${delivery.Location__c} ${delivery.Attendee_Count__c} students`
                });
            });
        } else if (error) {
            this.error = error;
        }
    }


    onInstructorChange(event) {
        this.selectedDeliveryId = '';
        this.selectedInstructorId = event.target.value;
        this.notifyParent();
    }
    onDeliveryChange(event) {
        this.selectedDeliveryId = event.target.value;
        this.notifyParent();
    }

    notifyParent() {
        const evt = new CustomEvent('filterchange', {
            detail: {
                instructorId: this.selectedInstructorId,
                deliveryId: this.selectedDeliveryId,
            }
        });
        this.dispatchEvent(evt);
    }
}