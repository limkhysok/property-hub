import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import saleData from '../../../../data/propertiesforsale.json';
import rentData from '../../../../data/propertiesforrent.json';

interface Property {
  property_id: string;
  title: string;
  image: string;
  property_type: string;
  province: string;
  district: string;
  price?: number;
  rent_per_month?: number;
  listing_type: string;
  status: 'Active' | 'Pending' | 'Sold' | 'Rented';
  views: number;
}

@Component({
  selector: 'app-property-management',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './property-management.html',
  styleUrl: './property-management.css',
})
export class PropertyManagement implements OnInit {
  myListings: Property[] = [];

  ngOnInit() {
    // Generate an agent's portfolio by picking 10 random listings
    const mixedData = [...(saleData as any[]), ...(rentData as any[])]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10)
      .map(p => {
        // Assign a mock status and views for the management dashboard
        const statuses = ['Active', 'Active', 'Active', 'Pending', 'Sold', 'Rented'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        let finalStatus = randomStatus;
        if (p.listing_type === 'For Rent' && randomStatus === 'Sold') finalStatus = 'Rented';
        if (p.listing_type === 'For Sale' && randomStatus === 'Rented') finalStatus = 'Sold';

        return {
          ...p,
          status: finalStatus,
          views: Math.floor(Math.random() * 5000) + 100
        } as Property;
      });

    this.myListings = mixedData;
  }

  getDisplayPrice(p: Property): string {
    if (p.price) return `$${p.price.toLocaleString()}`;
    if (p.rent_per_month) return `$${p.rent_per_month.toLocaleString()}/mo`;
    return 'N/A';
  }
}
