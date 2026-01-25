import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { EnquirySubmitComponent } from './features/enquiry-submit/enquiry-submit.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { EnquiryListComponent } from './features/enquiry-list/enquiry-list.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'enquiry-submit',
        component: EnquirySubmitComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'enquiry-list',
        component: EnquiryListComponent
    }
];
