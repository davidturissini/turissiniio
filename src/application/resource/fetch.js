var serverFetch = require('./server/fetch');
var browserFetch = require('./browser/browserFetch');

if(typeof window !== 'undefined') {
	module.exports = browserFetch;
} else {
	module.exports = serverFetch;
}