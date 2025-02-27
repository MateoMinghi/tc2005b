// Se eliminan los comentarios antiguos y se agregan nuevos comentarios explicativos

// Se ejecuta cuando se carga el DOM, inicializando variables y configurando manejadores de eventos
document.addEventListener('DOMContentLoaded', () => { 
    // Se obtienen elementos del formulario y mensajes de validación
    const form = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submitBtn');
    const matchMessage = document.querySelector('.match-message');
    const requirements = document.querySelectorAll('.req');

    // Se definen las funciones que validan cada requisito de la contraseña
    const passwordRequirements = {
        length: password => password.length >= 8,
        uppercase: password => /[A-Z]/.test(password),
        lowercase: password => /[a-z]/.test(password),
        number: password => /\d/.test(password),
        special: password => /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Función que revisa cada requisito y determina si la contraseña cumple todas las condiciones
    function updateRequirements(password) {
        let allValid = true;

        requirements.forEach(req => {
            const requirement = req.dataset.requirement;
            const isValid = passwordRequirements[requirement](password);
            // Se evalúa el estado del requisito; se omiten cambios visuales de clase
            if (!isValid) allValid = false;
        });

        return allValid;
    }

    // Función que comprueba si el valor de la contraseña y su confirmación coinciden
    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        return password && confirmPassword && password === confirmPassword;
    }

    // Se habilita el botón de envío
    submitBtn.disabled = false;

    // Manejador para el evento submit que valida la contraseña y envía la misma al servidor vía POST
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        updateRequirements(password);
        const doPasswordsMatch = checkPasswordMatch();
        const isPasswordValid = Object.values(passwordRequirements).every(requirement => requirement(password));

        // Si la contraseña es válida y coincide, se envía al servidor
        if (isPasswordValid && doPasswordsMatch) {
            fetch('/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'formData=' + encodeURIComponent(password)
            })
            .then(response => response.text())
            .then(text => {
                alert(text);
                form.reset();
                updateRequirements('');
                matchMessage.textContent = '';
            })
            .catch(err => {
                alert('Error en el envío: ' + err);
            });
        } else {
            // Si existen errores, se construye y muestra un mensaje indicando cuáles requisitos no se cumplen
            let message = 'Por favor, revise los requisitos de la contraseña:\n';
            requirements.forEach(req => {
                const requirement = req.dataset.requirement;
                if (!passwordRequirements[requirement](password)) {
                    message += `- ${req.textContent.slice(2)}\n`;
                }
            });
            alert(message);
        }
    });
});