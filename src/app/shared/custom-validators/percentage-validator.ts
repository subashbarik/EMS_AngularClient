import { AbstractControl } from "@angular/forms";
export function PercentageValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  let ctlVal = control.value;
  if (ctlVal === null || ctlVal === "") {
    return null;
  }
  if (isNaN(Number(ctlVal.toString()))) {
    return { percentage: true };
  }
  if (ctlVal < 0 || ctlVal > 1) {
    return { percentage: true };
  }
  return null;
}
