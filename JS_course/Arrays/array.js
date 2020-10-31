//Array and Object references!

const names = ["Duki", "Mom", "Dad"];

const newNames = names;

newNames.push("Brother");


console.log(`names: ${newNames}`);
console.log(`names: ${names}`); //Mind how names got the new value as well, from pushing a new value to the newNames array!!

//This is due the refence of the names array being passed to the newNames array. So the newNames array is 
//basically just a pointer to the names array.

//Same applies to Objects
const tweets = {
    name: "DevDuki",
    tweets: 10,
    age: 24
};

const newTweets = tweets;
newTweets.tweets = 11;

console.log(tweets);




//Callbars and Higher Order Functions

const videos = ["how to javascript", "html tutorial", "css for beginners"];

videos.forEach(video => {
    console.log(video);
});

//Higher order function
//A function that takes an other function as a parameter, so in our case: forEach()

//Callback function
//A function that is being called inside a higher order function is called a callback function
//so in our case: the arrow function "video => {}"

//Example of a selfmade higher order & callback function:
function repeater(fn){ 
    fn();
    fn();
    fn();
}

repeater(() => {
    console.log("Hello there!");
});






//Useful functions for arrays

const animals = ["Dog", "Fish", "Cat", "Tiger", "Tiger2"];

const games = [
    { title: "Mass Effect"      , rating: 9.5},
    { title: "League of Legends", rating: 5  },
    { title: "The Last of Us"   , rating: 10 },
    { title: "God of War"       , rating: 10 },
    { title: "WWE 2k20"         , rating: 4.5}
];




//Map

//changes up each value in the array and returns them into a new array
const upperAnimals = animals.map(animal=>{
    return animal.toUpperCase();
});

console.log(upperAnimals);




//Find

//returns the first item it finds which fits the condition, or undefined if it doesnt
const searchTiger = animals.find(animal => {
   return animal.includes("Tig");
});

console.log(searchTiger);




//Filter

//similar to find but returns multiple matches instead of only first one
const searchAllTigers = animals.filter(animal => {
    return animal.includes("Tig");
});

console.log(searchAllTigers);

const highRatedGames = games.filter(game => {
    return game.rating > 8.5;
});

console.log(highRatedGames);




//Some & Every

//they both return a true or false
const ratingsAbove8 = games.every(game => {
    return game.rating > 8;
    //Will return false, because not every game has a rating above 8
});

const hasAPerfectRate = games.some(game => {
    return game.rating === 10;
    //Will return ture, because there is at least one game with a rating of 10
});




//Sort

const items   = ["Banana", "Orange", "Apple", "Mango"];
const ratings = [92, 56, 4, 2, 22, 45.6, 10, 80];

//This is sorting alphabetically
items.sort();
console.log(items);

//These numbers kinda too, sadly
ratings.sort();
console.log(ratings);

//in order to sort numbers we need to add a comparison function
ratings.sort((a, b) => {
    return a - b;
    //here is the result is negative than the order of the sort is a -> b
    //if the result is positive then its gonne switch b -> a
    //if 0 then nothing gets switched
    //do b - a if u want them to be sorted descending
});
console.log(ratings);

games.sort((a, b) => a.rating - b.rating);
console.log(games);




//Copy Arrays

const descRating = [...ratings]; //This (called spread operator) makes a copy of the ratings array and not just referencing it
descRating.push(1000);

descRating.sort((a, b) => b - a);
console.log(ratings);
console.log(descRating);

//or for strings
const name2 = "DevDuki";

//old way of seperating the letters
const letters = name2.split("");
const betterLetters = [...name2];
console.log(letters);
console.log(betterLetters);

//can even combine 2 arrays
const items1 = ["Apple", "Banana"];
const items2 = ["Pear", "Mango", "Orange"];

//without spread operator
//const allItems = items1.concat(items2);

//with spread operator
const allItems = [...items1, ...items2];
console.log(allItems);

//or if u wanna add some directly
const moreItems = ["all", "the", "items", ...allItems];
console.log(moreItems);



//Ternary Operator

animals.forEach(animal => {
    //We can write the if statements differently
    //if(animal.length > 2)
    animal.length > 4 ? console.log(animal) : undefined;
});


