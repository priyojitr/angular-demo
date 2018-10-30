import { Component } from '@angular/core';

// importing http client for json server
import { HttpClient } from '@angular/common/http';
import { RouterService } from 'src/app/services/router.service';
// import { NotesService } from './services/notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // a note class to store the property of the notes
  // note: Note = new Note(); -- commented now (moved to dashboard)
  // create an array of notes to list all the notes -- commented now (moved to dahsboard)
  // notes: Array<Note> = [];
  // call the constructor to initialize current class with services
    constructor(public routerService: RouterService) { }

  // this will be called when the app starts
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // on initial load, data should come through service created
    // this.notesService.getNotes().subscribe(
    //   data => this.notes = data,
    //   err => console.log(err)
    // );
    // by default route to login
    // this.routerService.routeToLogin();
  }
  // accept the data and post it to db
  // commented below - moved to dashboard
  // takeNote() {
  //   this.notes.push(this.note);
  //   // use the service to save data
  //   this.notesService.addNote(this.note).subscribe(
  //     data => { },
  //     err => {
  //       const index: number = this.notes.findIndex(
  //         note => note.title === this.note.title
  //       );
  //       this.notes.splice(index, 1);
  //     }
  //   );
  //   this.note = new Note();
  // }
}
