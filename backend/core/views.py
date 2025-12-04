from django.shortcuts import render, redirect
from .models import Service, Project, ServiceRequest, ContactMessage


def index(request):
    """Render the main landing page with services and projects."""
    services = Service.objects.filter(active=True).order_by('title')
    projects = Project.objects.all()

    # Simple form handling for service requests and contact messages
    if request.method == 'POST':
        if 'service_request' in request.POST:
            ServiceRequest.objects.create(
                service_id=request.POST.get('service_id') or None,
                name=request.POST.get('name', '').strip(),
                email=request.POST.get('email', '').strip(),
                phone=request.POST.get('phone', '').strip(),
                budget=request.POST.get('budget', '').strip(),
                requirements=request.POST.get('requirements', '').strip(),
            )
            return redirect('core:index')

        if 'contact_message' in request.POST:
            ContactMessage.objects.create(
                name=request.POST.get('name', '').strip(),
                email=request.POST.get('email', '').strip(),
                subject=request.POST.get('subject', '').strip(),
                message=request.POST.get('message', '').strip(),
            )
            return redirect('core:index')

    context = {
        'services': services,
        'projects': projects,
    }
    return render(request, 'core/index.html', context)
