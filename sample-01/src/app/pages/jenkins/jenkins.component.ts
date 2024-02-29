import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jenkins',
  templateUrl: './jenkins.component.html',
  styleUrls: ['./jenkins.component.css']
})
export class JenkinsComponent {
  constructor(private router: Router) { }

  status = false;
  addToggle()
  {
   this.status = !this.status;       
  }

}
