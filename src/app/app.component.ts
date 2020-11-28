import { Component, Inject } from '@angular/core';
import { Track, Task } from './shared/Track.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListDialogComponent } from './list-dialog/list-dialog.component';
import { CardDialogComponent } from './card-dialog/card-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-drag-drop';
  public tracks: Track[] = [
    {
      "title": "List1",
      "id": "List1",
      "tasks": [
        {
          "id": "Card1",
          "title": "Card1",
          "description": "This is my first List1"
        }
      ]
    },
    {
      "title": "List2",
      "id": "List2",
      "tasks": [
        {
          "id": "card1",
          "title": "card1",
          "description": "This is my first card1"
        }
      ]
    },
    {
      "title": "List3",
      "id": "List3",
      "tasks": [
        {
          "id": "card1",
          "title": "card1",
          "description": "This is my first card1"
        }
      ]
    },
    {
      "title": "List4",
      "id": "List4",
      "tasks": [
        {
          "id": "card1",
          "title": "card1",
          "description": "This is my first card1"
        }
      ]
    }
  ];
  constructor(public dialog: MatDialog) {

  }
  get trackIds(): string[] {
    return this.tracks.map(track => track.id);
  }
  addList() {
    const ListdialogRef = this.dialog.open(ListDialogComponent, {
      width: '500px',
      height: '300px',
      data: {}
    });

    ListdialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.tracks.push({
        title: result.listName,
        id: result.listName,
        tasks: []
      })
    });
  }
  addCard(listId, card?) {
    console.log(listId);
    const cardDialogRef = this.dialog.open(CardDialogComponent, {
      width: '500px',
      height: '300px',
      data: { header: card, body: !card ? {} : card }
    });

    cardDialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log(listId);
      if (result) {
        if (listId && !card) {
          const getListIndex = this.tracks.findIndex(data => data.id == listId)
          this.tracks[getListIndex].tasks.push({
            title: result.title,
            description: result.description,
            id: result.title
          })
        } else if (listId && card) {
          const getListIndex = this.tracks.findIndex(data => data.id == listId)
          const getCardIndex = this.tracks[getListIndex].tasks.findIndex(data => data.id == card.id);
          this.tracks[getListIndex].tasks[getCardIndex].description = result.description;
          this.tracks[getListIndex].tasks[getCardIndex].title = result.title;
        }
      }
    });
  }
  delete(listId, cardId) {
    if (listId && cardId) {
      const getListIndex = this.tracks.findIndex(data => data.id == listId)
      const getCardIndex = this.tracks[getListIndex].tasks.findIndex(data => data.id == cardId);
      this.tracks[getListIndex].tasks.splice(getCardIndex, 1);
    }
  }
  deleteList(listId) {
    if (listId) {
      const getListIndex = this.tracks.findIndex(data => data.id == listId)
      this.tracks.splice(getListIndex,1);
    }
  }
  onTalkDrop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onTrackDrop(event: CdkDragDrop<Track[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
