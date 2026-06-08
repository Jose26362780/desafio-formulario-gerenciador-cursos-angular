/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-card-hover':
          'linear-gradient(135deg, rgba(0, 179, 126, 0.12) 0%, rgba(0, 0, 0, 0.00) 50%)',
      },
    },
  },
  plugins: [],
};
