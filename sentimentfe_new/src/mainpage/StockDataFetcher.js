// StockDataFetcher.js

import React, { useState } from 'react';
import axios from 'axios';

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
        return <div>Loading...</div>;
    }

    if (data || error) {
        return (
            <div>
                {data && <div><pre>{JSON.stringify(data, null, 2)}</pre></div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button onClick={resetForm}>Try Another Ticker</button>
            </div>
        );
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value)}
                    placeholder="Enter Stock Ticker"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default StockDataFetcher;
