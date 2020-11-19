const checkString = (fieldName, fieldValue, minLength, maxLength, errors) => {
	if (!fieldValue) {
		errors.push(`${fieldName} is mandatory`);
		return;
	}
	if (fieldValue.length === 0) {
		errors.push(`${fieldName} is mandatory (white spaces are ignored)`);
	}
	if (minLength) {
		if (fieldValue.length < minLength) {
			errors.push(`${fieldName} must contain at least ${minLength} characters`);
		}
	}
	if (maxLength) {
		if (fieldValue.length > maxLength) {
			errors.push(`${fieldName} must contain a maximum of ${maxLength} characters`);
		}
	}
}

module.exports = {
	checkString
}
