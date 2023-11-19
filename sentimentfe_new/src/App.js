import logo from './logo.svg';
import './App.css';
import { ChakraProvider, chakra, Text, Box } from '@chakra-ui/react';
import themeProv from './theme';
import Test from './mainpage/test'
import StockDataFetcher from './mainpage/StockDataFetcher';


function App() {
  return (
    <ChakraProvider theme={themeProv}>
    <Text> Sample text placeholder title </Text>
    <StockDataFetcher/>
  </ChakraProvider>
  );
}

export default App;
