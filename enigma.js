import createRotor from './rotor.js';

export default function createEnigma(options) {
  const { plugs, reflector, rotorsIndexToUse, rotorsPosition } = options;

  const rotorsSequence = [
    'EKMFLGDQVZNTOWYHXUSPAIBRCJ',
    'AJDKSIRUXBLHWTMCQGZNPYFVOE',
    'BDFHJLCPRTXVZNYEIWGAKMUSQO',
    'ESOVPZJAYQUIRHXLNFTGKDCMWB',
    'VZBRGITYUPSDNHLXAWMJQOFECK',
    'JPGVOUMFYQBENHZRDKASXLICTW',
    'NZJHGRCXMYSWBOUFAIVLPEKQDT',
    'FKQHTLXOCBJSPDZRAMEWNIUYGV',
  ];

  const rotors = [];

  rotorsIndexToUse.forEach((rotorIndexToUse, index) => {
    const sequence = rotorsSequence[rotorIndexToUse];
    const position = rotorsPosition[index];
    rotors.push(createRotor(sequence, position));
  });

  Object.entries(plugs).forEach(([key, value]) => {
    plugs[value] = key;
  });

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const turnRotors = () => {
    let index = rotors.length - 1;
    while (index >= 0) {
      const overflow = rotors[index].rotate();
      if (overflow) {
        index--;
      } else {
        index = -1;
      }
    }
  };

  const applyPlugs = (character) => {
    return plugs[character] ?? character;
  };

  const applyReflector = (character) => {
    const index = alphabet.indexOf(character);
    return reflector[index];
  };

  const getCipherCharacter = (character) => {
    character = applyPlugs(character);

    rotors.forEach((rotor) => {
      character = rotor.inputTranslation(character);
    });

    character = applyReflector(character);

    const rotorBackward = [...rotors].reverse();

    rotorBackward.forEach((rotor) => {
      character = rotor.outputTranslation(character);
    });

    character = applyPlugs(character);

    return character;
  };

  const crypt = (message) => {
    let output = '';

    message.split('').forEach((character) => {
      if (alphabet.includes(character)) {
        const cipherCharacter = getCipherCharacter(character);
        output += cipherCharacter;
        turnRotors();
      } else {
        output += character;
      }
    });

    return output;
  };

  return {
    crypt,
  };
}
