import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto px-6 py-8" dir="rtl">
      <h2 class="text-[26px] font-black text-[#0f2963] tracking-tight m-0">{{ title }}</h2>
      <p class="mt-1 text-sm text-slate-500 m-0">{{ description }}</p>
    </div>
  `
})
export class PlaceholderPageComponent {
  @Input() title = 'قريباً';
  @Input() description = 'هذه الصفحة قيد التطوير.';
}
