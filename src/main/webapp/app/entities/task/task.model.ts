import { BaseEntity } from './../../shared';

export class Task implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public order?: number,
        public taskList?: BaseEntity,
        public userExtras?: BaseEntity[],
        public durations?: BaseEntity[],
        public tagLists?: BaseEntity[],
        public checkLists?: BaseEntity[],
    ) {
    }
}
