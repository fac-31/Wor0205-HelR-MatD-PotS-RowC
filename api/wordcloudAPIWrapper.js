export async function getWordCloud(path, input, options) {

    const wordCloudOptions = {
        format: "png",
        width: 500,
        height: 500,
        fontFamily: "sans-serif",
        fontScale: 15,
        scale: "linear",
        removeStopwords: true,
        text: input
    }

    // loop through object
    // wordCloudOption.key = value
    for (const key in options) {
        wordCloudOptions[key] = options[key];
    }

    const response = await fetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wordCloudOptions)
        }
    )
    
    const imgBuffer = await response.arrayBuffer();
    return Buffer.from(imgBuffer);
}