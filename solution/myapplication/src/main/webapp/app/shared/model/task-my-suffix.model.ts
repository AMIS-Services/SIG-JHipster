import { IJobMySuffix } from 'app/shared/model//job-my-suffix.model';

export interface ITaskMySuffix {
    id?: number;
    title?: string;
    description?: string;
    jobs?: IJobMySuffix[];
}

export class TaskMySuffix implements ITaskMySuffix {
    constructor(public id?: number, public title?: string, public description?: string, public jobs?: IJobMySuffix[]) {}
}
