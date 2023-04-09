import createEnigma from './enigma.js';

let message = 'Esta é uma mensagem em português, com acentuação e pontuação.';
//let message = 'AAAAA BBBBB CCCCC DDDDD';

message = message.toUpperCase();
//message = removeEspecialCharacters(message);

const options = {
  plugs: {
    A: 'H',
    C: 'O',
    D: 'E',
    G: 'Z',
    I: 'J',
    K: 'M',
    L: 'Q',
    N: 'Y',
    P: 'S',
    T: 'W'
  },
  reflector: 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
  rotorsIndexToUse: [0, 1, 2],
  rotorsPosition: [0, 0, 0],
};

const enigmaToEncrypt = createEnigma(options);
const enigmaToDecrypt = createEnigma(options);

const cipherMessage = enigmaToEncrypt.crypt(message);
const recipherMessage = enigmaToDecrypt.crypt(cipherMessage);

console.log(message);
console.log(cipherMessage);
console.log(recipherMessage);

function removeEspecialCharacters(text) {
  const especialCharacters = {
    A: ['Á', 'À', 'Â', 'Ã'],
    C: ['Ç'],
    E: ['É', 'È', 'Ê'],
    I: ['Í', 'Ì', 'Î'],
    O: ['Ó', 'Ò', 'Ô', 'Õ'],
    U: ['Ú', 'Ù', 'Û'],
  };

  text = text
    .split('')
    .map((character) => {
      const match = Object.entries(especialCharacters).find(
        ([_, especialLetters]) => {
          return especialLetters.includes(character);
        }
      );

      if (match) return match[0];

      return character;
    })
    .join('');

  return text;
}
