var person = {
	name: "Rahul",
	age: "31"
}

var personJSON = JSON.stringify(person);

console.log(personJSON);
console.log(typeof personJSON);

var personObject = JSON.parse(personJSON);

console.log(personObject);
console.log(typeof personObject);

var animal = '{"name":"Krishna"}';
var animalObj = JSON.parse(animal);

animalObj.age = 31;

var animal = JSON.stringify(animalObj);

console.log(animal);
console.log(typeof animal);

var obj = { name: 'twitter', username: 'rahul', password: 'rahul' }
console.log(JSON.stringify(obj));