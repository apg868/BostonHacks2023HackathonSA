// StockDataFetcher.js

import React, { useState } from 'react';
import axios from 'axios';
import {Text, Button, Flex, Box, VStack, HStack, useBreakpointValue} from '@chakra-ui/react';
import LoadingPage from './LoadingPage';
import DataDesk from './FetchQueryOpts/DataSuccess/DataDesk';
import DataMed from './FetchQueryOpts/DataSuccess/DataMed';
import DataSM from './FetchQueryOpts/DataSuccess/DataSM';


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
    const breakpoint = useBreakpointValue({ base: "base", md: "md", lg: "lg" });
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
                        breakpoint === "lg" ? <DataDesk data={data} /> : breakpoint === "md" ? <DataMed data={data} /> : <DataSM data={data}/>
                    ) : (
                        <Text bg="rgb(211, 211, 211)" w = "400px" padding="2.5rem" opacity="0.85" borderRadius="1rem">
                            <div> The ticker you entered is invalid. Please try again! You may enter any ticker for a stock on the NASDAQ, and we'll be happy to provide you with analysis</div>incorrect div, friend!
                        </Text>
                    )
                )}
                {error && <div style={{ color: '' }}>{error}</div>}
                <Flex justifyContent="center" alignItems="center" marginTop="25px">
                    <Button w={{"base":"15rem", "md":"15rem","lg":"20rem"}} h={{"base":"2rem", "md":"3rem","lg":"4vh"}} marginBottom="1rem" borderRadius="2rem" onClick={resetForm} colorScheme="red">Try Another Ticker</Button>
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
                    borderRadius: "0.5rem",
                    fontSize: "16px",
                    width: "250px",
                    height: "40px",
                    textAlign: "center"  // Align text to center
                    }}
                />
                <Button w="150px" h="30px" borderRadius="0.5rem" type="submit" bg="buttonPrimary" position="relative">Submit</Button>
            </VStack>

            </form>
            </Box>

    );
};

export default StockDataFetcher;