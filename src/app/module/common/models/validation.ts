import { SeverityType } from './custom-types';

export interface Validations {
  validName: string;
  validMessage: string;
  severity?: SeverityType;
}

export interface EntityValidations {
  field: string;
  validations: Validations[];
}
