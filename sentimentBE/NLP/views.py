from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .utils import textScrapeAll
import random

def mock_nlp_model(scraped_data):
    if (scraped_data == None):
        return {'confidence': 'ERROR: Invalid ticker submitted. Please try again.'}
    else:
        confidence_score = random.uniform(0.5, 1.0)
        return {'confidence': confidence_score}

@csrf_exempt  # Disable CSRF protection for this view only
def scrape_stock_data(request):
    if request.method == 'POST':

        data = json.loads(request.body)
        ticker = data.get('ticker')

        scraped_data = textScrapeAll(ticker)
        nlp_result = mock_nlp_model(scraped_data)
        if(scraped_data == None):
            return JsonResponse({
            'confidence': nlp_result['confidence'],
            'websites_analyzed': 0
            })
        else:
            return JsonResponse({
                'confidence': nlp_result['confidence'],
                'websites_analyzed': len(scraped_data),
            })

