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


//how to avoid dupliaction? 
// Type Alias

type Cars = {
    brand: string, 
    year: number, 
    price: number
}

let corolla: Cars
corolla = {
    brand: 'Toyota',
    year: 2025,
    price: 23000
}

// function and types: 
function addNum (a: number, b:number):number{
    return a+b
}

//generics 
function insertAtBeginning<T>(array: T[], value: T){
    const newArray = [value, ...array];
    return newArray
}

const demoArray = [1,2,3];
const updatedArray = insertAtBeginning(demoArray, -1);

const demoCarArray = ['toyota', 'tesla', 'ford'];
const updatedCarArray = insertAtBeginning(demoCarArray, 'maserati')
updatedArray[0].split('');