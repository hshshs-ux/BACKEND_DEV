const fs=require('fs');
// fs.readFileSync("./data.json","utf8");
const userData = {
  name: "Jai Chaudhary",
  age: 20,
  city: "New Delhi"
};
try {

const jsonString = JSON.stringify(userData, null, 2);
fs.writeFileSync("./data.json", jsonString);
// const parsedObject = JSON.parse(jsonString);
// console.log(parsedObject);

  const fileData = fs.readFileSync("./data.json", "utf8");
  const parsedObject = JSON.parse(fileData);
  console.log(parsedObject);
} catch (error) {
  console.log("Error:", error.message);
}