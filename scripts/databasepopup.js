const gridItems = document.querySelectorAll('.image');

const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popupContent');
const popupImage = document.getElementById('popupImage');
   
const closeBtn = document.getElementById('closeBtn');

gridItems.forEach(item => {

    item.addEventListener('click', () => {

        const title = item.dataset.title;
        const date = item.dataset.date;
        const creator = item.dataset.creator;
        const synopsis = item.dataset.synopsis;
        const genre = item.dataset.genre;
        const fonts = item.dataset.fonts;
        const img = item.dataset.img;

        popupImage.src = img;
        

        popupContent.innerHTML = `
        <div class="popup-title">${title}</div>
        <div id="typingText" class="popup-content"></div>

    `;
const fullContent = `<b>Date of Release:</b> ${date}\n` +
                            `<b>Creator:</b> ${creator}\n` +
                            `<b>Synopsis:</b> ${synopsis}\n` +
                            `<b>Genre:</b> ${genre}\n` +
                            `<b>Fonts:</b> ${fonts}`;

        overlay.classList.add('active');

        // Select the newly created div and start typing
        const typingContainer = document.getElementById('typingText');
        typeText(typingContainer, fullContent, 25);

        
    });

});



overlay.addEventListener('click', (e) => {

    if (!popup.contains(e.target)) {
        overlay.classList.remove('active');
    }

});

let typingInterval;
function typeText(element, text, speed = 30) {
    // 1. Clear any old typing
    clearInterval(typingInterval);
    
    // 2. Prepare the container: 
    // We set it to 'visibility: hidden' and fill it with the full text 
    // to "lock in" the size so it doesn't jump.
    element.style.visibility = 'hidden';
    element.innerHTML = text;
    
    // 3. Force the browser to calculate the height, then clear it
    const fullHeight = element.scrollHeight;
    element.innerHTML = "";
    element.style.visibility = 'visible';
    element.style.minHeight = `${fullHeight}px`; // Lock the height

    let i = 0;
    typingInterval = setInterval(() => {
        if (i < text.length) {
            // Skip over HTML tags so they don't 'type' out character by character
            if (text[i] === "<") {
                i = text.indexOf(">", i) + 1;
            } else {
                i++;
            }
            element.innerHTML = text.slice(0, i);
        } else {
            clearInterval(typingInterval);
            element.style.minHeight = "auto"; // Unlock height when done
        }
    }, speed);
}