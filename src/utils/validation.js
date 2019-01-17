function validateNumInDiapason(value, min, max) {
    return new Promise(
        (resolve, reject) => {
            let newValue;

            if (value < min) {
                newValue = min
            } else if (value > max) {
                newValue = max
            }

            if (newValue) {
                reject(newValue)
            } else {
                resolve(value)
            }
        }
    )
}

function validateISBN(value) {
    return new Promise(
        (resolve, reject) => {
            let newValue = value;
            if (newValue[newValue.length - 1] == 'X') {
                newValue = newValue.replace(/[^\d\-X]/ig, '');
            } else {
                newValue = newValue.replace(/[^\d\-]/ig, '');
            }

            resolve(newValue)
        }
    )
}

function validateImgUrl(value) {
    return new Promise(
        (resolve, reject) => {
            let newValue;

            if (/\.\w{2,3}\/.+/ig.test(value)) {
                newValue = value
            } else {
                newValue = ''
            }

            resolve(newValue)
        }
    )
}

export {
    validateNumInDiapason,
    validateISBN,
    validateImgUrl
}