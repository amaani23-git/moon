from django.shortcuts import render

def index(request):
    """Render the main landing page."""
    return render(request, 'core/index.html')