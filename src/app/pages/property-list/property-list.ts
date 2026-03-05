import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import saleData from '../../../../data/propertiesforsale.json';
import rentData from '../../../../data/propertiesforrent.json';
import cambodiaData from '../../../../data/cambodia_25_provinces_districts.json';

interface ProvinceData { capital: string; districts: string[]; }
const cambodia: Record<string, ProvinceData> = cambodiaData as any;

interface Property {
  property_id: string;
  title: string;
  description: string;
  image: string;
  property_type: string;
  province: string;
  district: string;
  location: string;
  bedrooms_count: number;
  bathroom_count: number;
  unit_size_sqm: number;
  floor: number | null;
  listing_type: string;
  updated_time: string;
  price?: number;
  rent_per_month?: number;
  rent_per_year?: number;
}

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  templateUrl: './property-list.html',
  styleUrl: './property-list.css',
})
export class PropertyList implements OnInit {

  // ── ALL DATA ──────────────────────────────────────────
  allSale: Property[] = saleData as Property[];
  allRent: Property[] = rentData as Property[];

  // ── FILTER STATE ──────────────────────────────────────
  listingTab = signal<'all' | 'sale' | 'rent'>('all');
  searchQuery = signal('');
  filterType = signal('');
  filterProvince = signal('');
  filterDistrict = signal('');
  filterMinPrice = signal(0);
  filterMaxPrice = signal(5000000);
  filterMinBeds = signal(0);
  sortBy = signal<'newest' | 'price_asc' | 'price_desc' | 'size_desc'>('newest');

  // pagination
  pageSize = signal(9);
  currentPage = signal(1);

  // ── FILTER OPTIONS ────────────────────────────────────
  propertyTypes = ['Condo', 'Apartment', 'Villa', 'House', 'Shophouse', 'Commercial', 'Lands', 'Borey'];
  provinces = Object.keys(cambodia).sort();
  bedroomOptions = [0, 1, 2, 3, 4, 5];

  filteredDistricts = computed(() => {
    const prov = this.filterProvince();
    return prov && cambodia[prov] ? cambodia[prov].districts : [];
  });

  // ── MERGED + FILTERED COMPUTED ────────────────────────
  filteredProperties = computed(() => {
    // 1. pick dataset
    let data: Property[] = [];
    if (this.listingTab() === 'sale') data = [...this.allSale];
    else if (this.listingTab() === 'rent') data = [...this.allRent];
    else data = [...this.allSale, ...this.allRent];

    const q = this.searchQuery().toLowerCase().trim();

    // 2. apply filters
    data = data.filter(p => {
      const matchSearch = !q || p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.property_type.toLowerCase().includes(q);
      const matchType = !this.filterType() || p.property_type === this.filterType();
      const matchProvince = !this.filterProvince() || p.province === this.filterProvince();
      const matchDistrict = !this.filterDistrict() || p.district === this.filterDistrict();
      const matchBeds = this.filterMinBeds() === 0 || p.bedrooms_count >= this.filterMinBeds();

      // price filter — works on both sale price and rent_per_month
      const effectivePrice = p.price ?? p.rent_per_month ?? 0;
      const matchMax = this.filterMaxPrice() === 5000000 || effectivePrice <= this.filterMaxPrice();

      return matchSearch && matchType && matchProvince && matchDistrict && matchBeds && matchMax;
    });

    // 3. sort
    data.sort((a, b) => {
      if (this.sortBy() === 'newest') {
        return new Date(b.updated_time).getTime() - new Date(a.updated_time).getTime();
      }
      const pa = a.price ?? a.rent_per_month ?? 0;
      const pb = b.price ?? b.rent_per_month ?? 0;
      if (this.sortBy() === 'price_asc') return pa - pb;
      if (this.sortBy() === 'price_desc') return pb - pa;
      if (this.sortBy() === 'size_desc') return b.unit_size_sqm - a.unit_size_sqm;
      return 0;
    });

    return data;
  });

  totalPages = computed(() => Math.ceil(this.filteredProperties().length / this.pageSize()));

  paginatedProperties = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredProperties().slice(start, start + this.pageSize());
  });

  pageNumbers = computed(() => {
    const total = this.totalPages();
    const cur = this.currentPage();
    const pages: number[] = [];
    const start = Math.max(1, cur - 2);
    const end = Math.min(total, cur + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  });

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['city']) this.filterProvince.set(params['city']);
      if (params['district']) this.filterDistrict.set(params['district']);
      if (params['type']) this.filterType.set(params['type']);
      if (params['budget']) this.applyBudgetParam(params['budget']);
      if (params['listing']) this.listingTab.set(params['listing']);
    });
  }

  applyBudgetParam(budget: string) {
    const ranges: Record<string, number> = {
      '$10k - $50k': 50000, '$50k - $100k': 100000,
      '$100k - $250k': 250000, '$250k - $500k': 500000,
      '$500k - $1M': 1000000, '$1M+': 5000000
    };
    if (ranges[budget]) this.filterMaxPrice.set(ranges[budget]);
  }

  setTab(tab: 'all' | 'sale' | 'rent') {
    this.listingTab.set(tab);
    this.currentPage.set(1);
  }

  onFilterChange() { this.currentPage.set(1); }

  setProvince(prov: string) {
    this.filterProvince.set(prov);
    this.filterDistrict.set('');
    this.currentPage.set(1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }

  clearAllFilters() {
    this.listingTab.set('all');
    this.searchQuery.set('');
    this.filterType.set('');
    this.filterProvince.set('');
    this.filterDistrict.set('');
    this.filterMaxPrice.set(5000000);
    this.filterMinBeds.set(0);
    this.sortBy.set('newest');
    this.currentPage.set(1);
  }

  hasActiveFilters() {
    return this.filterType() || this.filterProvince() || this.filterDistrict() ||
      this.filterMaxPrice() < 5000000 || this.filterMinBeds() > 0 || this.searchQuery();
  }

  getDisplayPrice(p: Property): number {
    return p.price ?? p.rent_per_month ?? 0;
  }

  getPriceLabel(p: Property): string {
    if (p.rent_per_month) return `$${p.rent_per_month.toLocaleString()}/mo`;
    return `$${(p.price ?? 0).toLocaleString()}`;
  }
}
