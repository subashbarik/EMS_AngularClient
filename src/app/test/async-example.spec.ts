// Jasmine done does the job but not good since we can not know howmuch time the
// async operation os going to take , hence giving the timeout value on the setTimeout

import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { delay, of } from 'rxjs';

// is problematic
describe('Async Testing Examples', () => {
  it('Asynchronous test example with Hasmine done()', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it('Asynchronous test example - setTimeout()', fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      test = true;
    }, 1000);
    //tick(1000);
    flush();
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - plain Promise()', fakeAsync(() => {
    let test = false;

    Promise.resolve().then(() => {
      test = true;
    });
    //tick(1000);
    flushMicrotasks();
    expect(test).toBeTruthy();
  }));

  it('Asynchronous test example - Promises + SeTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });
    //tick(1000);
    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    flush();
    expect(counter).toBe(11);
  }));

  it('Asynchronous test example - Observables', fakeAsync(() => {
    let test = false;
    const test$ = of(test).pipe(delay(1000));

    test$.subscribe({
      next: () => {
        test = true;
      },
    });
    //flush(); // Does not work
    // flushMicrotasks(); // Does not work
    tick(1000);
    expect(test).toBeTruthy();
  }));
});
