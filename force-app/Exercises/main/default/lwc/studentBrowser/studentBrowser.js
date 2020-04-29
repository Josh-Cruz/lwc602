import { LightningElement, track, wire } from 'lwc';
import getStudents from '@salesforce/apex/StudentBrowser.getStudents';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class StudentBrowser extends LightningElement {

    selectedDeliveryId = '';
    selectedInstructorId = '';

    cols = [
        {
            fieldName: "Name",
            label: "Name"
        },
        {
            fieldName: "Title",
            label: "Title",
            hiddenOnMobile: true
        },
        {
            fieldName: "Phone",
            label: "Phone",
            type: "phone"
        },
        {
            fieldName: "Email",
            label: "E-Mail",
            type: "email"
        }
    ];

    @wire(CurrentPageReference) pageRef;

    @wire(getStudents, {
        instructorId: '$selectedInstructorId',
        courseDeliveryId: '$selectedDeliveryId'
    })
    students;

    handleFilterChange(event) {
        this.selectedDeliveryId = event.detail.deliveryId;
        this.selectedInstructorId = event.detail.instructorId;
    }

    handleStudentSelected(event) {
        const studentId = event.detail.studentId;
        this.updateSelectedStudent(studentId);
    }
    updateSelectedStudent(studentId) {
        fireEvent(this.pageRef, 'studentChange', { studentId });
    }

}