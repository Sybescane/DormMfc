export function createTimes(timesArr: Array<{ time: string }>): { [key: string]: Array<string> } {
    type freeTimesType = {
        [key: string]: string[]
    }
    let freeTimes: freeTimesType = {
        '25': [],
        '26': [],
        '27': [],
        '28': [],
        '29': [],
        '30': [],
        '31': []
    }
    const fullFree: Array<string> = []
    for (let i = 9; i <= 17; i++) {
        for (let j = 0; j <= 45; j += 15) {
            fullFree.push(`${i}:${j === 0 ? '00' : j}`)
        }
    }
    for (let key in freeTimes) {
        freeTimes[key] = [...fullFree]
    }
    console.log('timesAerr', timesArr)
    timesArr.forEach(timeObj => {
        const date = timeObj.time.substring(8, 10)
        const time = timeObj.time.substring(11, 16)
        const foundIndex = freeTimes[date].findIndex(val => val === time)
        if (foundIndex !== -1) {
            freeTimes[date].splice(foundIndex, 1)
            console.log('freeTimes', freeTimes)
        }
    })
    console.log('times creation', freeTimes)
    freeTimes["29"] = []
    return freeTimes
}