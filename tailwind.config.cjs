const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [require("daisyui",'tailwind-scrollbar')],
};

module.exports = config;
