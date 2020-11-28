import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements OnInit {

  form: FormGroup
  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public requestData) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
    if (this.requestData.body) {
      this.form.patchValue({
        title: this.requestData.body.title,
        description:this.requestData.body.description
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
