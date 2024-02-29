import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ExternalApiComponent } from './pages/external-api/external-api.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { JenkinsComponent } from './pages/jenkins/jenkins.component';
import { JobComponent } from './jcomponents/job/job.component';
import { BuildComponent } from './jcomponents/build/build.component';
import { SettingsComponent } from './jcomponents/settings/settings.component';
import { ContactComponent } from './jcomponents/contact/contact.component';
import { AafreenComponent } from './accounts/aafreen/aafreen.component';
import { TestjenkinsComponent } from './accounts/testjenkins/testjenkins.component';
import { AafreenbuildComponent } from './accounts/aafreenbuild/aafreenbuild.component';
import { TestjenkinsbuildComponent } from './accounts/testjenkinsbuild/testjenkinsbuild.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'jenkins',
    component: JenkinsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'external-api',
    component: ExternalApiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'job',
    component: JobComponent,
  },
  {
    path: 'build',
    component: BuildComponent,
  },
  {
    path: 'aafreen',
    component: AafreenComponent,
  },
  {
    path: 'aafreenbuild',
    component: AafreenbuildComponent,
  },
  {
    path: 'testjenkins',
    component: TestjenkinsComponent,
  },
  {
    path: 'testjenkinsbuild',
    component: TestjenkinsbuildComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
