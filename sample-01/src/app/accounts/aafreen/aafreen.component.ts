import { Component, OnInit } from '@angular/core';
import { comments } from 'src/app/classes/comments';
import { JenkinsService } from 'src/app/jenkins.service';

@Component({
  selector: 'app-aafreen',
  templateUrl: './aafreen.component.html',
  styleUrls: ['./aafreen.component.css']
})
export class AafreenComponent implements OnInit{
  

  constructor(private service: JenkinsService) {}
  
  ngOnInit() {
    this.fetchJobs();
    this.countJobs();
  }

  jobs:comments[];
  jobcount:any;
  
  fetchJobs() {
    this.service.fetchJobs()
    .subscribe(
      data=>
      {
        this.jobs=data;
      }
    )
  }

  countJobs()
  {
    this.service.CountJobs()
    .subscribe(
      (data)=>
      {
        const keyToExtract = "count";
        this.jobcount = { key: keyToExtract, value: data[keyToExtract]  };
      }
    )
  }

}
