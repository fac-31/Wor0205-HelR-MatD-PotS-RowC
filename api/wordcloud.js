export async function getWordCloud(path,input) {
    return await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "format": "png",
            "width": 1000,
            "height": 1000,
            "fontFamily": "sans-serif",
            "fontScale": 15,
            "scale": "linear",
            "removeStopwords": true,
            "text": input})
        }
    )
    // console.log(blob);
    // return blob;
}