import { DATE_DELIMITER } from './../variables/GlobalVariables';
import { Injectable } from '@angular/core';
import {
  NgbDateStruct,
  NgbDateAdapter,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomDateAdapter extends NgbDateAdapter<string> {
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(DATE_DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? (date.day <= 9 ? '0' + date.day : date.day) +
          DATE_DELIMITER +
          (date.month <= 9 ? '0' + date.month : date.month) +
          DATE_DELIMITER +
          date.year
      : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(DATE_DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? (date.day <= 9 ? '0' + date.day : date.day) +
          DATE_DELIMITER +
          (date.month <= 9 ? '0' + date.month : date.month) +
          DATE_DELIMITER +
          date.year
      : '';
  }
}
