// Prims: Number, String, Boolean 
// Complex type: Arrays and Objects 
// Function types like params 

//prims 
let age: number;
age = 22;

let userName : string;
userName = "Donny";

let isInstructor: boolean;
isInstructor = false;


//arrays 
let hobbies: string[]; //array of strings 
let importantDates: number[]; //array of numbers

//object 
//This object works fine
let person; 
person = {
    name: 'Max',
    age: 32
}

//object type
let typescriptPerson: {
    name: string, 
    age: number
}[];

typescriptPerson = [{
    age: 19,
    name: "John Cena"
}]

//type inference: 
let title = 'BJJ - The complete sport';
// title = 1;  We get this error because of type inference. It tries to infer which type goes where. 
// what if we have more than 2 data types that need to belong to one variable:


//union type
let course: string | number = 'Armbar - Game of isolation'
course = 1234;
//this works