import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'led-setup-bridge-dialog',
  templateUrl: './setup-bridge-dialog.component.html',
  styleUrls: ['./setup-bridge-dialog.component.scss']
})
export class SetupBridgeDialogComponent implements OnInit {
  hide = true;
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
  }

}
