import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
   @Output() fileEvent = new EventEmitter();
   selectedFile: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  onBasicUpload(event): void {
  	console.log(' *****FILE******* ' + event.files[0]);
    this.selectedFile = event.files[0];
  	this.fileEvent.emit(event.files[0]);
  }

  onUpload(event: any, fileUpload) {
    this.selectedFile = event.files[0];
    console.log(' *****FILE 1******* ');
    this.fileEvent.emit(event.files[0]);
    fileUpload.clear();
  }
}
