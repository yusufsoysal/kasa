import { BaseEntity } from './../../shared';

export class RecurringIncome implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public incomeDay?: number,
        public amount?: number,
        public circle?: BaseEntity,
    ) {
    }
}
