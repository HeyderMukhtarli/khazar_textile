
///////////////////////////// Sidebar Functionality
const menuItems = document.querySelectorAll(".menu-item");
const submenus = document.querySelectorAll(".submenu");

// Function to close all submenus and reset arrows
const closeAllSubmenus = () => {
  submenus.forEach((submenu) => {
    submenu.classList.remove("d-block");
    submenu.classList.add("d-none");
  });

  menuItems.forEach((menuItem) => {
    const arrow = menuItem.querySelector(".arrow");
    if (arrow) {
      arrow.classList.remove("rotate");
    }
  });
};

// Function to reset font weights and remove any appended spans
const resetFontWeightsAndSpans = () => {
  menuItems.forEach((menuItem) => {
    const textElement = menuItem.querySelector("p");
    const existingSpan = textElement.querySelector("span");

    textElement.style.fontWeight = "400";
    if (existingSpan) {
      existingSpan.remove();
    }
  });
};

// Function to activate a submenu
const toggleSubmenu = (menuItem, targetSubmenu) => {
  const arrow = menuItem.querySelector(".arrow");
  const isOpen = targetSubmenu.classList.contains("d-block");

  closeAllSubmenus();

  if (!isOpen) {
    arrow.classList.add("rotate");
    targetSubmenu.classList.add("d-block");
  }
};

// Function to handle clicking on "All Products" or similar items without submenus
const handleNoSubmenuClick = (menuItem) => {
  resetFontWeightsAndSpans();
  closeAllSubmenus();

  const textElement = menuItem.querySelector("p");
  textElement.style.fontWeight = "600";
};

// Function to handle submenu item clicks
const handleSubmenuItemClick = (submenu, divTag) => {
  const menuItem = document.querySelector(`.menu-item[data-target="${submenu.id}"]`);

  // Remove active state from all submenu items
  submenus.forEach((submenu) => {
    submenu.querySelectorAll("div").forEach((item) => {
      item.classList.remove("active-submenu");
    });
  });

  // Add active state to the clicked submenu item
  divTag.classList.add("active-submenu");

  // Update the associated menu item text
  if (menuItem) {
    const textElement = menuItem.querySelector("p");
    resetFontWeightsAndSpans();

    const newSpan = document.createElement("span");
    const text = divTag.textContent.toLowerCase();
    textElement.style.fontWeight = "600";
    newSpan.textContent = `: ${text}`;

    textElement.appendChild(newSpan);
  }
};

// Attach event listeners to menu items
menuItems.forEach((menuItem) => {
  menuItem.addEventListener("click", () => {
    const targetId = menuItem.getAttribute("data-target");
    const targetSubmenu = document.getElementById(targetId);

    if (targetSubmenu) {
      toggleSubmenu(menuItem, targetSubmenu);
    } else {
      handleNoSubmenuClick(menuItem);
    }
  });
});

// Attach event listeners to submenu items
submenus.forEach((submenu) => {
  submenu.querySelectorAll("div").forEach((divTag) => {
    divTag.addEventListener("click", () => {
      handleSubmenuItemClick(submenu, divTag);
    });
  });
});

    hideSidebarButton.addEventListener("click", () => {
        sidebar.style.display = "none";
        filterButton.classList.remove("hidden");
        body.classList.remove("sidebar-open")
          const cardContainers = document.querySelectorAll(".card-container");

        cardContainers.forEach((cardContainer) => {
            cardContainer.classList.remove("custom-col-6");
        });
    });

//////////////////////////////////////////////