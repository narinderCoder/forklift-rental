// /** @type {import('tailwindcss').Config} config */
const config = {
  content: ['./app/**/*.php', './resources/**/*.{php,vue,js}'],
  theme: {
    extend: {
      backgroundImage: {
        "home-banner": "url('https://klift-rentals.test/app/uploads/2024/05/home-forklift-scaled.jpg')",
        "home-contact-banner": "url('/images/banners/home-contact-us.jpg')",
      },
      colors: {
        primary: {
          500: "#008FC1",
          900: "#53D0FD",
        },
        secondary: {
          500: "#404040",
        },
        tertiary: {
          500: "#F5FBFD",
        },
        rating: "#FFD600",
      },
    },
  },
  plugins: [],
};

export default config;
