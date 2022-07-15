import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Currency, MeasurementUnits } from './../types/types';
export const CURRENCIES: Currency[] = ['$', 'S/.', '€'];
export const DATE_DELIMITER: string = '/';
export const HOURS_ARRAY: string[] = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
export const MEASUREMENT_UNITS: MeasurementUnits[] = ['gr', 'kg', 'lt', 'pkg'];
export const NGB_MODAL_OPTIONS: NgbModalOptions = {
  size: 'lg',
  backdrop: 'static',
  keyboard: false,
};
