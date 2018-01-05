export function wait(timePeriod){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), timePeriod);
    })
}