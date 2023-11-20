import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';



const breakpoints = createBreakpoints({
  base: '0em', //0px
  sm: '30em',
  md: '48em',  // 768px
  lg: '70em',  // 992px
  xl: '80em',  // 1280px
});

const themeProv = extendTheme({
  breakpoints,
  fonts: {
    primaryFont: "'Inter, sans-serif"
  },
  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  colors: {
    colorPrimary: "rgb(198, 18, 31)",
    colorSecondary: "rgb(224,224,224)",
    buttonPrimary: "rgb(153, 204, 255)",
    buttonSecondary: "rgb(218, 218, 218)",
  }
});

export default themeProv;
