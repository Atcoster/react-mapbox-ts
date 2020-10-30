// Generate a random number with min and max included
export function randomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
