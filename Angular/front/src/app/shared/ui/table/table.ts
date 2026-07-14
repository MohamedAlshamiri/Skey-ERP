import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SkeyTableColumn {
  key: string;
  title: string;
}

@Component({
  standalone: true,
  selector: 'skey-table',
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.scss',
})
export class SkeyTableComponent {
  @Input() data: any[] = [];
  @Input() columns: SkeyTableColumn[] = [];
  @Input() templates?: { [key: string]: TemplateRef<any> };

  hasActions(): boolean {
    return !!this.columns.find(col => col.key === 'actions') && !!this.templates?.['actions'];
  }
}
