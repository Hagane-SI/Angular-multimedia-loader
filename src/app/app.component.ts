import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-multimedia-loader';

  imageObject: File;
  videoObject: File;
  imageReader: FileReader;
  videoReader: FileReader;
  renderImageReader: FileReader;
  renderVideoReader: FileReader;
  mimeTypeImage: String;
  mimeTypeVideo: String;
  imageUrl: String;
  videoUrl: String;

  constructor() {

  }

  ngOnInit() {
    this.imageReader = new FileReader();
    this.videoReader = new FileReader();
    this.renderImageReader = new FileReader();
    this.renderVideoReader = new FileReader();
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    this.imageReader.onload = fileEvent => this.onFileLoading(fileEvent, this.imageReader, true);
    this.renderImageReader.onload = () => this.imageUrl = this.renderImageReader.result.toString();
    this.imageReader.readAsArrayBuffer(file.slice(0, 4));
    this.renderImageReader.readAsDataURL(file);
    this.imageObject = file;
    this.getFileProperties(this.imageObject);
  }

  onVideoSelect(event: any) {
    const file = event.target.files[0];
    this.videoReader.onload = fileEvent => this.onFileLoading(fileEvent, this.videoReader, false);
    this.renderVideoReader.onload = () => this.videoUrl = this.renderVideoReader.result.toString();
    this.videoReader.readAsArrayBuffer(file);
    this.renderVideoReader.readAsDataURL(file);
    this.videoObject = file;
    this.getFileProperties(this.videoObject);
  }

  onFileLoading(fileEvent: Event, reader: FileReader, isAnImage) {
    console.log('readerResult:', reader.result);
    console.log('fileEvent:', fileEvent);
    let arr = (new Uint8Array(<ArrayBuffer>(reader.result)));
    let header: String = '';
    for (let i = 0; i < arr.length; i++) {
      header += arr[i].toString(16);
    }
    header = header.toUpperCase();
    console.log('Hex Header:', header);
    console.log('Header Array', arr);
    if(isAnImage) {
      this.mimeTypeImage = this.getRealMimeType(header);
    } else {
      this.mimeTypeVideo = this.getRealMimeType(header);
    }
    console.log('Real MIME Type:', this.mimeTypeImage);
  }

  getFileProperties(file) {
    console.log('MIME type: ', file.type);
    console.log('Name: ', file.name);
    console.log('Size:', this.getSizeInKilobytes(file.size) + 'KB');
  }

  getSizeInKilobytes(size: number) {
    return (size / 1024).toFixed(2);
  }

  getSizeinMegabytes(size: number) {
    return (size / 1048576).toFixed(2);
  }

  getRealMimeType(header: String) {
    switch (header) {
      case '89504E47':
        return 'image/png';
      case '47494638':
        return 'image/gif';
      case '49492A00':
        return 'image/tif'
      case '4D4D002A':
        return 'image/tiff';
      case 'FFD8FFDB':
      case 'FFD8FFE0':
      case 'FFD8FFE1':
      case 'FFD8FFE2':
      case 'FFD8FFE3':
      case 'FFD8FFE8':
      case 'FFD8FFEE':
        return 'image/jpeg';
      case '3026B275':
        return 'video/wmv';
      case '4F676753':
        return 'audio/ogg';
      case '52494646':
        return 'video/avi';
      case '424D9626':
      case '424D5666':
      case '424D36B6':
      case '424D5EB2':
        return 'image/bmp';
      case '1A45DFA3':
        return 'video/Matroska';
      case '000001BA':
      case '000001B3':
        return 'video/mpeg';
      case '66747970':
      case '00020667':
        return 'video/mp4';
      default:
        return 'unknown';
    }
  }
}
