let userName:string = "Mariana";
let topic:string = "TypeScript";
let maxTokens:number = 200;
let premiumUser:boolean = true;

let promptMessage = `User: ${userName}
Create a study guide about ${topic}.
Maximum tokens: ${maxTokens}
Access Level:${premiumUser ? "Premium User" : "Free User"}`;

console.log(promptMessage);