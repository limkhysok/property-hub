const fs = require('fs');
const path = require('path');

const cambodia = JSON.parse(fs.readFileSync(path.join(__dirname, 'cambodia_25_provinces_districts.json'), 'utf8'));

const propertyTypes = ['Condo', 'Apartment', 'Villa', 'House', 'Shophouse', 'Commercial', 'Lands', 'Borey'];

const budgetRangesSale = [
    { min: 10000, max: 50000 },
    { min: 50000, max: 100000 },
    { min: 100000, max: 250000 },
    { min: 250000, max: 500000 },
    { min: 500000, max: 1000000 },
    { min: 1000000, max: 3000000 }
];

const budgetRangesRent = [
    { min: 200, max: 600 },
    { min: 600, max: 1200 },
    { min: 1200, max: 2500 },
    { min: 2500, max: 5000 },
    { min: 5000, max: 10000 },
    { min: 10000, max: 25000 }
];

const unsplashImages = [
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1605146769289-440113cc3d00?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80',
];

const saleDescriptions = [
    'A stunning property in the heart of Cambodia offering modern amenities and premium finishing.',
    'Rare investment opportunity with high capital appreciation potential in a rapidly developing area.',
    'Luxury living meets traditional Khmer aesthetics in this exclusive residential offering.',
    'Strategically located near commercial hubs, markets, and international schools.',
    'Brand new developer project with flexible payment plans and full legal title.',
    'Meticulously designed space with open-plan layout, high ceilings, and natural light.',
    'Prime corner unit offering panoramic city views and top-grade fittings throughout.',
    'Ideal for families or investors seeking a well-managed residence in a secure compound.',
    'Contemporary architecture with premium stone and timber finishes inside and out.',
    'Turnkey ready property with full furniture package and property management options.',
];

const rentDescriptions = [
    'Fully furnished and move-in ready with modern interiors and imported appliances.',
    'Spacious residence with ample parking, security, and close proximity to expat amenities.',
    'Conveniently located near business districts, hospitals, and international schools.',
    'Monthly rental includes building maintenance, water, and 24/7 security services.',
    'Bright and airy open-plan layout with balcony access and garden view.',
    'Ideal for expats or long-term tenants looking for quality and comfort in Cambodia.',
    'Dedicated building management, in-house gym, and rooftop pool access included.',
    'Quiet residential street with easy access to major roads and public transport.',
    'Recently renovated interior with new kitchen, new A/C units, and smart lighting.',
    'Flexible lease terms available — 3, 6, or 12-month contracts with discounts.',
];

const provinces = Object.keys(cambodia);

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function formatDate(daysAgo) {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0];
}

function generateSaleProperties(count) {
    const results = [];
    for (let i = 0; i < count; i++) {
        const province = pick(provinces);
        const district = pick(cambodia[province].districts);
        const type = pick(propertyTypes);
        const budgetRange = budgetRangesSale[rand(0, budgetRangesSale.length - 1)];
        const price = rand(budgetRange.min, budgetRange.max);
        const beds = ['Lands', 'Commercial'].includes(type) ? 0 : rand(1, 6);
        const baths = ['Lands', 'Commercial'].includes(type) ? 0 : rand(1, Math.min(beds, 4));
        const sqm = ['Lands', 'Commercial'].includes(type) ? rand(200, 2000) : rand(40, 500);
        const floor = ['Lands', 'House', 'Villa', 'Shophouse', 'Borey'].includes(type) ? null : rand(1, 40);

        const propertyId = `PHS-${String(i + 1).padStart(5, '0')}`;
        const titlePrefixes = ['Grand', 'Royal', 'Prestige', 'Elite', 'Golden', 'Premier', 'Luxe', 'Signature', 'Heritage', 'Modern'];
        const title = `${pick(titlePrefixes)} ${type} at ${district}, ${province}`;

        results.push({
            property_id: propertyId,
            title,
            description: pick(saleDescriptions),
            image: pick(unsplashImages),
            property_type: type,
            province,
            district,
            location: `${district}, ${province}`,
            bedrooms_count: beds,
            bathroom_count: baths,
            unit_size_sqm: sqm,
            floor: floor,
            price,
            listing_type: 'For Sale',
            updated_time: formatDate(rand(1, 180))
        });
    }
    return results;
}

function generateRentProperties(count) {
    const results = [];
    for (let i = 0; i < count; i++) {
        const province = pick(provinces);
        const district = pick(cambodia[province].districts);
        const type = pick(['Condo', 'Apartment', 'Villa', 'House', 'Shophouse', 'Commercial']);
        const budgetRange = budgetRangesRent[rand(0, budgetRangesRent.length - 1)];
        const rentPerMonth = rand(budgetRange.min, budgetRange.max);
        const beds = ['Commercial', 'Shophouse'].includes(type) ? 0 : rand(1, 5);
        const baths = ['Commercial', 'Shophouse'].includes(type) ? 1 : rand(1, Math.min(beds, 3));
        const sqm = rand(40, 400);
        const floor = ['House', 'Villa'].includes(type) ? null : rand(1, 30);

        const propertyId = `PHR-${String(i + 1).padStart(5, '0')}`;
        const titlePrefixes = ['Cozy', 'Spacious', 'Modern', 'Bright', 'Affordable', 'Elegant', 'Comfortable', 'Stylish', 'Furnished', 'Premium'];
        const title = `${pick(titlePrefixes)} ${type} for Rent in ${district}, ${province}`;

        results.push({
            property_id: propertyId,
            title,
            description: pick(rentDescriptions),
            image: pick(unsplashImages),
            property_type: type,
            province,
            district,
            location: `${district}, ${province}`,
            bedrooms_count: beds,
            bathroom_count: baths,
            unit_size_sqm: sqm,
            floor,
            rent_per_month: rentPerMonth,
            rent_per_year: rentPerMonth * 12,
            listing_type: 'For Rent',
            updated_time: formatDate(rand(1, 90))
        });
    }
    return results;
}

const saleProperties = generateSaleProperties(100);
const rentProperties = generateRentProperties(100);

fs.writeFileSync(
    path.join(__dirname, 'propertiesforsale.json'),
    JSON.stringify(saleProperties, null, 2)
);

fs.writeFileSync(
    path.join(__dirname, 'propertiesforrent.json'),
    JSON.stringify(rentProperties, null, 2)
);

console.log(`✅ Generated ${saleProperties.length} sale properties → data/propertiesforsale.json`);
console.log(`✅ Generated ${rentProperties.length} rent properties → data/propertiesforrent.json`);
