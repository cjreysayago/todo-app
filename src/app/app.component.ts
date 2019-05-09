import {Component, OnInit} from '@angular/core';
import {NoteService} from './services/note.service';
import {Note} from './models/note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  public notes: Note[];
  public noteTitle: string;
  public noteDescription: string;

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.noteService.index().subscribe(notes => this.notes = notes);
  }

  save() {
    const note = new Note();
    note.title = this.noteTitle;
    note.description = this.noteDescription;

    this.noteService.store(note).subscribe();

    // Reload notes from server
    this.noteService.index().subscribe(notes => this.notes = notes);
  }
}
