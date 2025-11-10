from django.test import TestCase, Client
from django.urls import reverse
from core.models import Service, Project

class ViewTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.service = Service.objects.create(
            title="Web Development",
            description="Full stack web development",
            active=True
        )
        self.project = Project.objects.create(
            title="E-commerce Site",
            description="Online store development",
            completed=True
        )

    def test_index_view(self):
        """Test the index view returns correct response"""
        response = self.client.get(reverse('core:index'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'core/index.html')

    def test_index_view_context(self):
        """Test that index view contains correct context data"""
        response = self.client.get(reverse('core:index'))
        self.assertIn('services', response.context)
        self.assertIn('projects', response.context)
        self.assertQuerysetEqual(
            response.context['services'],
            Service.objects.filter(active=True),
            transform=lambda x: x
        )

    def test_login_view(self):
        """Test the login view returns correct response"""
        response = self.client.get(reverse('login'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'registration/login.html')

    def test_register_view(self):
        """Test the register view returns correct response"""
        response = self.client.get(reverse('register'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'registration/register.html')

    def test_profile_view_requires_login(self):
        """Test that profile view requires authentication"""
        response = self.client.get(reverse('profile'))
        self.assertEqual(response.status_code, 302)  # Redirects to login
        self.assertRedirects(
            response, 
            f'{reverse("login")}?next={reverse("profile")}'
        )