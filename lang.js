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
             modalProducts: document.querySelector("#navbarModal .nav-products"),
        modalAbout: document.querySelector("#navbarModal .nav-about") ,
         modalDownload: document.querySelector("#navbarModal .nav-download") 
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
       if (elementsToUpdate.modalProducts) {
        const textDiv = elementsToUpdate.modalProducts.querySelector("div");
        if (textDiv) {
            textDiv.innerHTML = `<i class="bi bi-box"></i>  ${translations[languageCode].products}`;
        }
    }
          if (elementsToUpdate.modalAbout) {
        const textDiv = elementsToUpdate.modalAbout.querySelector("div");
        if (textDiv) {
            textDiv.innerHTML = `<i class="bi bi-info-circle"></i> ${translations[languageCode].about}`;
        }
    }
   if (elementsToUpdate.modalDownload) {
        const textDiv = elementsToUpdate.modalDownload.querySelector("div");
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






const searchIcon = document.querySelector('.navbar-search-icon');
const searchInput = document.querySelector('#searchInput2');
const searchWidget = document.querySelector('.search-widget');

// Initially hide the input
searchInput.style.display = 'none';

searchIcon.addEventListener('click', () => {
    if (searchInput.style.display === 'none' || searchInput.style.display === '') {
        searchInput.style.display = 'inline-block';
    } else {
        searchInput.style.display = 'none';
    }

    searchWidget.classList.toggle('border-rad-search');
});




document.addEventListener("DOMContentLoaded", () => {
  const langOptions = document.querySelectorAll(".lang-option");

  langOptions.forEach(option => {
    console.log(option.getAttribute("data-lang").toUpperCase() )
     console.log(currentLanguage )
       console.log(option.getAttribute("data-lang").toUpperCase() === currentLanguage) 
    if (option.getAttribute("data-lang").toUpperCase() === currentLanguage) {
      option.classList.add("active");
    } else {
      option.classList.remove("active");
    }

    option.addEventListener("click", () => {
      langOptions.forEach(opt => opt.classList.remove("active"));
      option.classList.add("active");

      const selectedLanguage = option.getAttribute("data-lang").toUpperCase();
      updateLanguage(selectedLanguage);
    });
  });
});










