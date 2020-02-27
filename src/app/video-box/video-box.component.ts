import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-video-box',
  templateUrl: './video-box.component.html',
  styleUrls: ['./video-box.component.scss']
})
export class VideoBoxComponent implements OnInit {
  videoForm;
  selectedFile;
  fileSelect;
  videoFormData = new FormData();
  uploading = false;
  allowUpload = false;
  constructor(private formBuilder: FormBuilder, private appSvc: AppService) { }

  ngOnInit(): void {
    this.videoForm = this.formBuilder.group({
      fileData: ['']
    });
  }

  onSelectFile(files: FileList) {
    this.fileSelect = files.item(0).name;
    this.selectedFile = files.item(0);
    this.allowUpload = true;
  }

  uploadFiles(): Subscription {
    this.uploading = true;
    this.videoFormData.append('file', this.selectedFile, this.fileSelect);
    return this.appSvc.uploadVideo(this.videoFormData).subscribe(event => {
      this.videoFormData = new FormData();
      console.log(event);
      this.uploading = false;
      setTimeout(() => {
        this.uploading = false;
        this.appSvc.openSnackBar({ msg: 'Upload Successful', type: 'SUCCESS' });
      }, 800);
    }, error => {
      console.log(error);
      this.uploading = false;
      this.appSvc.openSnackBar({ msg: 'Upload Failed', type: 'ERROR' });
    })
  }
}
