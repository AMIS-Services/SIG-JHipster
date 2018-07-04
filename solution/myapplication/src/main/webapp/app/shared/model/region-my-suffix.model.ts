export interface IRegionMySuffix {
    id?: number;
    regionName?: string;
}

export class RegionMySuffix implements IRegionMySuffix {
    constructor(public id?: number, public regionName?: string) {}
}
