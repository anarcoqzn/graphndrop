const keyWords = ['CREATE', 'DROP', 'DELETE', 'INSERT', 'ALTER', 'UPDATE','SELECT'];

module.exports = {
  randomString : (length = 36) => {
    // Declare all characters
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Pick characers randomly
    let str = '';
    for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str;
  },

  containSQLInjections: (input) => {
    const inputUp = String(input).toUpperCase();

    for (let i = 0; i < keyWords.length; i++){
      if (keyWords[i].includes(inputUp) || inputUp.includes(keyWords[i])) return true;
    }

    return false;
  }
}