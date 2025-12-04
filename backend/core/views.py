from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .forms import RegistrationForm, ProfileForm
from .models import Service, Project, ServiceRequest, ContactMessage, Profile


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


def register(request):
    """Handle user registration."""
    # Use our RegistrationForm (extends UserCreationForm with extra fields)
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('core:index')
        return render(request, 'registration/register.html', {'form': form})

    form = RegistrationForm()
    return render(request, 'registration/register.html', {'form': form})


@login_required(login_url='login')
def profile(request):
    """Display and edit user profile."""
    user = request.user
    profile, created = Profile.objects.get_or_create(user=user)

    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=profile)
        if form.is_valid():
            form.save()

            # allow editing basic user fields too
            user.first_name = request.POST.get('first_name', user.first_name)
            user.last_name = request.POST.get('last_name', user.last_name)
            user.email = request.POST.get('email', user.email)
            user.save()

            messages.success(request, 'Your profile was updated successfully.')
            return redirect('core:profile')
    else:
        form = ProfileForm(instance=profile)

    context = {
        'form': form,
        'user_obj': user,
    }
    return render(request, 'registration/profile.html', context)
