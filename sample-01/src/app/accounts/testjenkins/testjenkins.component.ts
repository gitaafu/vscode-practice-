import { Component, OnInit } from '@angular/core';
import { JenkinsService } from 'src/app/jenkins.service';

@Component({
  selector: 'app-testjenkins',
  templateUrl: './testjenkins.component.html',
  styleUrls: ['./testjenkins.component.css']
})
export class TestjenkinsComponent implements OnInit {

  constructor(private service: JenkinsService) {}
  
  ngOnInit() {
    this.fetchtheJobs();
    this.counttheJobs();
  }

  jobs:Comment[];
  jobcount:any;
  
  fetchtheJobs() {
    this.service.fetchtheJobs()
    .subscribe(
      data=>
      {
        this.jobs=data;
      }
    )
  }

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


}
