import { Component, OnInit } from '@angular/core';
import { Lamp } from '../interfaces/lamp';
import { UnconfiguredLampsService } from '../services/unconfigured-lamps.service';

@Component({
  selector: 'led-add-lamps',
  templateUrl: './add-lamps.component.html',
  styleUrls: ['./add-lamps.component.scss']
})
export class AddLampsComponent implements OnInit {

  constructor(private unconfiguredLampsService: UnconfiguredLampsService) { }

  unconfiguredLamps: Lamp[] = [];

  getUnconfiguredLamps(): void {
    this.unconfiguredLamps = this.unconfiguredLampsService.getUnconfiguredLamps();
  }

  ngOnInit(): void {
    this.getUnconfiguredLamps();
  }


}
