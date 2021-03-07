let key = 'A'

function checkToFilter(Obj) {

    if(key === 'A') {
        return true
    }
    else if(key === 'R') {
        return Obj['rAmount'] > Obj['pAmount']
    }
    else if(key === 'P') {
        return Obj['pAmount'] > Obj['rAmount']
    }
    else if(key === 'S') {
        return Obj['rAmount'] === Obj['pAmount']
    }
}

async function filterAlgo(Arr, property) {
    try {
        key = property
        return await Arr.filter(checkToFilter)
    }
    catch (e) {
        new Promise.reject(e)
    }

}

export default filterAlgo
