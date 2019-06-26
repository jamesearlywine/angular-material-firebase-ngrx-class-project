import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/shared/store/app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  toggleSidenav($event) {
    if ($event && $event.srcElement) {
      const parentButton = $event.srcElement.closest('button');
      parentButton.blur();
    }
    this.sidenavToggle.next();
  }

  onClickLogout() {
    this.authService.logout();
  }

}
