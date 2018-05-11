import { BaseEntity } from './../../shared';

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public creationDate?: any,
        public description?: string,
        public userExtras?: BaseEntity[],
        public sprints?: BaseEntity[],
    ) {
    }
}
