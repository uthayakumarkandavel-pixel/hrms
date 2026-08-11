import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './shared/common/component/auth-layout/auth-layout.component';
import { LayoutComponent } from './shared/common/component/layout/layout.component';

import { authGuard } from './guard/auth-guard';
import { publicGuard } from './guard/public-guard';

import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';

import { HomeComponent } from './components/admin/home/home.component';
import { LeaveManagementComponent } from './components/admin/leave-management/leave-management.component';
import { NotFoundComponent } from './shared/common/component/not-found/not-found.component';
import { AttendenceComponent } from './components/user/attendence/attendence.component';
import { HolidayComponent } from './components/user/holiday/holiday.component';
import { RecognitionsComponent } from './components/user/recognitions/recognitions.component';
import { HomeUserComponent } from './components/user/home/home.component';
import { LeaveManagementUserComponent } from './components/user/leave-management/leave-management.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivateChild: [publicGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path:'',
        redirectTo:'/login',
        pathMatch:'full'
      }
    ],
  },

  {
    path: 'team-leader',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'leave-management',
        component: LeaveManagementComponent,
      },
      {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
      }
    ],
  },

  {
    path: 'team-member',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeUserComponent,
      },
      {
        path: 'attendance',
        component: AttendenceComponent,
      },
      {
        path: 'holiday',
        component: HolidayComponent,
      },
      {
        path: 'leave-management',
        component: LeaveManagementUserComponent,
      },
      {
        path: 'recognitions',
        component: RecognitionsComponent,
      },
      {
        path:'',
        redirectTo:'/home',
        pathMatch:'full'
      }
    ],
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
