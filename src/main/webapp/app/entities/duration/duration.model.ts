import { BaseEntity } from './../../shared';

export class Duration implements BaseEntity {
    constructor(
        public id?: number,
        public estimated?: number,
        public spent?: number,
        public name?: string,
        public task?: BaseEntity,
    ) {
    }
}
