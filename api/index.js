import app from "../src/app.js";

const handler = (req, res, next) => {
	if (req.url === "/api" || req.url.startsWith("/api/")) {
		req.url = req.url.slice(4) || "/";
	}

	return app(req, res, next);
};

export default handler;