/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 *
 * @param {number} min - The minimum integer
 * @param {number} max - The maximum integer
 * @returns {number} A random integer between min and max
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ROOM_ID_LENGTH = 6;
const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 *
 * @returns A random alphanumeric uppercase string of length 6
 */
export function getRandomRoomId(): string {
  // TODO: add way to check id doesn't exist? here or Room Manager
  let result = "";
  for (let i = 0; i < ROOM_ID_LENGTH; i++) {
    result += CHARACTERS.charAt(getRandomInt(0, CHARACTERS.length - 1));
  }
  return result;
}
