import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'led-add-lamps',
  templateUrl: './add-lamps.component.html',
  styleUrls: ['./add-lamps.component.scss']
})
export class AddLampsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  newLamps = [
    {id: 1, name: "XGZUWLK7483949"},
    {id: 2, name: "POIIOSH1122830"}
  ];

}
