import { BaseEntity, User } from './../../shared';

export class UserExtra implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public user?: User,
        public projects?: BaseEntity[],
        public tasks?: BaseEntity[],
    ) {
    }
}
