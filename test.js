
const User = require('./app.js');

// Create a new User object
const user = new User('Tappi');

// Add data to the "Fave movies" category
user.addMoreData('FaveMovies', 'Tenet');
user.addMoreData('FaveMovies', 'The Terminator 2');
user.addMoreData('FaveMovies', 'Avatar');

// Add data to the "Favourite music artists" category
user.addMoreData('FavouriteMusicArtists', 'RedCyX');
user.addMoreData('FavouriteMusicArtists', 'Jay Z');
user.addMoreData('FavouriteMusicArtists', 'BNXN');
user.addMoreData('FavouriteMusicArtists', 'David');


// Call the dynamically generated get method for each category
console.log(user.getFaveMoviesData()); // Output: ['Tenet', 'The Terminator 2', 'Avatar']
console.log(user.getFavouriteMusicArtistsData()); // Output: ['RedCyX', 'Jay Z', 'BNXN', 'David']
￼Enter
