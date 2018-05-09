import { BaseEntity } from './../../shared';

export class Sprint implements BaseEntity {
    constructor(
        public id?: number,
        public startDate?: any,
        public endDate?: any,
        public order?: number,
        public project?: BaseEntity,
        public taskLists?: BaseEntity[],
    ) {
    }
}
