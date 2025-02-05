
// Toggle hidden information
const toggleButton = document.getElementById('btn-toggle1');
const hiddenInfo = document.querySelector('.hidden-info');

toggleButton.addEventListener('click', () => {
    hiddenInfo.classList.toggle('hidden-info');
});

//interactive spinning button
const colorButton = document.getElementById('btn-change-color');

colorButton.addEventListener('click', function() {
    colorButton.style.animation = "spin 0.5s";
    zenQuote();
setTimeout(() => {
    colorButton.style.animation = "";
}, 500);
});

//button text size
if (colorButton) {
    colorButton.style.fontSize = "24px";
}

const styleSheet = document.createElement("style");
styleSheet.textContent = `
   @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(styleSheet);

//text change to button via id 
document.getElementById('btn-change-color').textContent = "Click for inspiration!";

//hiding the existing color box
const colorBox = document.getElementById('color-box');
if (colorBox) {
    colorBox.style.display = "none"; 
}

// Zen Quote
function zenQuote(doAnimate = true) {
    const section = document.getElementById("section2");

    // create image if not made yet
    let image = section.querySelector("img");
    if (!image) {
        image = document.createElement("img");
        image.setAttribute("src", "https://zenquotes.io/api/image");
        image.style.maxWidth = "100%";
        image.style.height = "auto";
        section.appendChild(image);
    }

    if (doAnimate) {
        let animate = null;
        let random = Math.floor(Math.random() * 3);
        if (random == 0) {
            animate = [
                { transform: "scale(0) rotate(3600deg)" },
                { transform: "scale(1) rotate(0deg)" },
            ];
        } else if (random == 1) {
            animate = [
                { transform: "scaleX(0) scaleY(0)" },
                { transform: "scaleX(1.5) scaleY(0.1)" },
                { transform: "scaleX(1) scaleY(1)" },
            ];
        } else if (random == 2) {
            animate = [
                { transform: "scale(0) rotateX(720deg)" },
                { transform: "scale(1) rotateX(0deg)" },
            ];
        }

        image.animate(animate, {
            duration: 2000,
            easing: "ease-out",
        });

        image.style.transform = "scale(1)";
    } else {
        image.style.transform = "scale(0)";
    }
}

// Pre-load the image, don't visually show it
zenQuote(false);

// Form submission handling
const form = document.getElementById('feedback-form');

const formResponse = document.getElementById('form-response');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const feedback = document.getElementById('feedback').value;
    formResponse.textContent = `Thank you, ${name}, for your feedback: "${feedback}"`;
    form.reset();
});

// Personalised greeting
if (name) {
    const section1Heading = document.querySelector("#section1 h2");
    section1Heading.textContent = `Welcome, ${name}`;
}

//Form 
/* Anna V - I believe these few lines need to go above formResponse (line45). 
 Let me know if that works for you/ feel free to add */ 
if (name) {
    const section1heading = document.querySelector("#section1 h2")
    section1heading.textContent = 'Welcome, $nameInput'
}


/* PROMPTS FOR ADDITIONAL INTERACTIONS

Issue 1. Add functionality to highlight the navigation link of the current section as the user scrolls.
2. Implement a light/dark mode toggle using CSS root variables.
3. Create a dynamic list where users can add and remove items.
4. Add validation to the feedback form to ensure name and feedback are not empty.
5. Use localStorage to save the user's name for personalized greetings.
6. Animate the color change of the box with a smooth transition.
7. Display a live character counter for the feedback textarea.
8. Implement drag-and-drop functionality for rearranging items in a list.
9. Add a countdown timer to a section, resetting after it reaches zero.
10. Fetch and display data from a public API (e.g., random jokes or quotes).


Theme idea: 
Name: ChampionYourself
Description: For when you need inspiration and your teammates aren't around
We could create a website that gives us motivation as we're studying/ coding

We can use the api to generate a random inspirational image: https://zenquotes.io/api/image

Zen Quotes API: https://zenquotes.io/
Instant Words of Inspiration
*/


