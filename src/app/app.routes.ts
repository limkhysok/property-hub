import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { PropertyList } from './pages/property-list/property-list';
import { PropertyManagement } from './pages/property-management/property-management';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'properties', component: PropertyList },
    { path: 'management', component: PropertyManagement },
    { path: '**', redirectTo: '' }
];
