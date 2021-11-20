import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomType } from 'src/app/shared/models/room';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
})
export class SearchDialogComponent {
  public readonly roomTypes= Object.values(RoomType)

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {form: FormGroup},
  ) {}

  getRoomTypeName(type: string): string {
    return { [RoomType.Action]: 'Veiksmo', [RoomType.Puzzle]: 'Galvosukių', [RoomType.Scare]: 'Siaubo',}[type as RoomType]
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close(this.data.form)
  }
}

