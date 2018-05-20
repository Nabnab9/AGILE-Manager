import { BaseEntity, User } from './../../shared';
import {Project} from '../project';
import {Task} from '../task';

export class UserExtra implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public user?: User,
        public projects?: Project[],
        public tasks?: Task[],
    ) {
    }
}
