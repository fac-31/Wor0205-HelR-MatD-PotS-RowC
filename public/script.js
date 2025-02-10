let stringCaches = {};

// Personalised greeting
document.getElementById('APISForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent page reload

    const imgElement = document.getElementById('imageElement')
    const searchString = document.getElementById("input-topic").value;
    if (stringCaches.hasOwnProperty(searchString))
    {

            const blob = stringCaches[searchString];
            const url = URL.createObjectURL(blob);

            imgElement.src = url;  // Prefix with appropriate MIME type
            imgElement.style.opacity = '1'; // Show image once loaded
            return;
    }
    const form = document.forms.APISForm;

    const json = {};

    // Loop through each of the inputs to set key and values
    const inputs = form.querySelectorAll("[id*='input-']");
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const key = input.getAttribute("id").replace("input-", "");
        
        if (input.getAttribute("type") == "checkbox")
            json[key] = input.checked ? "true" : "false";
        else
            json[key] = input.value;
    }

    console.log(json.topic);

    // Send the JSON string to the server
    await fetch('/API1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json) // Send the JSON string directly
    })
        .then(async (res) => {

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
            stringCaches[searchString] = blob;
        })

    console.log(json.topic + " again");
    
    await fetch('/poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json) // Send the JSON string directly
    })
        .then((res) => res.text())
        .then((text) => {
            const poemTitle = document.getElementById('poem-title');
            const poemText = document.getElementById('poem-text');
            poemTitle.innerText = json.topic + " poem";
            poemText.innerText = text;
        });
});

