function compareValues(key, type, order) {
    return function innerSort(a, b) {
        if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }

        if(type === 'number') {
            a[key] = Number(a[key])
            b[key] = Number(b[key])
        }
        else if(type === 'timestamp') {
            const d1 = new Date(a[key])
            const d2 = new Date(b[key])
            a[key] = d1.getTime()
            b[key] = d2.getTime()
        }
        else if(type === 'string') {
            a[key] = a[key].toString().toUpperCase()
            b[key] = b[key].toString().toUpperCase()
        }

        const varA = a[key]
        const varB = b[key]

        let comparison = 0;
        if(varA > varB) {
            comparison = 1;
        }
        else if(varA < varB) {
            comparison = -1;
        }

        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    }
}

async function sortAlgo(Arr, property) {
    try {

        let key = 'Most Recent'
        let keyType = 'string'
        let order = 'asc'

        if(property === 'Most Recent') {
            key = 'lastupdated'
            keyType = 'timestamp'
            order = 'desc'
        }
        else if(property === 'Highest Amount') {
            key = 'netAmount'
            keyType = 'number'
            order = 'desc'
        }
        else if(property === 'By Name(A-Z)') {
            key = 'name'
            keyType = 'string'
            order = 'asc'
        }
        else if(property === 'Oldest') {
            key = 'lastupdated'
            keyType = 'timestamp'
            order = 'asc'
        }
        else if(property === 'Least Amount') {
            key = 'netAmount'
            keyType = 'number'
            order = 'asc'
        }

        return await Arr.sort(compareValues(key, keyType, order))
    }
    catch(e) {
        new Promise.reject(e)
    }
}

export default sortAlgo
