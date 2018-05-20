import { BaseEntity } from './../../shared';

export class TaskList implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public order?: number,
        public tasks?: BaseEntity[],
        public sprint?: BaseEntity,
    ) {
    }
}
