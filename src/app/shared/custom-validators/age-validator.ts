import { AbstractControl } from '@angular/forms';
export function AgeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  let ctlVal = control.value;
  if (ctlVal === null || ctlVal === '') {
    return null;
  }
  if (isNaN(Number(ctlVal.toString()))) {
    return { age: true };
  }
  if (ctlVal % 1 !== 0) {
    return { age: true };
  }
  if (ctlVal < 20 || ctlVal > 80) {
    return { age: true };
  }
  return null;
}
