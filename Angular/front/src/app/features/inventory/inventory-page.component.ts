import { Component } from '@angular/core';
import { PlaceholderPageComponent } from '../../shared/ui/placeholder-page/placeholder-page.component';

@Component({
  selector: 'inventory-page',
  standalone: true,
  imports: [PlaceholderPageComponent],
  template: `<app-placeholder-page title="Inventory" description="إدارة المخزون ستكون متاحة قريباً." />`
})
export class InventoryPageComponent {}
