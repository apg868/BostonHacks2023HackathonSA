import { Box } from "@chakra-ui/react";

function DataFrame({ dataspec, descrip}) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center" // Center content horizontally
            bg="white"
            opacity="0.7"
            color="black"
            border="1px solid black" // Ensure border is visible
            w={{"lg":"15rem", "md":"15rem", "base":"60vw"}}
            h={{"lg":"4.5rem", "md":"4.5rem","base":"8vh"}}
            padding="0.75rem"
            fontFamily="inter, sans-serif"
            fontWeight="medium"
            borderRadius="0.5rem"
            textAlign="center"
        >
            {dataspec}{descrip}
        </Box>
    );
}

export default DataFrame;
