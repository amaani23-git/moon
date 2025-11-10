import factory
from django.contrib.auth.models import User
from core.models import Service, Project, ServiceRequest, ContactMessage

class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f'user{n}')
    email = factory.LazyAttribute(lambda o: f'{o.username}@example.com')
    password = factory.PostGenerationMethodCall('set_password', 'password123')

class ServiceFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Service

    title = factory.Sequence(lambda n: f'Service {n}')
    description = factory.Faker('paragraph')
    icon = factory.Iterator(['code', 'design', 'marketing', 'cloud'])
    active = True

class ProjectFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Project

    title = factory.Sequence(lambda n: f'Project {n}')
    description = factory.Faker('paragraph')
    completed = factory.Faker('boolean')

class ServiceRequestFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ServiceRequest

    service = factory.SubFactory(ServiceFactory)
    name = factory.Faker('name')
    email = factory.Faker('email')
    phone = factory.Faker('phone_number')
    budget = factory.Iterator(['$1000-$5000', '$5000-$10000', '$10000+'])
    requirements = factory.Faker('text')

class ContactMessageFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = ContactMessage

    name = factory.Faker('name')
    email = factory.Faker('email')
    subject = factory.Faker('sentence')
    message = factory.Faker('paragraph')