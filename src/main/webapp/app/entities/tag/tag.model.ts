import { BaseEntity } from './../../shared';

export class Tag implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public order?: number,
        public tagged?: boolean,
        public tagList?: BaseEntity,
    ) {
        this.tagged = false;
    }
}
