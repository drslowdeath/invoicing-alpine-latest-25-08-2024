/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "!./node_modules",
    "./**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        vdark: {
          "50": "#E8E8ED",
          "100": "#D1D1DC",
          "200": "#A2A2B8",
          "300": "#747495",
          "400": "#4F4F68",
          "500": "#2D2D3B",
          "600": "#23232E",
          "700": "#1A1A23",
          "800": "#121217",
          "900": "#09090C",
          "950": "#040406"
        },
        vgray: { 
          "50": "#EDF1F2",
          "100": "#DEE5E7",
          "200": "#BBC8CE",
          "300": "#9AAEB6",
          "400": "#77929C",
          "500": "#5C757F",
          "600": "#495D65",
          "700": "#38474D",
          "800": "#242E32",
          "900": "#13191B",
          "950": "#090B0C"
        }, 
        vred: { 
         "50": "#FFF1F0",
          "100": "#FFDEDC",
          "200": "#FFC1BD",
          "300": "#FEA09A",
          "400": "#FE7F76",
          "500": "#FE5F55",
          "600": "#FE2111",
          "700": "#CB0F01",
          "800": "#890A01",
          "900": "#420500",
          "950": "#230300"
        }, 
        vblue: { 
          "50": "#FFFFFF",
          "100": "#FAFCFF",
          "200": "#F5F8FF",
          "300": "#F0F5FF",
          "400": "#EBF2FF",
          "500": "#E8F0FF",
          "600": "#85AFFF",
          "700": "#2470FF",
          "800": "#0044C2",
          "900": "#002261",
          "950": "#001233" 

        }, 
        'vpalered': { 
          "50": "#FEFBFB",
          "100": "#FEFBFB",
          "200": "#FDF7F7",
          "300": "#FBF3F3",
          "400": "#F9ECEC",
          "500": "#F8E9E9",
          "600": "#E09E9E",
          "700": "#CA5959",
          "800": "#932F2F",
          "900": "#491717",
          "950": "#230B0B"
        },
        'vwhite': {
          "50": "#ececec",
          "100": "#FCFCFC",
          "200": "#F7F7F7",
          "300": "#F5F5F5",
          "400": "#F0F0F0",
          "500": "#ECECEC",
          "600": "#BDBDBD",
          "700": "#8F8F8F",
          "800": "#5E5E5E",
          "900": "#303030",
          "950": "#171717"
        }
      },
    },
  },
  plugins: [],
}

