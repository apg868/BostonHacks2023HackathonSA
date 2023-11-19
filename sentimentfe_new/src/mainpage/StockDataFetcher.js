// StockDataFetcher.js

import React, { useState } from 'react';
import axios from 'axios';
import {Text, Button, Flex, Box, VStack, HStack} from '@chakra-ui/react';
import LoadingPage from './LoadingPage';

const StockDataFetcher = () => {
    const [ticker, setTicker] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const csrftoken = getCookie('csrftoken');

        axios.post('http://localhost:8000/nlp/scrape_stock_data/', { ticker }, {
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        .then(response => {
            setData(response.data);
            setError('');
        })
        .catch(err => {
            setError('Failed to fetch data LOL: ' + err.message);
            setData(null);
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    const resetForm = () => {
        setData(null);
        setError('');
        setTicker('');
    };

    if (isLoading) {
        return <LoadingPage/>;
    }

    if (data || error) {
        return (
            <div>
                {data && (
                    data.error == null ? (
                        <Box bg="rgb(224,224,224)" boxShadow="xl" h="450px" w="800px" padding="2.5rem" opacity="0.85" borderRadius="1rem">
                        <VStack spacing="2rem">
                          <Text fontSize="28px" fontFamily="inter, sans-serif" fontWeight="bold" textAlign="center">
                            TradeTone analyzed {data.num_pos + data.num_neg + data.num_neut} different articles!
                          </Text>
                          <HStack spacing="2rem">
                            <Box bg="white" opacity="0.7" border="1px" color="black" borderColor="white" w="200px" padding="0.75rem" 
                                 fontFamily="inter, sans-serif" fontWeight="medium" borderRadius="0.5rem" textAlign="center">
                              {data.pos_prob * 100}% of articles likely positive
                            </Box>
                            <Box bg="white" opacity="0.7" border="1px" color="black" borderColor="white" w="200px" padding="0.75rem" 
                                 fontFamily="inter, sans-serif" fontWeight="medium" borderRadius="0.5rem" textAlign="center">
                              {data.neg_prob * 100}% of articles likely negative
                            </Box>
                            <Box bg="white" opacity="0.7" border="1px" color="black" borderColor="white" w="200px" padding="0.75rem" 
                                 fontFamily="inter, sans-serif" fontWeight="medium" borderRadius="0.5rem" textAlign="center">
                              {data.neut_prob * 100}% of articles likely neutral
                            </Box>
                          </HStack>
                          <HStack spacing="2rem">
                            <Box bg="white" opacity="0.7" border="1px" color="black" borderColor="white" w="200px" padding="0.75rem" 
                                 fontFamily="inter, sans-serif" fontWeight="medium" borderRadius="0.5rem" textAlign="center">
                              {data.num_pos} positive article(s) detected
                            </Box>
                            <Box bg="white" opacity="0.7" border="1px" color="black" borderColor="white" w="200px" padding="0.75rem" 
                                 fontFamily="inter, sans-serif" fontWeight="medium" borderRadius="0.5rem" textAlign="center">
                              {data.num_neg} negative article(s) detected
                            </Box>
                            <Box bg="white" opacity="0.7" border="1px" color="black" borderColor="white" w="200px" padding="0.75rem" 
                                 fontFamily="inter, sans-serif" fontWeight="medium" borderRadius="0.5rem" textAlign="center">
                              {data.num_neut} neutral article(s) detected
                            </Box>
                          </HStack>
                          <HStack justifyContent="center">
                          <Box bg="white" opacity="0.7" border="1px" borderColor="white" w="300px" h="75px" padding="0.75rem" borderRadius="0.5rem"
                            display="flex" alignItems="center" justifyContent="center"
                            fontFamily="inter, sans-serif" fontWeight="medium">
                        Standard Deviation: {data.std}
                        </Box>
                        <Box bg="white" opacity="0.7" border="1px" borderColor="white" w="300px" h="75px" padding="0.75rem" borderRadius="0.5rem"
                            display="flex" alignItems="center" justifyContent="center"
                            fontFamily="inter, sans-serif" fontWeight="medium">
                        Overall Rating: {data.overall_pred == 2 ? "Neutral" : data.overall_pred == 1 ? "Negative": "Positive"}
</Box>
                          </HStack>
                        </VStack>
                      </Box>
                    ) : (
                        <Text bg="rgb(211, 211, 211)" w = "400px" padding="2.5rem" opacity="0.85" borderRadius="1rem">
                            <div> The ticker you entered is invalid. Please try again! You may enter any ticker for a stock on the NASDAQ, and we'll be happy to provide you with analysis</div>incorrect div, friend!
                        </Text>
                    )
                )}
                {error && <div style={{ color: '' }}>{error}</div>}
                <Flex justifyContent="center" alignItems="center" marginTop="25px">
                    <Button onClick={resetForm} colorScheme="red">Try Another Ticker</Button>
                </Flex>
            </div>
        );
    }

    return (
            <Box
            bg="rgb(224,224,224)"
            w="400px"
            h="250px"
            padding="2rem"
            borderRadius="1rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
            >
            <form onSubmit={handleSubmit}>
            <VStack spacing="3rem">
                <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Enter Stock Ticker"
                    style={{ 
                    fontSize: "16px", 
                    width: "250px", 
                    height: "40px",
                    textAlign: "center"  // Align text to center
                    }}
                />
                <Button type="submit" bg="rgb(153, 204, 255)" position="relative">Submit</Button>
            </VStack>

            </form>
            </Box>

    );
};

export default StockDataFetcher;