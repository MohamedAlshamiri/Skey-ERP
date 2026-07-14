import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  standalone: true,
  selector: 'skey-button',
  imports: [CommonModule, NzButtonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class SkeyButtonComponent {
  @Input() variant: 'primary' | 'default' | 'dashed' | 'danger' | 'link' = 'primary';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() size: 'lg' | 'md' | 'sm' = 'md';
  @Input() block = false;
  @Input() disabled = false;
  @Input() loading = false;

  get nzType(): 'primary' | 'default' | 'dashed' | 'link' {
    return this.variant === 'danger' ? 'default' : (this.variant as any);
  }

  get nzDanger(): boolean {
    return this.variant === 'danger';
  }

  get nzSize(): 'large' | 'default' | 'small' {
    return this.size === 'lg' ? 'large' : this.size === 'sm' ? 'small' : 'default';
  }
}
