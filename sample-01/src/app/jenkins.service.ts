import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JenkinsService {
  private aafubaseUrl = 'http://localhost:3000/aafu';
  private testjenkinsbaseUrl = 'http://localhost:3000/testjenkins';

  constructor(private http: HttpClient) {}

  fetchJobs(): Observable<any> {
    return this.http.get(`${this.aafubaseUrl}/jobDetails`);
  }

  CountJobs(): Observable<any> {
    return this.http.get(`${this.aafubaseUrl}/jobcount`);
  }

  status(): Observable<any> {
    return this.http.get(`${this.aafubaseUrl}/jobstatus`);

  }

  lastbuild(jobName:String):Observable<any>{
    return this.http.get(`${this.aafubaseUrl}/${jobName}`)
  }

  lastbuildstatus(jobName:String):Observable<any>{
    return this.http.get(`${this.aafubaseUrl}/${jobName}`)
  }
  tlastbuildstatus(jobName:String):Observable<any>{
    return this.http.get(`${this.testjenkinsbaseUrl}/${jobName}`)
  }
  tlastbuild(jobName:String):Observable<any>{
    return this.http.get(`${this.testjenkinsbaseUrl}/${jobName}`)
  }
  tstatus(): Observable<any> {
    return this.http.get(`${this.testjenkinsbaseUrl}/jobstatus`);
  }
  
  fetchtheJobs(): Observable<any> {
    return this.http.get(`${this.testjenkinsbaseUrl}/jobDetails`);
  }

  CounttheJobs(): Observable<any> {
    return this.http.get(`${this.testjenkinsbaseUrl}/jobcount`);
  }
}