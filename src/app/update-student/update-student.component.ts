import {Component, OnInit} from '@angular/core';
import {StudentsService} from '../students.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  constructor(private studentService: StudentsService) {}

  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.studentService.form.controls;

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.studentService.form.valid) {
      if (this.studentService.form.get('$key').value == null) {
        this.studentService.addStudent(this.studentService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
        this.studentService.form.reset();
      } else {
        this.studentService.updateStudent(this.studentService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 3000);
      }
      this.submitted = false;
    }
  }

}
