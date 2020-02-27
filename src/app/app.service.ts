import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from './notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  imageUrl = 'http://localhost:5000/upload/image'
  videoUrl = 'http://localhost:5000/upload/video'

  constructor(private httpCli: HttpClient, private _snackBar: MatSnackBar) { }

  uploadImage(imageData): Observable<any> {
    return this.httpCli.post(this.imageUrl, imageData);
  }

  uploadVideo(videoData): Observable<any> {
    return this.httpCli.post(this.videoUrl, videoData);
  }

  openSnackBar(sendData) {
    this._snackBar.openFromComponent(NotifierComponent, {
      duration: 5 * 1000,
      data: sendData
    });
  }
}
