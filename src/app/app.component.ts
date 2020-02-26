import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Recommender';

  constructor(private routeSvc: Router, public dialog: MatDialog) { }

  getView(option) {
    this.routeSvc.navigate([option]);
  }

  showAbout(): void {
    const dialogRef = this.dialog.open(AboutComponent, {
      width: '60%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }


}
