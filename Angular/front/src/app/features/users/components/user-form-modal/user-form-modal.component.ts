import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CreateUserRequest, UpdateUserRequest, UserListDto } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { TenantService } from '../../../../core/services/tenant.service';
import { SkeyInputComponent } from '../../../../shared/ui/input/input';
import { SkeySelectComponent, SkeySelectOption } from '../../../../shared/ui/select/select';
import { SkeyButtonComponent } from '../../../../shared/ui/button/button';

export interface UserModalData {
  mode: 'create' | 'edit';
  user?: UserListDto | null;
}

@Component({
  selector: 'user-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SkeyInputComponent,
    SkeySelectComponent,
    SkeyButtonComponent
  ],
  templateUrl: './user-form-modal.component.html'
})
export class UserFormModalComponent implements OnInit {
  private modalRef = inject(NzModalRef);
  private modalData = inject<UserModalData>(NZ_MODAL_DATA, { optional: true });
  private usersService = inject(UsersService);
  private tenantService = inject(TenantService);
  private message = inject(NzMessageService);

  loading = false;
  userForm: FormGroup;

  get mode(): 'create' | 'edit' {
    return this.modalData?.mode ?? 'create';
  }

  get user(): UserListDto | null | undefined {
    return this.modalData?.user;
  }

  roleOptions: SkeySelectOption[] = [
    { label: 'مدير نظام', value: 'admin' },
    { label: 'محاسب', value: 'finance' },
    { label: 'مدير عمليات', value: 'operations' },
    { label: 'مبيعات', value: 'sales' },
    { label: 'دعم فني', value: 'support' }
  ];

  statusOptions: SkeySelectOption[] = [
    { label: 'نشط', value: 'active' },
    { label: 'غير نشط', value: 'inactive' }
  ];

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['admin', [Validators.required]],
      status: ['active', [Validators.required]],
      mobile: [''],
      department: ['']
    });
  }

  ngOnInit() {
    const passwordCtrl = this.userForm.get('password');
    if (this.mode === 'create') {
      passwordCtrl?.setValidators([Validators.required]);
    } else {
      passwordCtrl?.clearValidators();
    }
    passwordCtrl?.updateValueAndValidity();

    if (this.user) {
      this.userForm.patchValue(this.user);
      this.userForm.get('id')?.setValue(this.user.id);
      this.userForm.get('password')?.setValue('');
    } else {
      this.userForm.reset({ role: 'admin', status: 'active', password: '' });
    }
  }

  submit() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = this.userForm.getRawValue();

    if (this.mode === 'create') {
      const payload: CreateUserRequest = {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        role: formValue.role,
        status: formValue.status,
        mobile: formValue.mobile,
        department: formValue.department,
        tenantId: this.tenantService.tenantId() ?? 'default'
      };

      this.usersService.createUser(payload).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('تم إضافة المستخدم بنجاح');
          this.modalRef?.close('refresh');
        },
        error: () => {
          this.loading = false;
          this.message.error('فشل إضافة المستخدم');
        }
      });
    } else {
      const payload: UpdateUserRequest = {
        id: this.user!.id,
        name: formValue.name,
        email: formValue.email,
        role: formValue.role,
        status: formValue.status,
        mobile: formValue.mobile,
        department: formValue.department
      };

      this.usersService.updateUser(payload).subscribe({
        next: () => {
          this.loading = false;
          this.message.success('تم تعديل بيانات المستخدم بنجاح');
          this.modalRef?.close('refresh');
        },
        error: () => {
          this.loading = false;
          this.message.error('فشل تعديل بيانات المستخدم');
        }
      });
    }
  }

  onClose() {
    this.modalRef?.triggerCancel();
  }
}
