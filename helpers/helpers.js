const countryData = require('../data/data.json');
//const countryData = require('../country-data.json');

/* "Normalize" strings for comparison: Lowercase, and strip diacritical marks. */
function fixString(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}


/* Search alternate country names. */
function checkAltNames(searchFor, countryRecord) {
	if (!countryRecord.hasOwnProperty('alt_names')) return;

	const altName = fixString(searchFor);
	let result = false;
	countryRecord.alt_names.forEach(item => {
			console.log(`====> search for ${altName}, ${item}, ${fixString(item)}`);
		if (fixString(item) === altName) {
			result = true;
		}
	});
	return result;
}


// This is to allow the call to return embedded properties separated by .
function getChainedProperty(obj, chainStr) {
    let result = obj;
    const propertyChain = chainStr.split('.');
    for (let property of propertyChain) {
        result = result[property];
    }
    return result;
}


function getProperties(countryObject, properties) {
	// If no properties requested, return the entire object.
	if (properties.length === 0) return countryObject;

	const countryProperties = {};
	for (let property of properties) {
		countryProperties[property] = getChainedProperty(countryObject, property);
	}
	return countryProperties;
}


function getCountryData(countries, properties = []) {
	const payload = [];

	// If no country is specified, return the lot.
	if (countries.length === 0) {
		countryData.forEach(country => {
			payload.push(getProperties(country, properties));
		});
	}

	// Otherwise, return data for specified country / countries.
	else {
		countries.forEach(country => {
			const rec = countryData.find(item => fixString(item.country) === fixString(country));
			if (!rec) {
				const alt = countryData.find(item => checkAltNames(country, item));
				if (!alt) {
					payload.push({ country, err: "Not recognized" });
				}

				else {
					payload.push(getProperties(alt, properties));
				}
			}

			else {
				payload.push(getProperties(rec, properties));
			}
		});
	}

	return payload;
}

module.exports = getCountryData;
