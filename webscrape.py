from bs4 import BeautifulSoup
import requests
import yfinance as yf
import pandas as pd


def search_links(tics):
  ticker_name = yf.Ticker(tics)
  ticker_name = ticker_name.news
  empt = []
  for i in ticker_name:
    empt.append(i['link'])
  return empt



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



#scraped_text = textScrape("https://finance.yahoo.com/video/2-trillion-added-big-tech-210142886.html")
#print(scraped_text)

#search_links("BEP")


def textScrapeAll(tic):
   links = search_links(tic)
   i = 0
   textList = [""] * len(links)
   while(i<len(links)):
      textList[i] = textScrape(links[i])
      i += 1
   return textList

all_scraped_text = textScrapeAll("F")
formatted_output = "\n\n".join(all_scraped_text)  # Adds two newlines between each element
print(formatted_output)
