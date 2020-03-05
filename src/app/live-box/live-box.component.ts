import { Component, OnInit, ViewChild } from '@angular/core';
import { WindowRef } from '../windowRef';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-live-box',
  templateUrl: './live-box.component.html',
  styleUrls: ['./live-box.component.scss']
})
export class LiveBoxComponent implements OnInit {

  hitUrl = '';

  constructor(private winRef: WindowRef, private socket: Socket) { }

  ngOnInit(): void {

  }

  streamVideo(run) {
    if (run) {
      this.hitUrl = 'http://localhost:5000/video_feed';
    } else {
      this.hitUrl = '';
    }
  }


}
