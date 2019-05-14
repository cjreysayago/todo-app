import {Component, OnInit} from '@angular/core';
import {NoteService} from './services/note.service';
import {Note} from './models/note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  public notes: Note[];
  public selectedNote: Note;
  public noteTitle: string;
  public noteDescription: string;
  public editMode = false;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.index().subscribe(notes => this.notes = notes);
  }

  save() {
    const note = new Note();
    note.title = this.noteTitle;
    note.description = this.noteDescription;

    this.noteService.store(note).subscribe(() =>
      this.fetchNotes()
    );
  }

  selectNote(note: Note) {
    this.selectedNote = new Note();
    this.selectedNote.id = note.id;
    this.selectedNote.title = note.title;
    this.selectedNote.description = note.description;
    this.editMode = true;
  }

  edit() {
    this.noteService.edit(this.selectedNote).subscribe(() =>
      this.fetchNotes()
    );
    this.editMode = false;
  }

  delete(id: number) {
    this.noteService.delete(id).subscribe(() =>
      this.fetchNotes()
    );
    this.editMode = false;
  }

  /**
   * Fetch notes from Api
   */
  fetchNotes() {
    this.noteService.index().subscribe(notes => this.notes = notes);
  }
}
