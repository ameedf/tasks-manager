const API_PREFIX = "/api";

export const post = async (url, data) => {
	try {
		const response = await fetch(API_PREFIX + url, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		return parseResponse(response);
	} catch (err) {
		return unexpectedError();
	}
}

export const get = async url => {
	try {
		const response = await fetch(API_PREFIX + url);
		return parseResponse(response);
	} catch (err) {
		return unexpectedError();
	}
}

const unexpectedError = () => ({error: "Unexpected error occurred... Please call admin"});

const parseResponse = async response => {
	const result = await response.json();
	if (response.status === 200) {
		return {data: result};
	}
	return {errors: result.errors};
}
