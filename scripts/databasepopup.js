const gridItems = document.querySelectorAll('.image');

const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popupContent');
const popupImage = document.getElementById('popupImage');

const closeBtn = document.getElementById('closeBtn');

gridItems.forEach(item => {

    item.addEventListener('click', () => {

        const title = item.dataset.title;
        const content = item.dataset.content;
        const img = item.dataset.img;

        popupImage.src = img;

        popupContent.innerHTML = `
        <div class="popup-title">${title}</div>
        <div id="typingText" class="popup-content"></div>
    `;

        overlay.classList.add('active');

        // Select the newly created div and start typing
        const typingContainer = document.getElementById('typingText');
        typeText(typingContainer, content, 25);

        
    });

});



overlay.addEventListener('click', (e) => {

    if (!popup.contains(e.target)) {
        overlay.classList.remove('active');
    }

});

let typingInterval;
function typeText(element, text, speed = 30) {
    // 1. Stop any current animation
    clearInterval(typingInterval);
    
    let i = 0;

    typingInterval = setInterval(() => {
        if (i <= text.length) {
            // Split the text into the typed part and the remaining part
            const typed = text.slice(0, i);
            const remaining = text.slice(i);
            
            // Reconstruct the HTML
            // The 'remaining' part stays in the DOM so lines don't jump!
            element.innerHTML = `${typed}<span class="hidden-chars">${remaining}</span>`;
            
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, speed);
}