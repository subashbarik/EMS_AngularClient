import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unknown-error',
  templateUrl: './unknown-error.component.html',
  styleUrls: ['./unknown-error.component.scss'],
})
export class UnknownErrorComponent implements OnInit {
  public errorMsg: string;
  public statusText: string;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

    this.errorMsg =
      navigation &&
      navigation.extras &&
      navigation.extras.state &&
      navigation.extras.state['errorMsg'];

    this.statusText =
      navigation &&
      navigation.extras &&
      navigation.extras.state &&
      navigation.extras.state['statusText'];
  }

  ngOnInit(): void {}
}
