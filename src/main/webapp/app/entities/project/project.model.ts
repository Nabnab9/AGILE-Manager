import { BaseEntity } from './../../shared';
import {UserExtra} from '../user-extra';

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public creationDate?: any,
        public description?: string,
        public userExtras?: UserExtra[],
        public sprints?: BaseEntity[],
    ) {
    }
}
