export async function getWordCloud(path,input) {
    const res = await fetch(path, {
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

    console.log("blob")
    const blob = await res.blob();
    console.log(blob);

    return blob;
    // const blob = await res.blob();
    // console.log(blob);
    // return blob;
}