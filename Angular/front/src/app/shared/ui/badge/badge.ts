import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'skey-badge',
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
})
export class SkeyBadgeComponent {
  @Input() text = '';
  @Input() type: 'success' | 'error' | 'processing' | 'default' | 'warning' = 'default';
  @Input() showDot = true;
}
