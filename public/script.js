
// Personalised greeting
document.getElementById('APISForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent page reload
    
    const topic = document.getElementById('inputTopic').value;
    const backgroundColor = document.getElementById('inputColor').value;
    const fontFamily = document.getElementById('inputFontFamily').value;
    const textCase = document.getElementById('inputCase').value;
    // Convert the object to a JSON string
    const jsonString = JSON.stringify({
        topic: topic,
        backgroundColor: backgroundColor,
        fontFamily: fontFamily,
        case: textCase
    });

    // // Send the JSON string to the server
    await fetch('/API1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonString // Send the JSON string directly
    })
        .then(async (res) => {
            const imgElement = document.getElementById('imageElement')

            // Checks to see if response is of the correct MIME type - PNG
            const contentType = res.headers.get('Content-Type');
            if (!contentType || !contentType.includes('image/png')) {
                throw new Error('The server did not return a PNG image');
            }

            // Creates a blob from the response buffer
            //   Gets the url for the blob
            const buffer = await res.arrayBuffer();
            const blob = new Blob([buffer], { type: 'image/png' });
            const url = URL.createObjectURL(blob);

            imgElement.src = url;  // Prefix with appropriate MIME type
            imgElement.style.opacity = '1'; // Show image once loaded
        })
});

