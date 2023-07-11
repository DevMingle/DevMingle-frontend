/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		domains: ["images.pexels.com"],
	},
	env: {
		base_url: "http://localhost:8000",
	}
};

module.exports = nextConfig;
