import { Component, OnInit } from '@angular/core';
// importing note class
import { Note } from '../note';
// importing notes service
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  note: Note;
  notes: Array<Note>;

  constructor(private notesService: NotesService) {
    this.note = new Note();
  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(
      data => this.notes = data,
      err => console.log(err)
    );
  }

  takeNote() {
    this.notes.push(this.note);
    // use the service to save data
    this.notesService.addNote(this.note).subscribe(
      data => { },
      err => {
        const index: number = this.notes.findIndex(
          note => note.title === this.note.title
        );
        this.notes.splice(index, 1);
      }
    );
    this.note = new Note();
  }
}
