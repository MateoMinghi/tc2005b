// Se ejecuta cuando el DOM carga
// Escucha el evento DOMContentLoaded para ejecutar el código cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => { //se ejecuta cuando el DOM carga
    // Obtiene elementos del formulario y de validación
    const form = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submitBtn');
    const matchMessage = document.querySelector('.match-message');
    const requirements = document.querySelectorAll('.req');

    // Define los requerimientos de la contraseña
    const passwordRequirements = {
        length: password => password.length >= 8,
        uppercase: password => /[A-Z]/.test(password),
        lowercase: password => /[a-z]/.test(password),
        number: password => /\d/.test(password),
        special: password => /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Función para actualizar el estado de los requisitos de la contraseña
    function updateRequirements(password) {
        let allValid = true;

        requirements.forEach(req => {
            const requirement = req.dataset.requirement;
            const isValid = passwordRequirements[requirement](password);
            // Eliminado: actualización de color de texto
            // req.classList.toggle('valid', isValid);
            if (!isValid) allValid = false;
        });

        return allValid;
    }

    // Función para verificar si las contraseñas coinciden
    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const doMatch = password && confirmPassword && password === confirmPassword;

        return doMatch;
    }

    // Habilita siempre el botón de envío
    submitBtn.disabled = false;

    // Maneja el envío del formulario y valida la contraseña
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = passwordInput.value; // Obtiene la contraseña
        const confirmPassword = confirmPasswordInput.value;

        updateRequirements(password);
        const doPasswordsMatch = checkPasswordMatch();
        const isPasswordValid = Object.values(passwordRequirements)
            .every(requirement => requirement(password));

        if (isPasswordValid && doPasswordsMatch) {
            // Si la contraseña es válida y coincide, muestra mensaje de éxito
            alert('¡Contraseña creada exitosamente!');
            form.reset();
            updateRequirements('');
            matchMessage.textContent = '';
        } else {
            // Si hay errores, muestra los mensajes correspondientes
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