import { getRandomInt } from "@/utils/getRandom";
import { categories, WavelengthCategory } from "../data/categories";

const MIN_NUMBER = 1;
const MAX_NUMBER = 10;
/**
 * Returns a random number between 1 and 10 (inclusive).
 * @returns {number} A random integer between min and max
 */
export function getRandomNumber(): number {
  return getRandomInt(MIN_NUMBER, MAX_NUMBER);
}

const SCORE_MULTIPLIER = 1;
export function getGuessPoints(targetNumber: number, selectedNumber: number): number {
  const difference = Math.abs(targetNumber - selectedNumber);
  return difference < 2 ? (3 - difference) * SCORE_MULTIPLIER : 0;
}

/**
 * Returns points based on the average of total player points
 */
export function getHostPoints(playerPoints: number[]): number {
  if (playerPoints.length === 0) return 0;

  const total = playerPoints.reduce((sum, p) => sum + p, 0);
  const average = total / playerPoints.length;

  return Math.round(average);
}

export function getCategory(): WavelengthCategory {
  const randomIndex = getRandomInt(0, categories.length - 1);
  return categories[randomIndex];
}
