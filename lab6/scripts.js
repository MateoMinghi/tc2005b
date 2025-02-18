document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = document.getElementById('submitBtn');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    const matchMessage = document.querySelector('.match-message');
    const requirements = document.querySelectorAll('.req');
    const toggleButtons = document.querySelectorAll('.toggle-password');

    const passwordRequirements = {
        length: password => password.length >= 8,
        uppercase: password => /[A-Z]/.test(password),
        lowercase: password => /[a-z]/.test(password),
        number: password => /\d/.test(password),
        special: password => /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    function calculatePasswordStrength(password) {
        if (!password) return 0;
        
        let score = 0;
        const checks = [
            password.length >= 8,
            password.length >= 12,
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password),
            /[!@#$%^&*(),.?":{}|<>]/.test(password),
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{12,}$/.test(password)
        ];

        score = checks.filter(Boolean).length;
        
        const strengthLevels = {
            0: { text: 'Muy débil', class: 'strength-weak' },
            1: { text: 'Débil', class: 'strength-weak' },
            2: { text: 'Regular', class: 'strength-fair' },
            3: { text: 'Buena', class: 'strength-good' },
            4: { text: 'Fuerte', class: 'strength-strong' },
            5: { text: 'Muy fuerte', class: 'strength-very-strong' }
        };

        return strengthLevels[Math.min(score, 5)];
    }

    function updatePasswordStrength(password) {
        const strength = calculatePasswordStrength(password);
        strengthText.textContent = strength.text;
        
        // Remove all strength classes
        strengthBar.parentElement.classList.remove('strength-weak', 'strength-fair', 'strength-good', 'strength-strong', 'strength-very-strong');
        
        if (password) {
            strengthBar.parentElement.classList.add(strength.class);
        }
    }

    function updateRequirements(password) {
        let allValid = true;
        
        requirements.forEach(req => {
            const requirement = req.dataset.requirement;
            const isValid = passwordRequirements[requirement](password);
            req.classList.toggle('valid', isValid);
            req.textContent = `${isValid ? '✓' : '✗'} ${req.textContent.slice(2)}`;
            if (!isValid) allValid = false;
        });

        return allValid;
    }

    function checkPasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const doMatch = password && confirmPassword && password === confirmPassword;

        matchMessage.textContent = confirmPassword ? 
            (doMatch ? '¡Las contraseñas coinciden!' : 'Las contraseñas no coinciden') : '';
        matchMessage.classList.toggle('valid', doMatch);
        matchMessage.classList.toggle('invalid', confirmPassword && !doMatch);

        return doMatch;
    }

    function updateSubmitButton() {
        const password = passwordInput.value;
        const isPasswordValid = Object.values(passwordRequirements)
            .every(requirement => requirement(password));
        const doPasswordsMatch = checkPasswordMatch();
        
        submitBtn.disabled = !(isPasswordValid && doPasswordsMatch);
    }

    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const input = e.target.closest('.password-input-wrapper').querySelector('input');
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            e.target.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '🔒';
        });
    });

    passwordInput.addEventListener('input', (e) => {
        const password = e.target.value;
        updatePasswordStrength(password);
        updateRequirements(password);
        checkPasswordMatch();
        updateSubmitButton();
    });

    confirmPasswordInput.addEventListener('input', () => {
        checkPasswordMatch();
        updateSubmitButton();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Contraseña creada exitosamente!');
        form.reset();
        updatePasswordStrength('');
        updateRequirements('');
        matchMessage.textContent = '';
        submitBtn.disabled = true;
    });
});