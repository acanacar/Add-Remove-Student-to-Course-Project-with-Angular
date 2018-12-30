import {LogService} from './log.service';
import {Injectable} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable()
export class StudentsService {
  private logService: LogService;

  constructor(logService: LogService, private firebase: AngularFireDatabase) {
    this.logService = logService;
  }

  studentList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    curator: new FormControl('', Validators.required),
    course: new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  getStudents() {
    this.studentList = this.firebase.list('students');
    return this.studentList.snapshotChanges();
  }


  addStudent(student) {
    console.log('studentList: ', this.studentList);
    this.studentList.push({
      name: student.name,
      surname: student.surname,
      curator: student.curator,
      course: student.course
    });
    this.logService.writeLog('added student');
  }

  deleteStudent($key: string) {
    this.studentList.remove($key);
  }

  updateStudent(student) {
    this.logService.writeLog('updated Student');
    this.studentList.update(student.$key,
      {
        name: student.name,
        surname: student.surname,
        curator: student.curator,
        course: student.course
      });
  }

  populateForm(student) {
    this.form.setValue(student);
  }
}
