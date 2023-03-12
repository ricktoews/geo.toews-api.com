# geo.toews-api.com

POST https://geo.toews-api.com/country-query
Request (optional): object that looks like this:
{
    "countries": [zero or more country names],
    "properties": [zero or more properties of the country object]
}
Both properties are optional. If the Request object is omitted, the API payload will be a list of all country objects.

To request a property chain, specify the chain as a dot-delimited string; e.g., "language.name" or "currency.code".


GET https://geo.toews-api.com/country-query/[comma-delimited list of country names]
There is no mechanism for specifying properties using the GET call.
