document.addEventListener("DOMContentLoaded", () => {

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