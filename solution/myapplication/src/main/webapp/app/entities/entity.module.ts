import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MyapplicationRegionMySuffixModule } from './region-my-suffix/region-my-suffix.module';
import { MyapplicationCountryMySuffixModule } from './country-my-suffix/country-my-suffix.module';
import { MyapplicationLocationMySuffixModule } from './location-my-suffix/location-my-suffix.module';
import { MyapplicationDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
import { MyapplicationTaskMySuffixModule } from './task-my-suffix/task-my-suffix.module';
import { MyapplicationEmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { MyapplicationJobMySuffixModule } from './job-my-suffix/job-my-suffix.module';
import { MyapplicationJobHistoryMySuffixModule } from './job-history-my-suffix/job-history-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        MyapplicationRegionMySuffixModule,
        MyapplicationCountryMySuffixModule,
        MyapplicationLocationMySuffixModule,
        MyapplicationDepartmentMySuffixModule,
        MyapplicationTaskMySuffixModule,
        MyapplicationEmployeeMySuffixModule,
        MyapplicationJobMySuffixModule,
        MyapplicationJobHistoryMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyapplicationEntityModule {}
