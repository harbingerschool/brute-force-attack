/**
 * This file contains a JS class that illustrates a brute-force attack on an ASCII character string
 * by counting through the ramge of ASCII characters, and testing every possibility.
 *
 * ASCII CHARS (for reference)
{
  "31": "",      "32": " ",     "33": "!",     "34": "\"",    "35": "#",    
  "36": "$",     "37": "%",     "38": "&",     "39": "'",     "40": "(",    
  "41": ")",     "42": "*",     "43": "+",     "44": ",",     "45": "-",    
  "46": ".",     "47": "/",     "48": "0",     "49": "1",     "50": "2",    
  "51": "3",     "52": "4",     "53": "5",     "54": "6",     "55": "7",    
  "56": "8",     "57": "9",     "58": ":",     "59": ";",     "60": "<",    
  "61": "=",     "62": ">",     "63": "?",     "64": "@",     "65": "A",    
  "66": "B",     "67": "C",     "68": "D",     "69": "E",     "70": "F",    
  "71": "G",     "72": "H",     "73": "I",     "74": "J",     "75": "K",    
  "76": "L",     "77": "M",     "78": "N",     "79": "O",     "80": "P",    
  "81": "Q",     "82": "R",     "83": "S",     "84": "T",     "85": "U",    
  "86": "V",     "87": "W",     "88": "X",     "89": "Y",     "90": "Z",    
  "91": "[",     "92": "\\",    "93": "]",     "94": "^",     "95": "_",    
  "96": "`",     "97": "a",     "98": "b",     "99": "c",     "100": "d",    
  "101": "e",    "102": "f",    "103": "g",    "104": "h",    "105": "i",    
  "106": "j",    "107": "k",    "108": "l",    "109": "m",    "110": "n",    
  "111": "o",    "112": "p",    "113": "q",    "114": "r",    "115": "s",    
  "116": "t",    "117": "u",    "118": "v",    "119": "w",    "120": "x",    
  "121": "y",    "122": "z",    "123": "{",    "124": "|",    "125": "}",    
  "126": "~",    "127": ""
}
*/


class BruteForcePasswordBreaker {
  constructor(pass) {
    this.min = 97;
    this.max = 123;
    this.password = pass;
    this.guess = '';
    this.inProgress = true;
  }

  /**
   * 
   * @param {*} s string to replace
   * @param {*} charIndex index of the char to replace
   * @param {*} asciiIndex the index of the new ascii char
   */
  replaceChar(s, charIndex, asciiIndex) {
    return s.substring(0, charIndex) + String.fromCharCode(asciiIndex) + s.substring(charIndex + 1);
  }

  bfLoop(index) {
    // loop through all characters in specified range
    for (let i = this.min; i < this.max; i++) {
      this.guess = this.replaceChar(this.guess, index, i); // replace character in string (at index) with ASCII character (i) 
      /* 
        if index parameter is less than length of the guess, 
        recurse to (index+1) and start loop again
       */
      if (index < this.guess.length - 1) {
        this.bfLoop(index + 1);
      }
      console.log('guess: ' + this.guess); // comment out for faster porcessing!
      if (this.guess === this.password) { // if guess equals password, SUCCESS!
        console.log("---PASSWORD CRACKED---");
        console.log('Password is: ' + this.guess);
        process.exit();
      }
    }
  }

  bfBreaker() {
    // while the password has not been cracked
    while (this.inProgress) {
      this.guess += String.fromCharCode(this.min); // append first char in ASCII table
      // while all possibilities of the current guess length have not been tested
      for (let i = 0; i < this.guess.length - 1; i++) { 
        // loops to replace current (i) with all ASCII chars  
        for (let j = this.min; j < this.max; j++) {
          this.guess = this.replaceChar(this.guess, i, j); // replace position (i) in this.guess with ASCII (j)
          this.bfLoop(i + 1);
        }
      }
    }
  }
}

// constructor takes password to be cracked
let breaker = new BruteForcePasswordBreaker('xyz');

// run the breaker
breaker.bfBreaker();