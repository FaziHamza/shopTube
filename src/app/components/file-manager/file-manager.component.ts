import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'st-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  recent!: any;
  storageChart!: any;

  isVisible: Boolean = true;

  constructor() { }

  toggle() {
    this.isVisible = !this.isVisible;
  }

  remove() {
    document.getElementById('alertremove')!.classList.remove('show');
  }

  ngOnInit(): void {
  }

}
