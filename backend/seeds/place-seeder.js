const mongoose = require('mongoose');
const { Place } = require('../models'); // Adjust the path as necessary

require('dotenv').config();
const db = require('../config/connection'); // Adjust the path as necessary

const seedPlaces = async () => {
    // Define an array of 10 place records
    const places = [
        {
            name: 'Cafe Mocha',
            pic: 'https://picsum.photos/350/350?random=1',
            cuisines: 'Coffee, Pastries',
            city: 'New York',
            state: 'NY',
            founded: 1987
        },
        {
            name: 'Sushi World',
            pic: 'https://picsum.photos/350/350?random=2',
            cuisines: 'Japanese, Sushi',
            city: 'San Francisco',
            state: 'CA',
            founded: 2005
        },
        {
            name: 'Pizza Planet',
            pic: 'https://picsum.photos/350/350?random=3',
            cuisines: 'Pizza, Italian',
            city: 'Los Angeles',
            state: 'CA',
            founded: 1999
        },
        {
            name: 'The Burger Joint',
            pic: 'https://picsum.photos/350/350?random=4',
            cuisines: 'Burgers, American',
            city: 'Chicago',
            state: 'IL',
            founded: 2010
        },
        {
            name: 'Taco Town',
            pic: 'https://picsum.photos/350/350?random=5',
            cuisines: 'Mexican, Tacos',
            city: 'Austin',
            state: 'TX',
            founded: 2012
        },
        {
            name: 'Pasta Palace',
            pic: 'https://picsum.photos/350/350?random=6',
            cuisines: 'Italian, Pasta',
            city: 'Boston',
            state: 'MA',
            founded: 1995
        },
        {
            name: 'Steakhouse Supreme',
            pic: 'https://picsum.photos/350/350?random=7',
            cuisines: 'Steak, American',
            city: 'Dallas',
            state: 'TX',
            founded: 1980
        },
        {
            name: 'Dim Sum Delight',
            pic: 'https://picsum.photos/350/350?random=8',
            cuisines: 'Chinese, Dim Sum',
            city: 'Seattle',
            state: 'WA',
            founded: 1975
        },
        {
            name: 'Bagel Barn',
            pic: 'https://picsum.photos/350/350?random=9',
            cuisines: 'Bagels, Breakfast',
            city: 'Philadelphia',
            state: 'PA',
            founded: 1988
        },
        {
            name: 'Smoothie Central',
            pic: 'https://picsum.photos/350/350?random=10',
            cuisines: 'Smoothies, Healthy',
            city: 'Miami',
            state: 'FL',
            founded: 2018
        }
    ];

    try {
        // Connect to the database
        await db;

        // Clear existing places
        await Place.deleteMany({});
        console.log('Existing places cleared.');

        // Insert new places
        await Place.insertMany(places);
        console.log('10 places successfully added.');

        // Disconnect from the database

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding places:', error);
        mongoose.connection.close();
    }
};

seedPlaces();
