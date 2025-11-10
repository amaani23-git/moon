from django.test import TestCase
from django.utils import timezone
from core.models import Service, Project, ServiceRequest, ContactMessage

class ServiceModelTests(TestCase):
    def setUp(self):
        self.service = Service.objects.create(
            title="Web Development",
            description="Full stack web development services",
            icon="code",
            active=True
        )

    def test_service_creation(self):
        """Test that a service can be created with the correct fields"""
        self.assertEqual(self.service.title, "Web Development")
        self.assertEqual(self.service.description, "Full stack web development services")
        self.assertEqual(self.service.icon, "code")
        self.assertTrue(self.service.active)

    def test_service_str_representation(self):
        """Test the string representation of the Service model"""
        self.assertEqual(str(self.service), "Web Development")

class ProjectModelTests(TestCase):
    def setUp(self):
        self.project = Project.objects.create(
            title="Mobile App",
            description="iOS and Android app development",
            completed=False
        )

    def test_project_creation(self):
        """Test that a project can be created with the correct fields"""
        self.assertEqual(self.project.title, "Mobile App")
        self.assertEqual(self.project.description, "iOS and Android app development")
        self.assertFalse(self.project.completed)

    def test_project_str_representation(self):
        """Test the string representation of the Project model"""
        self.assertEqual(str(self.project), "Mobile App")

class ServiceRequestModelTests(TestCase):
    def setUp(self):
        self.service = Service.objects.create(title="Web Development")
        self.service_request = ServiceRequest.objects.create(
            service=self.service,
            name="John Doe",
            email="john@example.com",
            phone="123-456-7890",
            budget="$5000-$10000",
            requirements="Need a responsive website"
        )

    def test_service_request_creation(self):
        """Test that a service request can be created with the correct fields"""
        self.assertEqual(self.service_request.name, "John Doe")
        self.assertEqual(self.service_request.email, "john@example.com")
        self.assertEqual(self.service_request.phone, "123-456-7890")
        self.assertEqual(self.service_request.budget, "$5000-$10000")
        self.assertEqual(self.service_request.requirements, "Need a responsive website")

    def test_service_request_str_representation(self):
        """Test the string representation of the ServiceRequest model"""
        expected_str = "John Doe - Web Development"
        self.assertEqual(str(self.service_request), expected_str)

class ContactMessageModelTests(TestCase):
    def setUp(self):
        self.message = ContactMessage.objects.create(
            name="Jane Doe",
            email="jane@example.com",
            subject="General Inquiry",
            message="I would like to know more about your services"
        )

    def test_contact_message_creation(self):
        """Test that a contact message can be created with the correct fields"""
        self.assertEqual(self.message.name, "Jane Doe")
        self.assertEqual(self.message.email, "jane@example.com")
        self.assertEqual(self.message.subject, "General Inquiry")
        self.assertEqual(self.message.message, "I would like to know more about your services")

    def test_contact_message_str_representation(self):
        """Test the string representation of the ContactMessage model"""
        expected_str = "Jane Doe - jane@example.com"
        self.assertEqual(str(self.message), expected_str)