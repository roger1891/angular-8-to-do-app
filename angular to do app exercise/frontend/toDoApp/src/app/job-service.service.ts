import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

export interface Job {
  _id: string,
  name: string,
  description: string,
  status: string,
  done: boolean,
  date_created: string
}

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) {}

  //todoList.list_all_jobs
  listAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>('http://localhost:3000/jobs');
  };

  /*listAllJobs() {
    return this.http.get('http://localhost:3000/jobs');
  };*/

  //todoList.create_job
  createJob(job: Job): Observable<Job> {
    console.log("job posted" + job);
    return this.http.post<Job>('http://localhost:3000/jobs', job);
  };


  //todoList.read_job
  readJob(id: string): Observable<Job> {
    return this.http.get<Job>('http://localhost:3000/jobs/' + id);
  };

  //todoList.update_job
  updateJob(job: Job, result): Observable<void> {
    console.log("update: " + job._id)
    return this.http.put<void>('http://localhost:3000/jobs/' + job._id, result);
  }

  //todoList.delete_job
  deleteJob(id: string) {
    return this.http.delete<Job>('http://localhost:3000/jobs/' + id);
  }
}
