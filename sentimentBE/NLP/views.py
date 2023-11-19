from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
from .utils import textScrapeAll
from analyzer import semantic_analyzer

@csrf_exempt  # Disable CSRF protection for this view only
def scrape_stock_data(request):
    if request.method == 'POST':

        data = json.loads(request.body)
        ticker = data.get('ticker')

        scraped_data = textScrapeAll(ticker)
        if not scraped_data:
            return JsonResponse({
                'error': 'No data found for ticker. Please try again.'
            })
        else:
            NLP_result = semantic_analyzer(scraped_data)
            json_string = json.dumps(NLP_result)
            return JsonResponse(json_string, safe=False)

