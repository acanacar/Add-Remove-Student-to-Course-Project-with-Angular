import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {StudentsService} from '../students.service';
import set = Reflect.set;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private studentService: StudentsService, private router: Router) {
  }

  studentsArray = [];
  showDeleteMessage: boolean;
  fillTheTableRow2: '';

  ngOnInit() {
    this.studentService.getStudents().subscribe(
      arr => {
        this.studentsArray = arr.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }
    );
    // this.fillTheTableRow2 = null;
  }

  onEditClicked(student) {
    this.router.navigate(['/update-students', student])
      .then(() => {
        this.studentService.populateForm(student);
      })
      .then(() => {
        this.fillTheTableRow2 = student.$key;
      });
  }

  onDelete($key) {
    if (confirm('Sure to delete?')) {
      this.studentService.deleteStudent($key);
      this.showDeleteMessage = true;
      setTimeout(() => this.showDeleteMessage = false, 3000);
    }
  }

}
