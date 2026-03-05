import { Component, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import metadata from '../../../../data/cambodia_25_provinces_districts.json';

interface ProvinceData {
  capital: string;
  districts: string[];
}

const cambodiaData: Record<string, ProvinceData> = metadata;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  selectedCategory = signal<'buy' | 'rent'>('buy');

  // Selection States
  selectedType = signal('All Properties');
  selectedBudget = signal('No Limit');
  selectedCity = signal('');
  selectedDistrict = signal('');

  // Dropdown States
  showCityDropdown = signal(false);
  showDistrictDropdown = signal(false);
  showTypeDropdown = signal(false);
  showBudgetDropdown = signal(false);

  // Cambodia Data from JSON
  cities = Object.keys(cambodiaData);

  filteredCities = computed(() => {
    const search = this.selectedCity().toLowerCase();
    if (!search && !this.showCityDropdown()) return [];
    if (!search) return this.cities;
    return this.cities.filter(c => c.toLowerCase().includes(search));
  });

  filteredDistricts = computed(() => {
    const city = this.selectedCity();
    const search = this.selectedDistrict().toLowerCase();

    // Check if the current selectedCity is a valid province in our data
    const province = cambodiaData[city];
    const districtList = province ? province.districts : [];

    if (!search && !this.showDistrictDropdown()) return [];
    if (!search) return districtList;
    return districtList.filter(d => d.toLowerCase().includes(search));
  });

  // Property Filters
  propertyTypes = ['All Properties', 'Condo', 'Apartment', 'Villa / House', 'Commercial', 'Lands', 'Borey'];
  budgetRanges = [
    { label: '$10k - $50k' },
    { label: '$50k - $100k' },
    { label: '$100k - $250k' },
    { label: '$250k - $500k' },
    { label: '$500k - $1M' },
    { label: '$1M+' }
  ];

  // Animated Titles
  animatedTitles = ['Dream Home', 'Luxury Condo', 'Premium Land', 'Modern Villa'];
  currentTitleIndex = signal(0);
  private animationInterval: any;

  // Featured Properties Dummy Data
  dummyFeaturedProperties = [
    {
      id: 1,
      title: 'Diamond Twin Tower Condo',
      location: 'Koh Pich, Phnom Penh',
      price: 250000,
      beds: 2,
      baths: 2,
      sqft: 110,
      type: 'Condo',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tag: 'New Launch'
    },
    {
      id: 2,
      title: 'Modern Colonial Villa',
      location: 'Chbar Ampov, Phnom Penh',
      price: 850000,
      beds: 5,
      baths: 6,
      sqft: 450,
      type: 'Villa',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tag: 'Luxury'
    },
    {
      id: 3,
      title: 'Riverside Boutique Apartment',
      location: 'Riverside, Siem Reap',
      price: 1200,
      beds: 1,
      baths: 1,
      sqft: 75,
      type: 'Apartment',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tag: 'For Rent'
    }
  ];

  constructor() { }

  ngOnInit() {
    this.animationInterval = setInterval(() => {
      this.currentTitleIndex.update(i => (i + 1) % this.animatedTitles.length);
    }, 4000);
  }

  ngOnDestroy() {
    if (this.animationInterval) clearInterval(this.animationInterval);
  }

  setCategory(category: 'buy' | 'rent') {
    this.selectedCategory.set(category);
  }

  toggleDropdown(type: 'city' | 'district' | 'type' | 'budget') {
    if (type === 'city') {
      this.showCityDropdown.update(v => !v);
      this.showDistrictDropdown.set(false);
      this.showTypeDropdown.set(false);
      this.showBudgetDropdown.set(false);
    } else if (type === 'district') {
      this.showDistrictDropdown.update(v => !v);
      this.showCityDropdown.set(false);
      this.showTypeDropdown.set(false);
      this.showBudgetDropdown.set(false);
    } else if (type === 'type') {
      this.showTypeDropdown.update(v => !v);
      this.showCityDropdown.set(false);
      this.showDistrictDropdown.set(false);
      this.showBudgetDropdown.set(false);
    } else if (type === 'budget') {
      this.showBudgetDropdown.update(v => !v);
      this.showCityDropdown.set(false);
      this.showDistrictDropdown.set(false);
      this.showTypeDropdown.set(false);
    }
  }

  selectCity(city: string) {
    this.selectedCity.set(city);
    this.selectedDistrict.set(''); // Reset district when city changes
    this.showCityDropdown.set(false);
  }

  selectDistrict(dist: string) {
    this.selectedDistrict.set(dist);
    this.showDistrictDropdown.set(false);
  }

  selectType(type: string) {
    this.selectedType.set(type);
    this.showTypeDropdown.set(false);
  }

  selectBudget(label: string) {
    this.selectedBudget.set(label);
    this.showBudgetDropdown.set(false);
  }
}
