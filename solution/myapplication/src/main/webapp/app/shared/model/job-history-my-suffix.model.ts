import { Moment } from 'moment';

export const enum Language {
    FRENCH = 'FRENCH',
    ENGLISH = 'ENGLISH',
    SPANISH = 'SPANISH'
}

export interface IJobHistoryMySuffix {
    id?: number;
    startDate?: Moment;
    endDate?: Moment;
    language?: Language;
    jobId?: number;
    departmentId?: number;
    employeeId?: number;
}

export class JobHistoryMySuffix implements IJobHistoryMySuffix {
    constructor(
        public id?: number,
        public startDate?: Moment,
        public endDate?: Moment,
        public language?: Language,
        public jobId?: number,
        public departmentId?: number,
        public employeeId?: number
    ) {}
}
