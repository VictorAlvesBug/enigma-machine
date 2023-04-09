export default function createRotor(sequence, position){
    const rotor = {};

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    rotor.inputTranslation = (character) => {
        let index = alphabet.indexOf(character);
        index += 26 - position;
        index %= 26;
        return sequence[index];
    };

    rotor.outputTranslation = (character) => {
        let index = sequence.indexOf(character);
        index += position;
        index %= 26;
        return alphabet[index];
    };
    
    rotor.rotate = () => {
        position++;
        const overflow = position > 25;
        position %= 26;
        return overflow;
    };

    return rotor;
}
