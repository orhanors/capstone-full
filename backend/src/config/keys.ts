//const LIVE = process.env.NODE_ENV === "production";
const LIVE = true;

if (LIVE) {
	module.exports = require("./prod");
} else {
	module.exports = require("./dev");
}
