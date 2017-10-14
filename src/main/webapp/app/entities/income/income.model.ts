import { BaseEntity } from './../../shared';

export class Income implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public incomeDate?: any,
        public amount?: number,
        public circle?: BaseEntity,
    ) {
    }
}
