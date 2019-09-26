import { Component } from '@angular/core';
import { Job, JobService } from './job-service.service';
import { map, filter } from 'rxjs/operators';
import { JobEntryDialog } from './create-job/create-job.component';
import { MatDialog } from '@angular/material/dialog';
import {formatDate} from '@angular/common';
import { create } from 'domain';

export interface DialogData {
  id: string,
  name: string,
  description: string,
  status: string,
  done: boolean,
  date_created: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To Do App';

  //api endpoints
  allJobs : any;
  result : any;

  //panel state
  panelOpenState = false;

  //modal
  id: string;
  name: string;
  description: string;
  status: string;
  done: boolean;
  date_created: string;

  constructor(private jobService: JobService, public dialog: MatDialog) {}
  ngOnInit(){
    //REST API ENDPOINTS
    //display all jobs
    this.showAllJobs();
  }

  //modal
  openDialog(): void {
    //reset fields
    this.name = "";
    this.description = "";
    this.status = "";

    const dialogRef = this.dialog.open(JobEntryDialog, {
      width: '250px',
      data: {
        name: this.name,
        description: this.description,
        status: this.status,
        date_created: this.date_created,
        
       }
    });
    
    //close on name based on mat-dialog-close value in html file
    //result comes from job entry dialog mat-dialog-close button
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.name = result.name;
      this.description = result.description;
      this.status = result.status;
      //this.date_created = formatDate(new Date(), 'yyyy/MM/dd hh:mm', 'en');
      
      //create job
      this.createJob(result);
    });
  }


  //the access control allow origin header has a value that is not equal to the supplied origin 
  //all jobs
  showAllJobs(){
    this.jobService.listAllJobs().subscribe((data) =>{
      console.log(data);
      
      this.allJobs= data
      
    });    
  }
  //create a job
  createJob(job) {
    //connect to endpoint
    this.jobService.createJob(job).subscribe(
      response => {
        console.log(response)
        //refresh list with database data
        this.showAllJobs()
      },
      err => console.log(err)
    );
    
  }    
  //delete job
  deleteJob(jobId) {
    this.jobService.deleteJob(jobId).subscribe(
      response => {
        console.log(response)
        //refresh list with database data
        this.showAllJobs()
      },
      err => console.log(err)
    );
  };
  //update job
  updateJob(job, result) {
    this.jobService.updateJob(job, result).subscribe(
      response => {
        console.log(job)
        //refresh list with database data
        this.showAllJobs()
      },
      err => console.log(err)
    );
  };
  readJob(job) {
    this.jobService.readJob(job).subscribe(
      response => {
        console.log(job)
        //refresh list with database data
        this.showAllJobs()
      },
      err => console.log(err)
    );
  };


  //display jobs by status
  doneJob(job){
    if(job.status == "done"){
      return true;
    }

    return false;
  }

  notDoneJob(job){
    if(job.status == "doing" || job.status == "todo"){
      return true;
    }

    return false;
  }

  //buttons
  deleteButtonClick(jobId){
    //won't collapse & expand expansion panel at will
    //delete job by id
    this.deleteJob(jobId);
  }

  updateButtonClick(job){
    this.openDialogEdit(job);     
  }

  doneButtonClick(job){
    this.result = {
      status: "done"
    }
    //single out 1 job
    this.updateJob(job, this.result);
  }
  //update dialog
  openDialogEdit(job): void {
    const dialogRef = this.dialog.open(JobEntryDialog, {
      width: '250px',
      data: {
        name: job.name,
        description: job.description,
        status: job.status,
        
       }
    });

    //close on name based on mat-dialog-close value in html file
    //result comes from job entry dialog mat-dialog-close button
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.name = result.name;
      this.description = result.description;
      this.status = result.status;
      
      //update job by id
      //job: for id
      //result: for changed values
      this.updateJob(job, result);   
      //back to default
      
    });  
  }
}
