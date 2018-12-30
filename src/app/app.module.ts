import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ListComponent} from './list/list.component';
import {CreateStudentComponent} from './create-student/create-student.component';
import {UpdateStudentComponent} from './update-student/update-student.component';
import {StudentsService} from './students.service';
import {LogService} from './log.service';
import {RouterModule} from '@angular/router';
import {environment} from '../environments/environment';

const routes = [
  {
    path: 'students', component: ListComponent
  },
  {
    path: 'new-student', component: CreateStudentComponent
  },
  {
    path: 'update-students', component: UpdateStudentComponent
  },
  {
    path: '**', redirectTo: '/students'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    CreateStudentComponent,
    UpdateStudentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [StudentsService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
