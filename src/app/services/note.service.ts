import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../models/note.model';
import {map} from 'rxjs/operators';

@Injectable()
export class NoteService {
  constructor(private http: HttpClient) {}

  public index() {
    return this.http.get<any>('http://localhost:8080/notes').pipe(
      map(response => response.notes.map(notes => new Note().deserialize(notes)))
    );
  }

  public store(note: Note) {
    return this.http.post('http://localhost:8080/notes', note);
  }

  public edit(newNote) {
    return this.http.put('http://localhost:8080/notes/' + newNote.id + '/edit', newNote);
  }

  public delete(id: number) {
    return this.http.delete('http://localhost:8080/notes/' + id);
  }
}
