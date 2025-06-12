import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-avenant-retrait',
  templateUrl: './new-avenant-retrait.component.html',
  styleUrls: ['./new-avenant-retrait.component.scss']
})
export class NewAvenantRetraitComponent implements OnInit {

  displayChoose = false;
  displayFileChoose = false;
  displayWriteChoose = false;

  constructor() { }

  ngOnInit(): void {
    this.showDialog();
  }

  showDialog() {
    this.displayChoose = true;
  }

  showChoooseFileDialog() {
    this.displayFileChoose = true;
    this.displayWriteChoose = false;
    this.displayChoose = false;
  }

  showChoooseWriteDialog() {
    this.displayWriteChoose = true;
    this.displayFileChoose = false;
    this.displayChoose = false;
  }

}
