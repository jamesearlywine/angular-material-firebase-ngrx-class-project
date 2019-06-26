import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as fromRoot from 'src/app/shared/store/app.reducers';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter<void>();

  isAuthenticated$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  closeSidenav() {
    this.sidenavClose.next();
  }

  onClickLogout() {
    this.authService.logout();
    this.closeSidenav();
  }
}
