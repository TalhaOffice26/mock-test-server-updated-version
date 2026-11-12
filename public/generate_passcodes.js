function generateRandomStrings() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/';
  const strings = [];

  for (let i = 0; i < 100; i++) {
    let str = '';
    for (let j = 0; j < 12; j++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    strings.push(str);
  }

  return strings;
}


const randomStrings = generateRandomStrings();
console.log(randomStrings);
