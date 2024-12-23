class CommonUtil {
  /* 
    // usage
    const randomWord = CommonUtil.generateRandomWord();
   */
  static generateRandomWord() {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let randomWord = "";

    while (randomWord.length < 6) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomChar = characters.charAt(randomIndex);

      randomWord += randomChar;
    }

    // add ms
    randomWord += "_" + String(Date.now()).slice(-5);

    return randomWord;
  }

  /* 
    // usage
    // min and max included
    const randomNumber = CommonUtil.generateRandomNumber(0, 10);
   */
  static generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

export default CommonUtil;
