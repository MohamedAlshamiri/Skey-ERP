import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersHeaderComponent } from './components/users-header/users-header.component';
import { UsersFilterComponent } from './components/users-filter/users-filter.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserFormModalComponent } from './components/user-form-modal/user-form-modal.component';
import { SkeyPaginationComponent } from '../../shared/ui/pagination/pagination';
import { UsersService } from './services/users.service';
import { UserListDto, CreateUserRequest, UpdateUserRequest } from './models/user.model';
import { UserFilterState } from './models/user-filter-state.model';
import { TenantService } from '../../core/services/tenant.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'users-page',
  standalone: true,
  imports: [
    CommonModule,
    UsersHeaderComponent,
    UsersFilterComponent,
    UsersTableComponent,
    SkeyPaginationComponent
  ],
  templateUrl: './users-page.component.html'
})
export class UsersPageComponent {
  private usersService = inject(UsersService);
  private tenantService = inject(TenantService);
  private modalService = inject(NzModalService);

  allFilteredUsers = signal<UserListDto[]>([]);

  private filterState = signal<UserFilterState>({
    query: '',
    page: 1,
    pageSize: 5
  });

  users = computed(() => {
    const page = this.filterState().page;
    const pageSize = this.filterState().pageSize;
    const startIndex = (page - 1) * pageSize;
    return this.allFilteredUsers().slice(startIndex, startIndex + pageSize);
  });

  get currentPage(): number {
    return this.filterState().page;
  }

  get pageSize(): number {
    return this.filterState().pageSize;
  }

  get totalUsers(): number {
    return this.allFilteredUsers().length;
  }

  constructor() {
    this.loadUsers();
  }

  openCreate() {
    const modalRef = this.modalService.create({
      nzTitle: 'إضافة مستخدم جديد',
      nzContent: UserFormModalComponent,
      nzData: {
        mode: 'create',
        user: null
      },
      nzFooter: null,
      nzWidth: 500,
      nzCentered: true,
      nzMaskClosable: false,
      nzKeyboard: false,
      nzOnCancel: (instance) => {
        if (instance && instance.userForm && instance.userForm.dirty) {
          return new Promise<boolean>((resolve) => {
            this.modalService.confirm({
              nzTitle: 'تأكيد المغادرة',
              nzContent: 'هل أنت متأكد من مغادرة هذه الصفحة؟ سيتم فقدان التغييرات غير المحفوظة.',
              nzOkText: 'مغادرة',
              nzCancelText: 'بقاء',
              nzOkDanger: true,
              nzOnOk: () => resolve(true),
              nzOnCancel: () => resolve(false),
            });
          });
        }
        return true;
      },
      nzClassName: 'rounded-modal-wrapper',
    });

    modalRef.afterClose.subscribe((r) => {
      if (r === 'refresh') {
        this.loadUsers();
      }
    });
  }

  openEdit(user: UserListDto) {
    const modalRef = this.modalService.create({
      nzTitle: 'تعديل بيانات المستخدم',
      nzContent: UserFormModalComponent,
      nzData: {
        mode: 'edit',
        user: user
      },
      nzFooter: null,
      nzWidth: 500,
      nzCentered: true,
      nzMaskClosable: false,
      nzKeyboard: false,
      nzOnCancel: (instance) => {
        if (instance && instance.userForm && instance.userForm.dirty) {
          return new Promise<boolean>((resolve) => {
            this.modalService.confirm({
              nzTitle: 'تأكيد المغادرة',
              nzContent: 'هل أنت متأكد من مغادرة هذه الصفحة؟ سيتم فقدان التغييرات غير المحفوظة.',
              nzOkText: 'مغادرة',
              nzCancelText: 'بقاء',
              nzOkDanger: true,
              nzOnOk: () => resolve(true),
              nzOnCancel: () => resolve(false),
            });
          });
        }
        return true;
      },
      nzClassName: 'rounded-modal-wrapper',
    });

    modalRef.afterClose.subscribe((r) => {
      if (r === 'refresh') {
        this.loadUsers();
      }
    });
  }

  onFilterChange(change: Partial<UserFilterState>) {
    this.filterState.update((current) => ({ ...current, ...change }));
    this.loadUsers();
  }

  onPageChange(page: number) {
    this.filterState.update((current) => ({ ...current, page }));
  }

  removeUser(userId: string) {
    this.usersService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  private loadUsers() {
    this.usersService.getUsers(this.filterState()).subscribe((data) => {
      this.allFilteredUsers.set(data);
    });
  }
}
