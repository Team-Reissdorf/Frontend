// Toast.js
class Toast {
    constructor() {
        this.toastContainer = null;
        this.initToastContainer();
    }

    initToastContainer() {
        if (!this.toastContainer) {
            this.toastContainer = document.createElement("div");
            this.toastContainer.classList.add("toast-container", "position-fixed", "bottom-0", "end-0", "p-3");
            document.body.appendChild(this.toastContainer);
        }
    }

    showToast(message, options = {}) {
        const { type = "primary", autoHide = true, delay = 5000 } = options;

        const toastHTML = `
        <div class="toast text-bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
        `;

        const toastWrapper = document.createElement("div");
        toastWrapper.innerHTML = toastHTML;
        const toastElement = toastWrapper.firstElementChild;
        this.toastContainer.appendChild(toastElement);

        const toastInstance = new bootstrap.Toast(toastElement, { autohide: autoHide, delay });
        toastInstance.show();

        toastElement.addEventListener("hidden.bs.toast", () => {
            toastElement.remove();
        });
    }
}

// Statt `export default`, häng das Objekt an `window`:
window.toast = new Toast();