const gridItems = document.querySelectorAll('.grid-item');

const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popupContent');

const closeBtn = document.getElementById('closeBtn');

gridItems.forEach(item => {

    item.addEventListener('click', () => {

        const title = item.dataset.title;
        const content = item.dataset.content;

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