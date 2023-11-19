//LoadingPage.js
import React from "react";
import { Box, Flex, Text, Image, HStack, VStack } from "@chakra-ui/react";

// Import your GIF image
import graph from "./assets/graph.gif";

function LoadingPage() {
  const gifStyle = {
    filter: "saturate(70%)", // Reduce saturation to 50%
    opacity: 0.9, // Set opacity to 80%
  };

  return (
    <HStack justifyContent="center">
      <VStack spacing={4}>
        <Text fontSize="25px">Crunching the numbers...</Text>
        <Image
          borderRadius="1rem"
          border = "gray"
          w="25rem"
          h="25rem"
          src={graph}
          alt="Graph"
          style={gifStyle} // Apply the styles to the Image component
        />
      </VStack>
    </HStack>
  );
}

export default LoadingPage;