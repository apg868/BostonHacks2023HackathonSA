import { VStack, Text, HStack } from "@chakra-ui/react";
import DataFrame from "./DataFrame";

function DataMed({ data }) {
  return (
    <VStack bg="colorSecondary" boxShadow="xl" h="28rem" w="45rem" padding="1rem" opacity="0.85" borderRadius="1rem" spacing="1rem"
    marginTop="3rem">
      <Text fontSize="28px" fontFamily="inter, sans-serif" fontWeight="bold" textAlign="center">
        TradeTone analyzed {data.num_pos + data.num_neg + data.num_neut} different articles!
      </Text>
      <HStack spacing="4rem">
        <DataFrame dataspec={Math.round(data.pos_prob * 100)} descrip="% of articles likely positive" />
        <DataFrame dataspec={Math.round(data.neg_prob * 100)} descrip="% of articles likely negative" />
      </HStack>
      <HStack spacing="4rem">
        <DataFrame dataspec={Math.round(data.neut_prob * 100)} descrip="% of articles likely neutral" />
        <DataFrame dataspec={data.num_pos} descrip=" positive article(s) detected" />
      </HStack>
      <HStack spacing="4rem">
        <DataFrame dataspec={data.num_neg} descrip=" negative article(s) detected" />
        <DataFrame dataspec={data.num_neut} descrip=" neutral article(s) detected" />
      </HStack>
      <HStack justifyContent="center" spacing=" 4rem">
        <DataFrame dataspec={data.std} descrip=" Standard Deviation" />
        <DataFrame dataspec={data.overall_pred == 2 ? "Neutral" : data.overall_pred == 1 ? "Negative" : "Positive"} descrip=" Overall Rating" />
      </HStack>
    </VStack>
  );
}

export default DataMed;
