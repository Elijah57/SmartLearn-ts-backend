class Example {
    sayHello() {
        console.log("Hello!");
    }
    sayGoodbye() {
        console.log("Goodbye!");
    }
}

// Get all prototype properties of the class
console.log(Object.getOwnPropertyNames(Example.prototype).filter((key)=> typeof Example.prototype[key] === "function" && key !== "constructor")); 


// const propertiesOfExample = Object.getOwnPropertyNames(Example.prototype)

// console.log(propertiesOfExample)