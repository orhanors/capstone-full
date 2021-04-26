const LIVE = process.env.NODE_ENV === "production";

if (LIVE) {
	module.exports = require("./prod");
} else {
	module.exports = require("./dev");
}
