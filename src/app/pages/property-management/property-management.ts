import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-property-management',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './property-management.html',
  styleUrl: './property-management.css',
})
export class PropertyManagement {
  dummyListings = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      location: 'Beverly Hills, CA',
      price: 1250000,
      type: 'Villa',
      status: 'Active',
      views: 1240,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1071&q=80'
    },
    {
      id: 2,
      title: 'Urban Sky Apartment',
      location: 'Downtown, NY',
      price: 5500,
      type: 'Apartment',
      status: 'Pending',
      views: 890,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1070&q=80'
    },
    {
      id: 3,
      title: 'The Glass House',
      location: 'Malibu, CA',
      price: 4500000,
      type: 'Modern House',
      status: 'Active',
      views: 3400,
      image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80'
    },
    {
      id: 4,
      title: 'Cozy Mountain Cabin',
      location: 'Aspen, CO',
      price: 850000,
      type: 'Cabin',
      status: 'Sold',
      views: 670,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1071&q=80'
    }
  ];
}
