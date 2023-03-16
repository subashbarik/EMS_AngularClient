import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { TableService } from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  private selectedRowId: number;
  private formReset$ = this.coreService.formReset$;
  private formResetSubscription: Subscription;

  @Input() data!: any[];
  @ContentChild('headers') headers: TemplateRef<any> | undefined;
  @ContentChild('rows') rows: TemplateRef<any> | undefined;
  constructor(
    private tableService: TableService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.formResetSubscription = this.formReset$.subscribe((data) => {
      this.selectedRowId = -1;
    });
  }
  ngOnDestroy(): void {}

  rowClicked(id: number) {
    this.selectedRowId = id;
    this.tableService.onRowClicked(id);
  }
  rowDoubleClick(id: number) {
    this.selectedRowId = id;
    this.tableService.onRowDblClick(id);
  }
}
