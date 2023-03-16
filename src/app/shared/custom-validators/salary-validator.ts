import { AbstractControl } from '@angular/forms';
export function SalaryValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  let ctlVal = control.value;
  if (ctlVal === null || ctlVal === '') {
    return null;
  }
  if (isNaN(Number(ctlVal.toString()))) {
    return { salary: true };
  }
  if (ctlVal < 0 || ctlVal > 10000) {
    return { salary: true };
  }
  return null;
}
