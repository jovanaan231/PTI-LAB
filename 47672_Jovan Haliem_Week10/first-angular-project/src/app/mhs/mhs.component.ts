import { Component, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-mhs',
  templateUrl: './mhs.component.html',
  styleUrls: ['./mhs.component.css']
})
export class MhsComponent implements OnInit {

  constructor() {
    this.nama = ['Mika', 'Rafa', 'Yosh', 'Gaby'];
   }

  ngOnInit(): void {
  }

}
