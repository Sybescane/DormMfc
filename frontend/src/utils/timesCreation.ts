type timeType = {
    time: string,
    isBusy: boolean
}
type freeTimesType = {
    [key: string]: Array<timeType>
}

export function createTimes(timesArr: Array<{ time: string }>): freeTimesType {
    let freeTimes: freeTimesType = {
        '25': [],
        '26': [],
        '27': [],
        '28': [],
        '29': [],
        '30': [],
        '31': []
    }
    const fullFree: Array<timeType> = []
    for (let i = 9; i <= 17; i++) {
        for (let j = 0; j <= 45; j += 15) {
            fullFree.push({
                time: `${i}:${j === 0 ? '00' : j}`,
                isBusy: false
            })
        }
    }
    for (let key in freeTimes) {
        freeTimes[key] = [...fullFree]
    }
    console.log('timesAerr', timesArr)
    timesArr.forEach(timeObj => {
        const date = timeObj.time.substring(8, 10)
        const time = timeObj.time.substring(11, 16)
        const foundIndex = freeTimes[date].findIndex(val => val.time === time)
        if (foundIndex !== -1) {
            freeTimes[date][foundIndex].isBusy = true
            console.log('freeTimes', freeTimes)
        }
    })
    return freeTimes
}