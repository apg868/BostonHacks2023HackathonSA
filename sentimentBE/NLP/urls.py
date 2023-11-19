# NLP/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('scrape_stock_data/', views.scrape_stock_data, name='scrape_stock_data'),
]
