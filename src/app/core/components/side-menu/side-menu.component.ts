import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/state/account/account.selectors';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  public currentUser$ = this.store.select(selectUser);
  constructor(private store: Store) {}

  ngOnInit(): void {}
}
