import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input!: ElementRef;
  @Input() firstOptionText = 'Select an option';
  @Input() dataList: any;
  @Input() label = 'string';
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }
  onChange(event: any) {}
  onTouched() {}
  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control!.validator ? [control!.validator] : [];
    const asyncValidators = control!.asyncValidator
      ? [control!.asyncValidator]
      : [];

    control!.setValidators(validators);
    control!.setAsyncValidators(asyncValidators);
    control!.updateValueAndValidity();
  }
}
