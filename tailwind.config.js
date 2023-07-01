/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				"text-dark": "#f7faf4",
				"bg-dark": "#292a3f",
				"primary-btn": "#6f449c",
				"secondary-btn": "#261a37",
				"accent-dark": "#6f449c",
				"dark-nav": "#262329",
			},
		},
	},
	plugins: [require("daisyui"), require("@tailwindcss/forms")],
	darkMode: "class",
	daisyui: {
		themes: [],
	},
};
