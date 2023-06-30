/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        sirp: {
          primary: '#B22735',
          primaryLess1: '#E0A9AE',
          secondary: '#ffee88',
          lightGrey: '#F3F5F6',
          grey: '#545C62',
          greyShadow: '#F7E9EB',
          secondary1: '#FFEE88',
        },
      },
    },
  },
  plugins: [],
};
