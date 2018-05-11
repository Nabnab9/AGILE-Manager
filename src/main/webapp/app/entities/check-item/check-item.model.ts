import { BaseEntity } from './../../shared';

export class CheckItem implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public checked?: boolean,
        public checkList?: BaseEntity,
    ) {
        this.checked = false;
    }
}
