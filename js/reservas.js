document.addEventListener("DOMContentLoaded", function() {
    const forms = document.querySelectorAll("[data-role='form-reserva']");
    forms.forEach(function(form) {
        form.addEventListener("submit", function(event) {
            let valido = true;
            const inputs = form.querySelectorAll("input, select, textarea");
            inputs.forEach(function(input) {
                if (input.hasAttribute("required") && !input.value.trim()) {
                    valido = false;
                    input.style.borderColor = "red";
                } else {
                    input.style.borderColor = "";
                }
                if (input.type === "email" && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        valido = false;
                        input.style.borderColor = "red";
                    }
                }
                if (input.type === "number" && input.value.trim()) {
                    const min = input.hasAttribute("min") ? parseFloat(input.min) : null;
                    const max = input.hasAttribute("max") ? parseFloat(input.max) : null;
                    const val = parseFloat(input.value);
                    if (min !== null && val < min) {
                        valido = false;
                        input.style.borderColor = "red";
                    }
                    if (max !== null && val > max) {
                        valido = false;
                        input.style.borderColor = "red";
                    }
                }
                if (input.type === "date" && input.value.trim()) {
                    const fecha = new Date(input.value);
                    if (isNaN(fecha.getTime())) {
                        valido = false;
                        input.style.borderColor = "red";
                    }
                }
            });
            if (!valido) {
                event.preventDefault();
            }
        });
    });
});
