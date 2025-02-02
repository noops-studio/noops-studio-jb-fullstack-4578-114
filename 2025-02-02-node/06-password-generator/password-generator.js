const generatePassword = (lenth) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < lenth; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
}


module.exports = {generatePassword};