const generatePassword = (length, useSpecialChars) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const specialChars = '!@#$%^&*()_+';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        if (useSpecialChars) {
            const random = Math.floor(Math.random() * 2);
            if (random === 0) {
                password += characters.charAt(Math.floor(Math.random() * characters.length));
            } else {
                password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
            }
        } else {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }

    return password;
};

module.exports = { generatePassword };
