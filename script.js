fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const catalogueContainer = document.querySelector("#catalogueContainer");

    const categories = [...new Set(data.map((item) => item.catalogue))];

    categories.forEach((category) => {
      const categoryContainer = document.createElement("div");
      categoryContainer.classList.add("row", "g-2");
      categoryContainer.id = `${category.toLowerCase()}Catalogue`;

      categoryContainer.innerHTML = `
        <div class="mb-20 d-flex justify-content-between align-items-center">
          <p class="mb-0 title ">Catalogue for ${category}</p>
        </div>
        <div class="items-container d-flex flex-row flex-wrap"></div>
      `;

      catalogueContainer.appendChild(categoryContainer);
    });

    const renderItems = (filteredData) => {
      document.querySelectorAll(".items-container").forEach((container) => {
        container.innerHTML = "";
      });

      filteredData.forEach((item) => {
        const cardHTML = `
          <div class="col-4">
            <div class="card">
              <div id="carousel-${item.code}" class="carousel slide" data-ride="carousel">
                <button class="btn tabs magnifier"><img src="img/magnifier.png" alt=""></button>
                <button class="btn tabs share"><img src="img/share.png" alt=""></button>
                <ol class="carousel-indicators">
                  ${item.carouselImages
            .map(
              (image, index) =>
                `<li data-target="#carousel-${item.code}" data-slide-to="${index}" class="${index === 0 ? "active" : ""}"></li>`
            )
            .join("")}
                </ol>
                <div class="carousel-inner">
                  ${item.carouselImages
            .map(
              (image, index) =>
                `<div class="carousel-item ${index === 0 ? "active" : ""}">
                          <img class="d-block w-100 carousel-img" src="${image}" alt="Slide ${index + 1}">
                        </div>`
            )
            .join("")}
                </div>
              </div>
              <p class="name mb-8 cursor-pointer">${item.name}</p>
              <p class="description mb-24">${item.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex justify-content-between align-items-center colors">
                  ${item.colors.map((color) => `<div class="color ${color}"></div>`).join("")}
                </div>
                <div class="code-container">
                  <button class="btn code">Code: ${item.code}</button>
                </div>
              </div>
            </div>
          </div>
        `;

        document
          .querySelector(`#${item.catalogue.toLowerCase()}Catalogue .items-container`)
          .innerHTML += cardHTML;
      });
    };

    renderItems(data);

    const firstVisibleCategory = categories[0];
    const firstVisibleCategoryContainer = document.querySelector(`#${firstVisibleCategory.toLowerCase()}Catalogue`);

    firstVisibleCategoryContainer.querySelector(".mb-20").innerHTML += `
      <div class="search position-relative">
        <input type="text" class="form-control pl-5 pr-5" placeholder="Search" id="searchInput">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-search position-absolute"
          style="top: 50%; left: 10px; transform: translateY(-50%); cursor: pointer;" viewBox="0 0 16 16">
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          class="bi bi-x position-absolute"
          style="top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;" viewBox="0 0 16 16">
          <path
            d="M4.293 4.293a1 1 0 0 1 1.414 0L8 6.586l2.293-2.293a1 1 0 1 1 1.414 1.414L9.414 8l2.293 2.293a1 1 0 1 1-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L6.586 8 4.293 5.707a1 1 0 0 1 0-1.414z" />
        </svg>
      </div>
    `;

    document.querySelectorAll(".submenu div").forEach((submenuItem) => {
      let isSubcategorySelected = false;

      submenuItem.addEventListener("click", (event) => {
        if (isSubcategorySelected && event.target.classList.contains("bold")) {
          event.target.classList.remove("bold");
          renderItems(data);
          document.querySelectorAll(".row").forEach((row) => {
            row.style.display = "block";
          });
          isSubcategorySelected = false;
        } else {
          document.querySelectorAll(".submenu div").forEach(item => {
            item.classList.remove("bold");
          });

          const selectedSubCategory = event.target;
          selectedSubCategory.classList.add("bold");

          const selectedSubCategoryText = selectedSubCategory.textContent.trim();
          const filteredData = data.filter((item) => item.subcatalogue === selectedSubCategoryText);
          renderItems(filteredData);

          document.querySelectorAll(".row").forEach((row) => {
            row.style.display = "none";
          });

          const visibleCategories = [...new Set(filteredData.map((item) => item.catalogue))];
          visibleCategories.forEach((category) => {
            document.querySelector(`#${category.toLowerCase()}Catalogue`).style.display = "block";
          });

          isSubcategorySelected = true;
        }

        const firstVisibleCategory = [...new Set(filteredData.map((item) => item.catalogue))][0];
        const firstVisibleCategoryContainer = document.querySelector(`#${firstVisibleCategory.toLowerCase()}Catalogue`);

        const existingSearch = firstVisibleCategoryContainer.querySelector(".search");
        if (existingSearch) {
          existingSearch.remove();
        }

        firstVisibleCategoryContainer.querySelector(".mb-20").innerHTML += `
          <div class="search position-relative">
            <input type="text" class="form-control pl-5 pr-5" placeholder="Search" id="searchInput">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-search position-absolute"
              style="top: 50%; left: 10px; transform: translateY(-50%); cursor: pointer;" viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-x position-absolute"
              style="top: 50%; right: 10px; transform: translateY(-50%); cursor: pointer;" viewBox="0 0 16 16">
              <path
                d="M4.293 4.293a1 1 0 0 1 1.414 0L8 6.586l2.293-2.293a1 1 0 1 1 1.414 1.414L9.414 8l2.293 2.293a1 1 0 1 1-1.414 1.414L8 9.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L6.586 8 4.293 5.707a1 1 0 0 1 0-1.414z" />
            </svg>
          </div>
        `;
      });
    });

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm)
      );
      renderItems(filteredData);
    });

    document.querySelector(".bi-x").addEventListener("click", () => {
      searchInput.value = "";
      renderItems(data);
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("nav.navbar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
      // User is scrolling down
      header.style.transform = "translateY(-100%)"; // Hide the header
    } else {
      // User is scrolling up
      header.style.transform = "translateY(0)"; // Show the header
    }
    lastScrollY = window.scrollY;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const catalogueContainer = document.querySelector("#catalogueContainer");

  catalogueContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("name")) {
      const modal = new bootstrap.Modal(document.getElementById("exampleModalCenter2"));
      modal.show();
    }
  });
  const closeModalButtons = document.querySelectorAll(".btn-close");
  closeModalButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modals = document.querySelectorAll(".modal.show");
      modals.forEach((modal) => {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
      });
    });
  });
});
