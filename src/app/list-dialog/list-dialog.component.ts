import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css']
})
export class ListDialogComponent implements OnInit {
  form: FormGroup
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public requestData) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      listName: ['', Validators.required]
    })
    if (this.requestData.body) {
      this.form.patchValue({
        listName: this.requestData.body
      })
    }
  }
  onSubmit() {
    this.dialogRef.close(this.form.value);
  }
  cancel() {
    this.dialogRef.close()
  }

}
