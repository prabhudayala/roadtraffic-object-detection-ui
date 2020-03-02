import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-box',
  templateUrl: './image-box.component.html',
  styleUrls: ['./image-box.component.scss']
})
export class ImageBoxComponent implements OnInit {
  imageForm;
  selectedFile;
  fileSelect;
  imageFormData = new FormData();
  uploading = false;
  allowUpload = false;
  displayOutput = false;
  outputImage;
  public context: CanvasRenderingContext2D;

  constructor(private formBuilder: FormBuilder, private appSvc: AppService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
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
    this.imageFormData.append('file', this.selectedFile, this.fileSelect);
    return this.appSvc.uploadImage(this.imageFormData).subscribe(event => {
      this.imageFormData = new FormData();
      console.log(event);
      setTimeout(() => {
        this.uploading = false;
        this.displayOutput = true;
        this.appSvc.openSnackBar({ msg: 'Upload Successful', type: 'SUCCESS' });
        this.showOutput(event.data);
      }, 800);
    }, error => {
      console.log(error);
      this.uploading = false;
      this.appSvc.openSnackBar({ msg: 'Upload Failed', type: 'ERROR' });
    })
  }

  showOutput = (data) => {
    let image = data.split('\'')[1];
    this.outputImage = 'data:image/jpeg;base64,' + image;
  }

}
