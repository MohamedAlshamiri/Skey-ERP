import { Component } from '@angular/core';
import { PlaceholderPageComponent } from '../../shared/ui/placeholder-page/placeholder-page.component';

@Component({
  selector: 'reports-page',
  standalone: true,
  imports: [PlaceholderPageComponent],
  template: `<app-placeholder-page title="Reports" description="التقارير ستكون متاحة قريباً." />`
})
export class ReportsPageComponent {}
