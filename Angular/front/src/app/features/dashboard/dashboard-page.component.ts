import { Component } from '@angular/core';
import { LandingPageComponent } from '../landing/landing-page.component';

@Component({
  selector: 'dashboard-page',
  standalone: true,
  imports: [LandingPageComponent],
  template: `<app-landing-page embedded />`
})
export class DashboardPageComponent {}
