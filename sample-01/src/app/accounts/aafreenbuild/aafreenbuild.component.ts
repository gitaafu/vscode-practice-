import { Component, OnInit } from '@angular/core';
import {  status } from 'src/app/classes/comments';
import { JenkinsService } from 'src/app/jenkins.service';
import { isJSDocMemberName } from 'typescript';

@Component({
  selector: 'app-aafreenbuild',
  templateUrl: './aafreenbuild.component.html',
  styleUrls: ['./aafreenbuild.component.css']
})
export class AafreenbuildComponent implements OnInit{

  constructor(private service: JenkinsService) {}
  ngOnInit(){
    this.countJobs();
    this.status();
    this.lastbuild(this.currentJobName);
    this.lastbuildstatus(this.currentJobName);
   
  }
  currentJobName: string = '';

  jobcount:any;
  lbnumber : any;
  lbstatus : any;
  
  jobs:status[];



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

  status()
  {
    this.service.status()
    .subscribe(
      (data)=>{
        this.jobs=data;
        this.currentJobName=data.name;
      }
    )
  }

  lastbuild(jobName: String){
    this.service.lastbuild(jobName)
    .subscribe(
      (data)=>
      {
        const keyToExtract1 = "number";
        this.lbnumber = { key1: keyToExtract1, value1: data[keyToExtract1]};
        
      }

    )


  }

  lastbuildstatus(jobName: String){
    this.service.lastbuildstatus(jobName)
    .subscribe(
      (data)=>
      {
        const keyToExtract1 = "status";
        this.lbstatus = { key1: keyToExtract1, value1: data[keyToExtract1]};
        
      }

    )


  }
}
