export function getValueCumulative(obj){
    return Object.values(obj)
}

export function getKeys(obj) {
    return Object.keys(obj)
}

export function getValueDays(obj) {
    return Object.values(obj).map((item, index, arr) => {
        if(arr[index + 1] !== undefined) {
            return Math.abs(item - arr[index + 1])
        } 
        
        return 0
    })
}