
const User = require('./app.js');

// Lets give Tappi a life 
const user = new User('Tappi');

// Adding false personal information
user.addPersonalInformation({
    age: 37,
    profession: 'Product designer',
    health: {
        medicalHistory: ['Seasonal malaria'],
        habits: ['Friendly mockery']
    }
});

// Including fake education and certification data
user.addMoreData('Education and certification data', 'Bachelor of Science in Software Engineering - MIT');
user.addMoreData('Education and certification data', 'PhD in Engineering - Princeton University');
user.addMoreData('Education and certification data', 'Certified Professional Dreams');

console.log("User's personal information:", user.getPersonalInformation());
console.log("User's education and certification data:", user.getEducationCertificationData());

//testing random data section 
user.addMoreData('FaveMovies', 'Tenet');
user.addMoreData('FaveMovies', 'The Terminator 2');
user.addMoreData('FaveMovies', 'Avatar');
user.addMoreData('FavouriteMusicArtists', 'RedCyX');
user.addMoreData('FavouriteMusicArtists', 'Abba');
user.addMoreData('FavouriteMusicArtists', 'BNXN');
user.addMoreData('FavouriteMusicArtists', 'Davido');

console.log(user.getFaveMoviesData());
console.log(user.getFavouriteMusicArtistsData()); 
￼Enter
