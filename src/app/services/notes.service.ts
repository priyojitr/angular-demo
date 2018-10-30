import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Note } from '../note';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotesService {

  private _notesUrl: string;
  public bearerToken: any;

  constructor(private http: HttpClient,
    public authService: AuthenticationService) {
    this._notesUrl = 'http://localhost:3000/api/v1/notes/';
    this.bearerToken = this.authService.getBearerToken();
  }

  getNotes(): Observable<Array<Note>> {
    return this.http.get<Array<Note>>(this._notesUrl, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.bearerToken}`)
    });
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this._notesUrl, note, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${this.bearerToken}`)
    });
  }
}
