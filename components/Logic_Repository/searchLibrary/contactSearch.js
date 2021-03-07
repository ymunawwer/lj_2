let mtext = null

function checkToFilter(Obj) {
    console.log(Obj)
    const name = Obj.name.toString().toLowerCase()
    let ph_no = ''

    if('phoneNumbers' in Obj && Obj.phoneNumbers[0] !== undefined) {
        ph_no = Obj.phoneNumbers[0].number.toString()
    }

    if(name.search(mtext.toString().toLowerCase()) !== -1) {
        return true
    }
    else return ph_no.search(mtext.toString().toLowerCase()) !== -1;

}

async function contactSearch(List, text) {
    try {
        console.log("contact search called...")
        console.log(text)
        mtext = text
        return await List.filter(checkToFilter)
    }
    catch (e) {
        new Promise.reject(e)
    }
}

export default contactSearch
