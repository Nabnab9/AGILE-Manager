import { BaseEntity } from './../../shared';

export class CheckList implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public task?: BaseEntity,
        public checkItems?: BaseEntity[],
    ) {
    }
}
