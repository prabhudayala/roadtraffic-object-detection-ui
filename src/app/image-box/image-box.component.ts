import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';

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
  constructor(private formBuilder: FormBuilder, private appSvc: AppService) { }

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
        this.appSvc.openSnackBar({ msg: 'Upload Successful', type: 'SUCCESS' });
      }, 800);
    }, error => {
      console.log(error);
      this.uploading = false;

      this.appSvc.openSnackBar({ msg: 'Upload Failed', type: 'ERROR' });
    })
  }

}
