import { BaseEntity } from './../../shared';

export class TagList implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public task?: BaseEntity,
        public tags?: BaseEntity[],
    ) {
    }
}
