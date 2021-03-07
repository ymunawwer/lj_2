let mtext = null

function checkToFilter(Obj) {
    const name = Obj.name.toLowerCase()
    const ph_no = Obj.contact

    if(name.search(mtext.toString().toLowerCase()) !== -1) {
        console.log("true", Obj.name)
        return true
    }
    else if(ph_no.search(mtext.toString().toLowerCase()) !== -1) {
        console.log("true", Obj.name)
        return true
    }
    else {
        console.log("false", Obj.name)
        return false
    }

}

async function homeScreenSearch(List, text) {
    try {
        mtext = text
        return await List.filter(checkToFilter)
    }
    catch (e) {
        new Promise.reject(e)
    }
}

export default homeScreenSearch
