document.addEventListener("DOMContentLoaded", () => {

    const overlay = document.getElementById('overlay');
    const mainPopup = document.getElementById('mainPopup');
    const subPopup = document.getElementById('subPopup');
    const subContent = document.getElementById('subPopupContent');

    const menuButton = document.querySelector(".Menu");

    console.log("menu system loaded");

    // OPEN MAIN MENU
    menuButton.addEventListener("click", () => {
        
        overlay.classList.add("active");
        mainPopup.classList.add("active");
    });

    // MAIN → SUB MENU
    document.querySelectorAll(".menu-item").forEach(item => {

        item.addEventListener("click", () => {

            const type = item.dataset.submenu;
            let contentList = [];

            if (type === "settings") {
                contentList = ["Audio", "Controls", "Graphics"];
            }

            if (type === "dialogue") {
                contentList = ["History", "Options"];
            }

            subContent.innerHTML = "";

            contentList.forEach(text => {
                const div = document.createElement("div");
                div.textContent = text;
                subContent.appendChild(div);
            });

            // 🔥 ADD THIS (important)
            mainPopup.classList.remove("active");

            subPopup.classList.add("active");
        });
    });

   overlay.addEventListener("click", (e) => {

        // If click is NOT inside either popup → close everything
        if (
            !mainPopup.contains(e.target) &&
            !subPopup.contains(e.target)
        ) {
            overlay.classList.remove("active");
            mainPopup.classList.remove("active");
            subPopup.classList.remove("active");
        }

    });

});