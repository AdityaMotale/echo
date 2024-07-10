/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				display: ['Epilogue Variable', 'sans-serif'],
				sans: ['Space Grotesk Variable', 'sans-serif']
			},
			colors: {
				accent: '#9747FF',
				bg: '#F9F9F9',
				secBg: '#EEEEEE',
				border: '#F8F8F8',
				primary: '#0C0C0C',
				secondary: '#F6F6F6'
			}
		}
	},
	plugins: []
};
