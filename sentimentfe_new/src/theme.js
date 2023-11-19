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
    primaryFont: "'Roboto', sans-serif",
    secondaryFont: "'Jost', sans-serif",
    bannerFont: "'Roboto Mono', sans-serif", //not available in all weights
    specialFont1: "'Orbitron', sans-serif",//only available in 400, 500
  },
  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
  colors: {
    primaryRed: "rgb(198, 18, 31)",
    secondaryRed: "rgb(136, 7, 8)",
    primaryGray: "rgb(218, 218, 218)",
    secondaryGray: "rgb(219,219,219)"
  }
});

export default themeProv;
