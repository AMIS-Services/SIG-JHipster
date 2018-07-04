import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MyapplicationSharedModule } from 'app/shared';
import {
    DepartmentMySuffixComponent,
    DepartmentMySuffixDetailComponent,
    DepartmentMySuffixUpdateComponent,
    DepartmentMySuffixDeletePopupComponent,
    DepartmentMySuffixDeleteDialogComponent,
    departmentRoute,
    departmentPopupRoute
} from './';

const ENTITY_STATES = [...departmentRoute, ...departmentPopupRoute];

@NgModule({
    imports: [MyapplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DepartmentMySuffixComponent,
        DepartmentMySuffixDetailComponent,
        DepartmentMySuffixUpdateComponent,
        DepartmentMySuffixDeleteDialogComponent,
        DepartmentMySuffixDeletePopupComponent
    ],
    entryComponents: [
        DepartmentMySuffixComponent,
        DepartmentMySuffixUpdateComponent,
        DepartmentMySuffixDeleteDialogComponent,
        DepartmentMySuffixDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyapplicationDepartmentMySuffixModule {}
