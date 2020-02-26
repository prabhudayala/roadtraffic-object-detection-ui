import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.imageForm = this.formBuilder.group({
      fileData: ['']
    });
  }

  onSelectFile(files: FileList) {
    this.fileSelect = files.item(0).name;
    this.selectedFile = files.item(0);
  }

  uploadFiles(): Subscription {
    this.uploading = true;
    this.imageFormData.append('file', this.selectedFile, this.fileSelect);
    return this.httpClient.post('http://localhost:5000', this.imageFormData).subscribe(event => {
      this.imageFormData = new FormData();
      console.log(event);
      this.uploading = false;
    }, error => {
      console.log(error);
      this.uploading = false;
    })


  }

}
