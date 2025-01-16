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

    elementsToUpdate.products.innerHTML = `<i class="bi bi-box"></i> ${translations[languageCode].products}`;
    elementsToUpdate.about.innerHTML = `<i class="bi bi-info-circle"></i> ${translations[languageCode].about}`;
    elementsToUpdate.download.innerHTML = `<i class="bi bi-download"></i> ${translations[languageCode].download}`;
    elementsToUpdate.hideSidebar.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> ${translations[languageCode].hideSidebar}`;
    elementsToUpdate.selectLanguage.textContent = translations[languageCode].selectLanguage;

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

    document.querySelector(".language-indicator").textContent = languageCode;
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
