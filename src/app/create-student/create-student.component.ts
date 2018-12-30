import {Component, OnInit} from '@angular/core';
import {StudentsService} from '../students.service';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent implements OnInit {

  constructor(private studentService: StudentsService) {
  }

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.studentService.form.controls;

  ngOnInit() {
    this.studentService.form.reset()
  }

  onSubmit() {
    this.submitted = true;
    if (this.studentService.form.valid) {
      if (this.studentService.form.get('$key').value === null) {
        this.studentService.addStudent(this.studentService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        this.studentService.form.reset();
      }
      this.submitted = false;
    }
  }
}
