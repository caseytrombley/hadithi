function getEmptyFields(objectToValidate) {
    return Object.keys(Object.fromEntries(Object.entries(objectToValidate).filter(([_, v]) => v === "")));
}

function validateRequiredFields(objectToValidate){
    const emptyFields = getEmptyFields(objectToValidate);
    let validationMessage = "";

    if(emptyFields.length === 0){
        return {'valid': true, 'message': 'all required fields are valid!'};
    }
    emptyFields.forEach(emptyField => {
        validationMessage += `[${emptyField}] field is required!\n`;
    });

    return {'valid': false, 'message': validationMessage.toString()};
}

export {
    validateRequiredFields
};
