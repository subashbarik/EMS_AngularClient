import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import { environment } from 'src/environments/environment';
// const envTimeDelay = 1000;
// export function genericApiRetrySetting(
//   maxRetryCount?: number,
//   timeDelay?: number
// ) {
//   maxRetryCount = maxRetryCount ? maxRetryCount : environment.apiRetryCount;
//   this.envTimeDelay = timeDelay ? timeDelay : envTimeDelay;
//   return { count: maxRetryCount, delay: genericApiRetryHandler };
// }
// export function genericApiRetryHandler(error: HttpErrorResponse) {
//   if (error.status === 0 || error.status > 500) {
//     return timer(envTimeDelay);
//   }
//   this.envTimeDelay = environment.apiRetryDelay;
//   throw error;
// }
export function genericApiRetrySetting() {
  return { count: environment.apiRetryCount, delay: genericApiRetryHandler };
}
export function genericApiRetryHandler(error: HttpErrorResponse) {
  if (error.status === 0 || error.status > 500) {
    return timer(environment.apiRetryDelay);
  }
  throw error;
}
