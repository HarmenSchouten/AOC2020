const text = await Deno.readTextFile("./Day19/input.txt")

const parts = text.split("\r\n\r\n")

const messages = parts[1].split("\r\n")

const rules = parts[0]
    .split("\r\n")
    .map(item => {
        const [key, rest] = item.split(": ")
        const isOption = item.includes("|")
        const isString = rest.includes("\"")

        return {
            key: key,
            value: rest.replaceAll("\"", ""),
            isOption: isOption,
            isString: isString
        }
    })


let value = [rules[0].value]
let i = 0;
while (true) {
    

    const test = value
        .reduce((acc, state) => {
            console.log(state)
            const isOption = state.includes(" | ")
            const isDigit = !isNaN(Number(state))

            if (isOption) {
                // Look around, replace options with new values
                const options = state.split(" | ")

                const option1 = acc.map(item => [...item, ...options[0].split(" ")])
                const option2 = acc.map(item => [...item, ...options[1].split(" ")])

                return [...option1, ...option2]
            } else {
                // Split on whitespace, put in new rule value
            }

            if (isDigit) {
                return acc.map(item => [...item, rules[Number(state)].value])
            } else {
                return acc.map(item => [...item, state])
            }
        }, [[]] as string[][])

    console.log(`========  ${i} ========= `)
    console.log(test)
    
    console.log(value)

    value = test.flatMap(item => item)
    
    i++
    
    if (i > 1) {
        break;
    }
    // if (test.every(item => !item.join("").match(/\d/g))) {
    //     break;
    // }
}

// console.log(value.map(item => item.join("")))
// console.log(messages)

// const answer = value.filter(item => messages.find(message => message === item.join("")) !== undefined).length

// console.log(answer)