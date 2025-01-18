const translations = {
    EN: {
        products: "Our Products",
        about: "About Us",
        download: "Download Catalogue",
        selectLanguage: "Select Language",
        languageOptions: ["English", "Azerbaijani", "Russian"],
        hideSidebar: "Hide Sidebar",
    },
    AZ: {
        products: "Məhsullarımız",
        about: "Bizim Haqqımızda",
        download: "Kataloqu Yükləyin",
        selectLanguage: "Dil Seçin",
        languageOptions: ["İngilis", "Azərbaycan", "Rus"],
        hideSidebar: "Paneli Gizlət",
    },
    RU: {
        products: "Наши Продукты",
        about: "О Нас",
        download: "Скачать Каталог",
        selectLanguage: "Выберите Язык",
        languageOptions: ["Английский", "Азербайджанский", "Русский"],
        hideSidebar: "Скрыть Панель",
    },
};

let currentLanguage = "EN";

function updateLanguage(languageCode) {
    currentLanguage = languageCode;

    const elementsToUpdate = {
        products: document.querySelector(".nav-products"),
        about: document.querySelector(".nav-about"),
        download: document.querySelector(".btn-download"),
        selectLanguage: document.querySelector("#languageModalLabel"),
        languageOptions: document.querySelectorAll(".language-option"),
        hideSidebar: document.querySelector("#hideSidebarButton"),
    };

    if (elementsToUpdate.products) {
        const textDiv = elementsToUpdate.products.querySelector("div");
        if (textDiv) {
            textDiv.innerHTML = `<i class="bi bi-box"></i> ${translations[languageCode].products}`;
        }
    }

    if (elementsToUpdate.about) {
         const textDiv = elementsToUpdate.about.querySelector("div");
        if (textDiv) {
        textDiv.innerHTML = `<i class="bi bi-info-circle"></i> ${translations[languageCode].about}`;
        }
    }

    if (elementsToUpdate.download) {
        const textDiv = elementsToUpdate.download.querySelector("div");
        if (textDiv) {
       textDiv.innerHTML = `<i class="bi bi-download"></i> ${translations[languageCode].download}`;
        }
    }

    if (elementsToUpdate.hideSidebar) {
        
        elementsToUpdate.hideSidebar.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> ${translations[languageCode].hideSidebar}`;
    }

    if (elementsToUpdate.selectLanguage) {
        elementsToUpdate.selectLanguage.textContent = translations[languageCode].selectLanguage;
    }

    elementsToUpdate.languageOptions.forEach((option, index) => {
        const textNode = option.querySelector("span");
        if (textNode) {
            textNode.textContent = translations[languageCode].languageOptions[index];
        } else {
            const img = option.querySelector("img");
            const span = document.createElement("span");
            span.textContent = translations[languageCode].languageOptions[index];
            option.appendChild(span);
        }
    });

    const languageIndicator = document.querySelector(".language-indicator");
    if (languageIndicator) {
        languageIndicator.textContent = languageCode;
    }
}


document.querySelectorAll(".language-option").forEach(option => {
    option.addEventListener("click", event => {
        const languageCode = event.target.getAttribute("data-lang");
        updateLanguage(languageCode);

        const modal = document.querySelector("#languageModal");
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
    });
});
updateLanguage(currentLanguage);


document.querySelectorAll(".menu-item").forEach((item) => {
    item.addEventListener("click", () => {
        const targetId = item.getAttribute("data-target");
        const submenu = document.getElementById(targetId);
        const arrow = item.querySelector(".arrow");

        if (submenu.style.display === "block") {
            submenu.style.display = "none";
            arrow.classList.remove("rotate");
        } else {
            submenu.style.display = "block";
            arrow.classList.add("rotate");
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const hideSidebarButton = document.getElementById("hideSidebarButton");
    const filterButton = document.getElementById("filterButton");
    const body = document.body;

    filterButton.addEventListener("click", () => {
        sidebar.style.display = "block";
        filterButton.classList.add("hidden");
        body.classList.add("sidebar-open");
    });

    hideSidebarButton.addEventListener("click", () => {
        sidebar.style.display = "none";
        filterButton.classList.remove("hidden");
        body.classList.remove("sidebar-open")
    });
    document.addEventListener("click", (event) => {
        if (event.target.closest(".magnifier")) {
            const modal = new bootstrap.Modal(document.getElementById("exampleModalCenter"));
            modal.show();
        }
    });
    document.querySelector(".close-modal").addEventListener("click", () => {
        const modal = bootstrap.Modal.getInstance(document.getElementById("exampleModalCenter"));
        modal.hide();
    });
});

