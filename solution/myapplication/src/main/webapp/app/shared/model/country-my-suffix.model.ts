export interface ICountryMySuffix {
    id?: number;
    countryName?: string;
    regionId?: number;
}

export class CountryMySuffix implements ICountryMySuffix {
    constructor(public id?: number, public countryName?: string, public regionId?: number) {}
}
