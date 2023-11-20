import React from "react";
import StockDataFetcher from "./StockDataFetcher";
import { Flex } from "@chakra-ui/react";

function StockPageAggregator() {
  return (
    <Flex
      width="100vw" // Set width to 100% of the viewport width
      minHeight="100vh" // Minimum height is 100% of the viewport height
      justifyContent="center" // Center content horizontally
      alignItems="center" // Center content vertically (when content is smaller than 100vh)
      bg="rgb(242,250,240)" // Mint background
      direction="column"
    >
      <StockDataFetcher />
    </Flex>
  );
}

export default StockPageAggregator;
