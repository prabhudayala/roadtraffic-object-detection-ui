import { Component, OnInit, ViewChild } from '@angular/core';
import { WindowRef } from '../windowRef';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-live-box',
  templateUrl: './live-box.component.html',
  styleUrls: ['./live-box.component.scss']
})
export class LiveBoxComponent implements OnInit {
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('myCanvas') myCanvas: any;
  @ViewChild('myRepCanvas') myRepCanvas: any;
  public context: CanvasRenderingContext2D;
  public repContext: CanvasRenderingContext2D;
  video: any;
  allTracks: any;
  startStream = false;
  streamCall;

  constructor(private winRef: WindowRef, private socket: Socket) { }

  ngOnInit(): void {
    this.socket.on('replay', this.showReplay);
  }


  streamVideo(item) {
    if (item) {
      this.video = this.videoElement.nativeElement;
      this.initCamera({ video: true, audio: false });
      this.startStream = true;
    } else {
      this.allTracks[0].stop();
      this.socket.emit('disconnect');
      this.stopStream();
    }
  }

  initCamera(config: any) {
    let browser: any = this.winRef.nativeWindow.navigator;
    let local = this;
    console.log(browser)

    browser.getUserMedia = (browser.getUserMedia || browser.webkitGetUserMedia || browser.mozGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      let streamData = new MediaStream(stream);
      this.socket.emit("message", 'Wango');
      console.log(stream);
      local.video.srcObject = stream;
      local.video.play();
      local.allTracks = stream.getTracks();

      // this.socket.emit('stream', stream);
      // this.socket.emit('stream', local.video.toDataURL('image/webp'));
      this.sendStreamData();
    }, err => {
      console.log('ERR', err);
    })
  }

  getFrame = () => {
    this.myCanvas.width = this.video.videoWidth;
    this.myCanvas.height = this.video.videoHeight;

    let htmlelement = <HTMLCanvasElement>this.myCanvas.nativeElement;
    this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
    this.context.drawImage(this.video, 0, 0);
    console.log(this.myCanvas);
    console.log(this.context);
    const data = htmlelement.toDataURL('image/png');
    return data;
  }

  sendStreamData = () => {
    if (this.startStream) {
      this.streamCall = setInterval(() => {
        this.socket.emit('stream', this.getFrame())
      }, 500);
    }
  }

  stopStream = () => {
    if (this.startStream) {
      clearInterval(this.streamCall);
      this.startStream = false;
    }
  }

  showReplay = (data) => {
    console.log('REPLAY');
    this.myRepCanvas.width = this.video.videoWidth;
    this.myRepCanvas.height = this.video.videoHeight;
    let htmlelement = <HTMLCanvasElement>this.myRepCanvas.nativeElement;
    this.repContext = (<HTMLCanvasElement>this.myRepCanvas.nativeElement).getContext('2d');
    let image = new Image();
    image.onload = () => {
      this.repContext.drawImage(image, 0, 0);
    };
    image.src = data;
  }

}
