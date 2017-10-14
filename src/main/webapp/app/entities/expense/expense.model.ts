import { BaseEntity, User } from './../../shared';

export class Expense implements BaseEntity {
    constructor(
        public id?: number,
        public location?: string,
        public lat?: number,
        public lon?: number,
        public description?: string,
        public dateTime?: any,
        public amount?: number,
        public user?: User,
        public circle?: BaseEntity,
        public category?: BaseEntity,
    ) {
    }
}
