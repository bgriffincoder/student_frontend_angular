import { Component, Input } from '@angular/core';

import { StudentComponent } from './student/student.component'
import { MajorComponent }   from './major/major.component';
import { MajorFormComponent }   from './major-form/major-form.component';
import { GradeComponent }   from './grade/grade.component';
import { GradeFormComponent }   from './grade-form/grade-form.component';
import { KlassComponent } from './klass/klass.component';
import { KlassFormComponent } from './klass-form/klass-form.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { InstructorComponent } from './instructor/instructor.component';
import { InstructorFormComponent } from './instructor-form/instructor-form.component';
import { MajorClassComponent } from './major-class/major-class.component';
import { MajorClassFormComponent } from './major-class-form/major-class-form.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { StudentClassFormComponent } from './student-class-form/student-class-form.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input() erroMessage: string;
}
