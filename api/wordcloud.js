export async function getWordCloud(path,input) {
    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "format": "png",
            "width": 500,
            "height": 500,
            "fontFamily": "sans-serif",
            "fontScale": 15,
            "scale": "linear",
            "removeStopwords": true,
            "text": input})
        }
    )
    
    const imgBuffer = await response.arrayBuffer();
    return Buffer.from(imgBuffer);
}