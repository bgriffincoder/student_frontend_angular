import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css']
})
export class AssignmentFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  assignmentData: object;

  assignmentForm: NgForm;
  @ViewChild('assignmentForm') currentForm: NgForm;


  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    this.assignmentForm = this.currentForm;
    this.assignmentForm.valueChanges
      .subscribe(
        data => this.onValueChanged(data)
      );
  }

  onValueChanged(data?: any) {
    let form = this.assignmentForm.form;

    for (let field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  formErrors = {
    'student_id': '',
    'assignment_nbr': '',
    'grade_id': '',
    'class_id': ''
  };

  validationMessages = {
    'student_id': {
      'required': 'Student ID is required and must be an integer.',
      'minlength': 'Student ID must be at least 1 character long.'
     },
    'assignment_nbr': {
      'required': 'Assignment # is required.',
      'minlength': 'Assignment # must be at least 1 character long.'
    },
    'grade_id': {
      'pattern': 'Grade ID must be between 1 and 6.'
    },
    'class_id': {
      'pattern': 'Class ID must be between 1 and 36.'
    }
  };


  



  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("assignment", +params['id']))
      .subscribe(assignmentData => this.assignmentData = assignmentData);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });

  }

  saveAssignment(assignment: NgForm){
    if(typeof assignment.value.assignment_id === "number"){
      this.dataService.editRecord("assignment", assignment.value, assignment.value.assignment_id)
          .subscribe(
            assignment => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("assignment", assignment.value)
          .subscribe(
            assignment => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.assignmentData = {};
    }

  }

}


