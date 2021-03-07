let mtext = null

function checkToFilter(Obj) {
  const name = Obj.name.toLowerCase()
  const ph_no = Obj.contactno
  const contactName = Obj.contactname.toLowerCase()

  if(name.search(mtext.toString().toLowerCase()) !== -1) {
    return true
  }
  else if(ph_no.search(mtext.toString().toLowerCase()) !== -1) {
    return true
  }
  else if(contactName.search(mtext.toString().toLowerCase()) !== -1) {
    return true
  }
  else {
    return false
  }

}

async function loanScreenSearch(List, text) {
  try {
    mtext = text
    return await List.filter(checkToFilter)
  }
  catch (e) {
    new Promise.reject(e)
  }
}

export default loanScreenSearch
