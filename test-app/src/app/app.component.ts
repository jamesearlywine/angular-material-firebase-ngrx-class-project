import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  onClickToggleSidenav($event) {
    if ($event && $event.srcElement) {
      const parentButton = $event.srcElement.closest('button');
      parentButton.blur();
    }
    this.sidenav.toggle();
  }

}
