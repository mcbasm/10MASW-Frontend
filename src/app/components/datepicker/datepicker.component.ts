import { DATE_DELIMITER } from './../../variables/GlobalVariables';
import {
  NgbDate,
  NgbDateAdapter,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  CustomDateAdapter,
  CustomDateParserFormatter,
} from 'src/app/providers/date.providers';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    { provide: NgbDateAdapter, useClass: CustomDateAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class DatepickerComponent implements OnInit {
  //#region INPUTS
  @Input() field: string = 'field';
  @Input() value!: string;
  //#endregion INPUTS

  //#region OUTPUTS
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  //#endregion OUTPUTS

  constructor() {}

  ngOnInit(): void {}

  dateSelect(date: NgbDate) {
    this.valueChange.emit(
      (date.day <= 9 ? '0' + date.day : date.day) +
        DATE_DELIMITER +
        (date.month <= 9 ? '0' + date.month : date.month) +
        DATE_DELIMITER +
        date.year
    );
  }
}
