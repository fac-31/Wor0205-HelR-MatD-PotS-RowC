export async function getWordCloud(path,input) {
    return await fetch(path, {
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
    //console.log(blob)

     res;
    // const blob = await res.blob();
    // console.log(blob);
    // return blob;
}