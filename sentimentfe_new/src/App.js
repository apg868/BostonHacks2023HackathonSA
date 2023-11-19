import logo from './logo.svg';
import './App.css';
import { ChakraProvider, chakra, Text, Box } from '@chakra-ui/react';
import themeProv from './theme';
import StockPageAggregator from './mainpage/StockPageAggregator';
import NavBar from './mainpage/NavCat/NavBar';


function App() {
  return (
    <ChakraProvider theme={themeProv}>
    <NavBar/>
    <StockPageAggregator/>
  </ChakraProvider>
  );
}

export default App;
