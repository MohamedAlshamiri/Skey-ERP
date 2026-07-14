import { Component, EventEmitter, Input, Output, forwardRef, HostListener, ElementRef, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface SkeySelectOption {
  label: string;
  value: any;
}

@Component({
  standalone: true,
  selector: 'skey-select',
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SkeySelectComponent),
      multi: true
    }
  ]
})
export class SkeySelectComponent implements ControlValueAccessor, OnChanges {
  private elRef = inject(ElementRef);

  @Input() label?: string;
  @Input() placeholder = '';
  @Input() options: SkeySelectOption[] = [];
  @Input() allowClear = true;
  @Input() disabled = false;
  @Input() mode: 'default' | 'multiple' | 'tags' = 'default';

  /** Supports direct [value] binding (non-form usage) */
  @Input() set value(val: any) {
    this._value = val ?? null;
  }

  @Output() valueChange = new EventEmitter<any>();

  _value: any = null;
  isOpen = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    // Sync direct [value] input changes to internal state
    if (changes['value'] && !changes['value'].isFirstChange()) {
      this._value = changes['value'].currentValue ?? null;
    }
  }

  get selectedLabel(): string {
    if (this._value === null || this._value === undefined || this._value === '') return '';
    const found = this.options.find(o => o.value === this._value);
    return found ? found.label : '';
  }

  get hasValue(): boolean {
    return this._value !== null && this._value !== undefined && this._value !== '';
  }

  // ─── ControlValueAccessor ───────────────────────────────────────
  writeValue(value: any): void {
    this._value = value ?? null;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  // ────────────────────────────────────────────────────────────────

  toggleDropdown() {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
    if (this.isOpen) this.onTouched();
  }

  selectOption(opt: SkeySelectOption) {
    this._value = opt.value;
    this.isOpen = false;
    this.valueChange.emit(opt.value);
    this.onChange(opt.value);
    this.onTouched();
  }

  clearValue(event: MouseEvent) {
    event.stopPropagation();
    this._value = null;
    this.isOpen = false;
    this.valueChange.emit(null);
    this.onChange(null);
    this.onTouched();
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: MouseEvent) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
