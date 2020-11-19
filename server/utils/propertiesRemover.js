const removeProperties = (obj, properties) => {
	const result = {...obj};
	for (const property of properties) {
		delete result[property];
	}
	return result;
}

module.exports = removeProperties;
