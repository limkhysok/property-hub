import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home),
        title: 'Property Hub – Find Your Dream Property in Cambodia'
    },
    {
        path: 'properties',
        loadComponent: () => import('./pages/property-list/property-list').then(m => m.PropertyList),
        title: 'Explore Properties – Property Hub Cambodia'
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then(m => m.About),
        title: 'About Us – Property Hub Cambodia'
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact').then(m => m.Contact),
        title: 'Contact Us – Property Hub Cambodia'
    },
    {
        path: 'promotion',
        loadComponent: () => import('./pages/promotion/promotion').then(m => m.Promotion),
        title: 'Promotions & Deals – Property Hub Cambodia'
    },
    {
        path: 'management',
        loadComponent: () => import('./pages/property-management/property-management').then(m => m.PropertyManagement),
        title: 'Property Management – Property Hub Cambodia'
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
