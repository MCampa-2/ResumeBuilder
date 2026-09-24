/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
     './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: 
    {
      colors:{
        "shadowGrey": "#272838ff",
        "vintageGrape": "#5d536bff",
        "vintageLavender": "#7d6b91ff",
        "lavenderGrey": "#989fceff",
        "steelBlue": "#347fc4ff",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

