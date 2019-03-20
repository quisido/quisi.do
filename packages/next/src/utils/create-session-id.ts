/**
 *   At 54 characters long, \w{18}-\w{18}-\w{18}, there are more possibilities
 * than atoms in the universe. 36^54 ~= 10^84, which is > 10^82.
 */
const CHARACTERS = '0123456789abcdefghijklmnopqrstuvwxyz';
const SECTION_LENGTH = 18;
const SECTIONS_COUNT = 3;

const getRandomCharacter = (): string => {
  const index: number = Math.floor(Math.random() * CHARACTERS.length);
  return CHARACTERS.charAt(index);
};

export default function createSessionId(): string {
  const sections: string[] = [];
  for (let i = 0; i < SECTIONS_COUNT; i++) {
    const section: string[] = [];
    for (let j = 0; j < SECTION_LENGTH; j++) {
      section.push(getRandomCharacter());
    }
    sections.push(section.join(''));
  }
  return sections.join('-');
}
