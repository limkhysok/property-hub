import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-promotion',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './promotion.html',
    styleUrl: './promotion.css',
})
export class Promotion implements OnInit, OnDestroy {
    private carouselTimer: any;
    currentSlide = signal(0);

    activePromotions = [
        {
            id: 'PROMO-2025-04',
            badge: 'UPCOMING',
            badgeClass: 'badge-active',
            title: 'Khmer New Year Special',
            subtitle: 'Celebrate Khmer New Year with property savings.',
            discount: '15% OFF',
            description: 'To celebrate Bon Chaul Chhnam Thmey, Property Hub offers a 15% discount on selected premium residential listings across Phnom Penh and Siem Reap. Valid on all signed contracts Apr 10–20, 2025.',
            eventDate: 'APR 10 – 20, 2025',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            tag: 'RESIDENTIAL'
        },
        {
            id: 'PROMO-2025-03',
            badge: 'ACTIVE NOW',
            badgeClass: 'badge-live',
            title: 'Q2 Zero Deposit Drive',
            subtitle: 'Secure your unit with no downpayment.',
            discount: '0% DEPOSIT',
            description: 'Lock in your dream riverside condo or borey villa with absolutely zero deposit required this quarter. First-come, first-served on selected developer-partnered units. Offer runs through end of March 2025.',
            eventDate: 'MAR 01 – MAR 31, 2025',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            tag: 'NEW LAUNCH'
        },
        {
            id: 'PROMO-2025-05',
            badge: 'UPCOMING',
            badgeClass: 'badge-active',
            title: 'Water Festival Launch',
            subtitle: 'Premium river-view listings go live.',
            discount: 'FREE TITLE TRANSFER',
            description: 'In honor of Bon Om Touk, Property Hub is waiving all title transfer fees on riverside condo acquisitions. A saving of up to $3,500 per transaction on premium river-view developments in Phnom Penh.',
            eventDate: 'NOV 05 – NOV 07, 2025',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            tag: 'RIVERSIDE'
        }
    ];

    expiredPromotions = [
        {
            id: 'PROMO-2025-01',
            badge: 'EXPIRED',
            title: 'Chinese New Year Bonus',
            discount: '10% OFF',
            description: 'Lunar New Year discount on commercial properties in Phnom Penh. Jan 20 – Feb 10, 2025.',
            eventDate: 'JAN 20 – FEB 10, 2025',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'COMMERCIAL'
        },
        {
            id: 'PROMO-2024-12',
            badge: 'EXPIRED',
            title: 'Year-End Closing Deal',
            discount: 'FREE LEGAL FEE',
            description: 'Free legal documentation and title transfer services for all new purchases closed before Dec 31, 2024.',
            eventDate: 'DEC 01 – DEC 31, 2024',
            image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'ALL TYPES'
        },
        {
            id: 'PROMO-2024-11',
            badge: 'EXPIRED',
            title: 'Independence Day Incentive',
            discount: '12% OFF',
            description: 'Commemorating Cambodia\'s Independence Day with special pricing on premium villas and condos. Nov 1–15, 2024.',
            eventDate: 'NOV 01 – NOV 15, 2024',
            image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'VILLAS & CONDOS'
        },
        {
            id: 'PROMO-2024-09',
            badge: 'EXPIRED',
            title: 'Mid-Autumn Festival',
            discount: '8% OFF',
            description: 'Celebrate the Moon Festival with exclusive discounts on landed houses and bungalows across Kandal and Takeo provinces.',
            eventDate: 'SEP 17 – SEP 21, 2024',
            image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'LANDED HOUSE'
        },
        {
            id: 'PROMO-2024-06',
            badge: 'EXPIRED',
            title: 'Visual Arts Week Deal',
            discount: 'CASHBACK $1,500',
            description: 'Special cashback offer on borey units during Phnom Penh Art & Culture Week. Limited to first 20 contracts signed.',
            eventDate: 'JUN 10 – JUN 20, 2024',
            image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'BOREY'
        },
        {
            id: 'PROMO-2024-04',
            badge: 'EXPIRED',
            title: 'Khmer New Year 2024',
            discount: '10% OFF',
            description: 'Last year\'s Khmer New Year celebration offering on selected residential listings. A predecessor to our 2025 edition.',
            eventDate: 'APR 13 – APR 17, 2024',
            image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            tag: 'RESIDENTIAL'
        }
    ];

    visibleCount = 3;

    get totalSlides() {
        return this.expiredPromotions.length;
    }

    get maxSlide() {
        return this.totalSlides - this.visibleCount;
    }

    ngOnInit() {
        this.startCarousel();
    }

    ngOnDestroy() {
        clearInterval(this.carouselTimer);
    }

    startCarousel() {
        this.carouselTimer = setInterval(() => {
            this.nextSlide();
        }, 3500);
    }

    nextSlide() {
        const next = this.currentSlide() + 1;
        this.currentSlide.set(next > this.maxSlide ? 0 : next);
    }

    prevSlide() {
        const prev = this.currentSlide() - 1;
        this.currentSlide.set(prev < 0 ? this.maxSlide : prev);
    }

    goToSlide(index: number) {
        const clamped = Math.min(index, this.maxSlide);
        this.currentSlide.set(clamped);
        clearInterval(this.carouselTimer);
        this.startCarousel();
    }

    dotRange() {
        return Array.from({ length: this.maxSlide + 1 }, (_, i) => i);
    }
}
