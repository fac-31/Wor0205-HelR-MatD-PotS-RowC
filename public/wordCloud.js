let input = 'Hello my name name name is is john and I have hello seven words words words words words words to say';

const path = 'https://quickchart.io/wordcloud';

fetch(path, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "format": "svg",
        "width": 1000,
        "height": 1000,
        "fontFamily": "sans-serif",
        "fontScale": 15,
        "scale": "linear",
        "text": input})
    }
)
    .then((res) => res.blob())
    .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        const imageElement = document.createElement("img");
        imageElement.src = imageUrl;
        const container = document.getElementById("image-container");
        container.appendChild(imageElement);
    })



