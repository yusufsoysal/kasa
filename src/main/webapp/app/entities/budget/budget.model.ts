import { BaseEntity } from './../../shared';

export class Budget implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public remainingAmount?: number,
        public year?: number,
        public month?: number,
        public circle?: BaseEntity,
    ) {
    }
}
