import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		//adapter: adapter(),
		adapter: adapter({ out: 'build' }),
		// Only for using ngrok
		// csrf: {
		// 	checkOrigin: false,
		//   }
	  
	}
};

export default config;
