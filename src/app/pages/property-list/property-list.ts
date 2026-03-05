import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css',
})
export class PropertyList {
  dummyProperties = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      location: 'Beverly Hills, CA',
      price: 1250000,
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: 'Villa',
      category: 'For Sale',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1071&q=80'
    },
    {
      id: 2,
      title: 'Urban Sky Apartment',
      location: 'Downtown, NY',
      price: 5500,
      beds: 2,
      baths: 2,
      sqft: 1200,
      type: 'Apartment',
      category: 'For Rent',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1070&q=80'
    },
    {
      id: 3,
      title: 'The Glass House',
      location: 'Malibu, CA',
      price: 4500000,
      beds: 5,
      baths: 6,
      sqft: 5800,
      type: 'Modern House',
      category: 'For Sale',
      image: 'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80'
    },
    {
      id: 4,
      title: 'Cozy Mountain Cabin',
      location: 'Aspen, CO',
      price: 850000,
      beds: 3,
      baths: 2,
      sqft: 2100,
      type: 'Cabin',
      category: 'For Sale',
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=1071&q=80'
    },
    {
      id: 5,
      title: 'Tropical Beachfront Villa',
      location: 'Miami, FL',
      price: 2100000,
      beds: 4,
      baths: 4,
      sqft: 3500,
      type: 'Villa',
      category: 'For Sale',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1070&q=80'
    },
    {
      id: 6,
      title: 'Industrial Loft',
      location: 'Chicago, IL',
      price: 3200,
      beds: 1,
      baths: 1,
      sqft: 950,
      type: 'Loft',
      category: 'For Rent',
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1070&q=80'
    }
  ];
}
