import { Component, OnInit } from '@angular/core';
import {  status } from 'src/app/classes/comments';
import { JenkinsService } from 'src/app/jenkins.service';

@Component({
  selector: 'app-testjenkinsbuild',
  templateUrl: './testjenkinsbuild.component.html',
  styleUrls: ['./testjenkinsbuild.component.css']
})
export class TestjenkinsbuildComponent implements OnInit {

  constructor(private service: JenkinsService) {}


  name :String;
  ngOnInit(){
    this.counttheJobs();
    this.tstatus();
   
  }

  jobcount:any;
  lbnumber : any;
  lbstatus : any;
  
  jobs:status[];



  counttheJobs()
  {
    this.service.CounttheJobs()
    .subscribe(
      (data)=>
      {
        const keyToExtract = "count";
        this.jobcount = { key: keyToExtract, value: data[keyToExtract]  };
      }
    )
  }

  tstatus()
  {
    this.service.tstatus()
    .subscribe(
      (data)=>{
        this.jobs=data;
      }
    )
  }

  tlastbuild(jobName: String){
    this.service.tlastbuild(jobName)
    .subscribe(
      (data)=>
      {
        const keyToExtract1 = "number";
        this.lbnumber = { key1: keyToExtract1, value1: data[keyToExtract1]};
        
      }

    )


  }

  tlastbuildstatus(jobName: String){
    this.service.tlastbuildstatus(jobName)
    .subscribe(
      (data)=>
      {
        const keyToExtract1 = "status";
        this.lbstatus = { key1: keyToExtract1, value1: data[keyToExtract1]};
        
      }

    )


  }

}
