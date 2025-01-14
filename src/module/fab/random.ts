export async function Rand_Int(max: number) {
    return Math.floor(Math.random() * max);
}

export async function Randomizer_Float(min: number, max: number) {
	return min + Math.random() * (max - min);
}