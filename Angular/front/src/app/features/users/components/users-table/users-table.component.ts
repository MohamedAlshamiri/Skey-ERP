import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListDto } from '../../models/user.model';

@Component({
  selector: 'users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent {
  @Input() users: UserListDto[] = [];
  @Output() edit = new EventEmitter<UserListDto>();
  @Output() delete = new EventEmitter<UserListDto>();

  getRoleLabel(role: UserListDto['role']): string {
    const labels: Record<UserListDto['role'], string> = {
      admin: 'مدير نظام',
      finance: 'محاسب',
      operations: 'مدير عمليات',
      sales: 'مبيعات',
      support: 'دعم فني'
    };
    return labels[role] ?? role;
  }

  getAvatarClass(name: string): string {
    const classes = [
      'bg-[#eef2ff] text-[#4f46e5]', // Indigo
      'bg-[#dcfce7] text-[#15803d]', // Green
      'bg-[#fee2e2] text-[#b91c1c]', // Red
      'bg-[#fef9c3] text-[#a16207]', // Yellow
      'bg-[#ecfeff] text-[#0891b2]', // Cyan
      'bg-[#faf5ff] text-[#7e22ce]', // Purple
      'bg-[#fff1f2] text-[#be123c]'  // Rose
    ];
    const index = name.charCodeAt(0) % classes.length;
    return classes[index];
  }

  getRoleClass(role: UserListDto['role']): string {
    const classes: Record<UserListDto['role'], string> = {
      admin: 'bg-[#eef2ff] text-[#4f46e5]', // lavender/indigo
      finance: 'bg-[#f1f5f9] text-[#475569]', // gray
      operations: 'bg-[#f1f5f9] text-[#475569]', // gray
      sales: 'bg-[#f1f5f9] text-[#475569]',
      support: 'bg-[#f1f5f9] text-[#475569]'
    };
    return classes[role] ?? 'bg-[#f1f5f9] text-[#475569]';
  }
}

