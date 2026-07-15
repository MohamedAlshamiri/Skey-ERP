import { Component } from '@angular/core';
import { PlaceholderPageComponent } from '../../shared/ui/placeholder-page/placeholder-page.component';

@Component({
  selector: 'settings-page',
  standalone: true,
  imports: [PlaceholderPageComponent],
  template: `<app-placeholder-page title="Settings" description="الإعدادات ستكون متاحة قريباً." />`
})
export class SettingsPageComponent {}
