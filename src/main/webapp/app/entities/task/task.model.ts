import { BaseEntity } from './../../shared';

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public order?: number,
        public durations?: BaseEntity[],
        public tagLists?: BaseEntity[],
        public checkLists?: BaseEntity[],
        public userExtras?: BaseEntity[],
    ) {
    }
}
