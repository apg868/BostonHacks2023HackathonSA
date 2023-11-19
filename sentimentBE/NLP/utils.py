from bs4 import BeautifulSoup
import requests
import yfinance as yf
import pandas as pd
from urllib.parse import urljoin

# Load NASDAQ tickers from the "nasdaq.txt" file
with open('nasdaq.txt', 'r') as file:
    nasdaq_ticker_list = file.read().splitlines()

# Create a set of NASDAQ tickers for efficient lookup
nasdaq_ticker_set = set(nasdaq_ticker_list)

def search_links(tics):
    tics = tics.upper()
    if (tics in nasdaq_ticker_set):
        ticker_name = yf.Ticker(tics)
        ticker_name = ticker_name.news
        links = []
        titles = []
        for i in ticker_name:
            links.append(i['link'])
            titles.append(i['title'])
        url = f"https://news.google.com/search?q='{tics}'%20stock%20news+when:7d&ceid=US:en&hl=en-US&gl=US"

        # Online parsing
        page = requests.get(url).text

        # Create an object to scrape various data later
        soup = BeautifulSoup(page, 'html.parser')

        # Title
        result_tl = soup.select('article .DY5T1d.RZIKme')
        titles1 = [t.text for t in result_tl]
        for t in titles1:
            titles.append(t)

        for index, names in enumerate(titles):
            if len(names) >= 55:
                titles[index] = names[0:55]

        # Let's turn all relative URLs into absolute URLs by iterating all links
        base_url = 'https://news.google.com/'
        for i in soup.select('article .DY5T1d.RZIKme'):
            ss = urljoin(base_url, i.get('href'))
            # Put all absolute links into an empty list
            links.append(ss)

        titles2 = []
        links2 = []
        for index, name in enumerate(titles):
            # Create new lists to make sure we don't have repeats in the data set
            if name not in titles2:
                titles2.append(name)
                links2.append(links[index])

        return links2
    else:
        return None



def textScrape(link):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    try:
        page = requests.get(link, headers=headers)
        page.raise_for_status()
    except requests.exceptions.HTTPError as err:
        raise SystemExit(err)

    soupafied = BeautifulSoup(page.text, 'html.parser')
    divs = soupafied.find_all('div', class_="caas-body")

    finText = ""
    for div in divs:
        paragraphs = div.find_all('p')
        for paragraph in paragraphs:
            finText += paragraph.get_text()
    return finText


def textScrapeAll(tic):
   links = search_links(tic)
   if links == None:
       return None
   i = 0
   textList = [""] * len(links)
   while(i<len(links)):
      textList[i] = textScrape(links[i])
      i += 1
   return textList
