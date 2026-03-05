import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about.html',
    styleUrl: './about.css',
})
export class About {
    teamMembers = [
        {
            id: 'PH-001',
            name: 'Oliver Whiskers',
            position: 'FOUNDER & CHAIRMAN', //FOUNDER & CHAIRMAN
            image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'PH-002',
            name: 'Luna Paws',
            position: 'CHIEF EXECUTIVE OFFICER', //CHIEF EXECUTIVE OFFICER
            image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'PH-015',
            name: 'Simba Claws',
            position: 'LEAD INVESTOR', //LEAD INVESTOR
            image: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'PH-042',
            name: 'Bella Meow',
            position: 'ASSOC. SENIOR CONSULTANT', //ASSOC. SENIOR CONSULTANT
            image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'PH-105',
            name: 'Milo Tail',
            position: 'SALE EXECUTIVE', //SALE EXECUTIVE
            image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'PH-003',
            name: 'Chloe Purrfect',
            position: 'CHIEF OPERATING OFFICER', //CHIEF OPERATING OFFICER
            image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'PH-055',
            name: 'Oscar Felix',
            position: 'LEAD ARCHITECT', //LEAD ARCHITECT
            image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'PH-033',
            name: 'Nala Scales',
            position: 'HEAD OF LEGAL AFFAIRS', //HEAD OF LEGAL AFFAIRS
            image: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            id: 'PH-088',
            name: 'Tiger Stripes',
            position: 'SENIOR MARKETING DIRECTOR', //SENIOR MARKETING DIRECTOR
            image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ];
}
