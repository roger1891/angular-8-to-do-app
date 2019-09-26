import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string,
  description: string,
  status: Array<string>,
  date_created: string
}

export interface SelectData {
  key:string,
  value: string
}

@Component({
  selector: 'job-entry-dialog',
  templateUrl: './job-entry-dialog.component.html',
})
export class JobEntryDialog {

  constructor(
    public dialogRef: MatDialogRef<JobEntryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectData: SelectData[] = [
    {key: 'todo', value: 'To do'},
    {key: 'doing', value: 'Doing'},
    {key: 'done', value: 'Done'}
  ];

}

