import { Component, OnInit,Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { DataService } from '../data.service'
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component'

@Component({
  selector: 'app-klass',
  templateUrl: './klass.component.html',
  styleUrls: ['./klass.component.css']
})
export class KlassComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  classes: any[];
  mode = 'Observable';
 
  constructor (private dataService: DataService, public dialog: MdDialog) {}
 
  ngOnInit() { this.getClasses(); 
  console.log(this.getClasses());
  }
 
  getClasses() {
    this.dataService.getRecords("class")
      .subscribe(
        classes => this.classes = classes,
        error =>  this.errorMessage = <any>error);
        
  }

  deleteClass(id:number) {

    let dialogRef = this.dialog.open(DeleteConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.deleteRecord("class", id)
          .subscribe(
            myclass => {this.successMessage = "Record(s) deleted succesfully"; this.getClasses(); },
            error =>  this.errorMessage = <any>error);
      }
    });
  }

}


