const text = await Deno.readTextFile("./Day15/input.txt")

const numbersMap = {} as Record<string, number[]>

const numbers = text.split(",").map(Number)

const addOrUpdateMap = (index: number, round: number) => 
    !numbersMap[index]
        ? numbersMap[index] = [round + 1]
        : numbersMap[index] = [round + 1, numbersMap[index][0]]

let lastSpokenNumber = 0
for (let i = 0; i < 30_000_000; i++) {
    if (i < numbers.length) {
        const currentNumber = numbers[i]
        addOrUpdateMap(currentNumber, i)
        lastSpokenNumber = currentNumber
    } else {
        if (numbersMap[lastSpokenNumber].length === 1) {
            addOrUpdateMap(0, i)
            lastSpokenNumber = 0
        } else {
            const lastRound = numbersMap[lastSpokenNumber][0]
            const roundBefore = numbersMap[lastSpokenNumber][1]
            lastSpokenNumber = lastRound - roundBefore
            addOrUpdateMap(lastSpokenNumber, i)
        }
    }
}

console.log("Part 2", lastSpokenNumber)