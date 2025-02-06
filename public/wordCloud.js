import { getWordCloud } from "../api/wordcloud.js";

let input = 'Hello my name name name is is john and I have hello seven words words words words words words to say';

const path = 'https://quickchart.io/wordcloud';

const blob = await getWordCloud(path,input);

console.log(blob);

const imageUrl = URL.createObjectURL(blob);
const imageElement = document.createElement("img");
imageElement.src = imageUrl;
const container = document.getElementById("image-container");
container.appendChild(imageElement);

