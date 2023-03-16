import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private rowClickedSubject = new BehaviorSubject<number>(-1);
  private rowDblClickedSubject = new Subject<number>();
  public rowClicked$ = this.rowClickedSubject.asObservable();
  public rowDblClicked$ = this.rowDblClickedSubject.asObservable();
  constructor() {}
  onRowClicked(id: number) {
    this.rowClickedSubject.next(id);
  }
  onRowDblClick(id: number) {
    this.rowDblClickedSubject.next(id);
  }
}
