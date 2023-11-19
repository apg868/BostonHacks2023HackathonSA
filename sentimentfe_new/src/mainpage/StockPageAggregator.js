import React from "react";
import StockDataFetcher from "./StockDataFetcher";
import { Flex, Text } from "@chakra-ui/react";

function StockPageAggregator() {
  return (
    <Flex
      width="100vw" // Set width to 100% of the viewport width
      height="100vh" // Set height to 100% of the viewport height
      justifyContent="center" // Center content horizontally
      alignItems="center" // Center content vertically
      bg="rgb(242,250,240)"
    >
      <Flex direction="column" align="center">
        <StockDataFetcher />
      </Flex>
    </Flex>
  );
}

export default StockPageAggregator;
