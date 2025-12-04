from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model

User = get_user_model()


from .models import Profile


class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('phone', 'location')

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=False, widget=forms.EmailInput(attrs={
        'placeholder': 'you@example.com',
        'class': 'form-control'
    }))
    first_name = forms.CharField(required=False, max_length=30, widget=forms.TextInput(attrs={
        'placeholder': 'First name',
        'class': 'form-control'
    }))
    last_name = forms.CharField(required=False, max_length=30, widget=forms.TextInput(attrs={
        'placeholder': 'Last name',
        'class': 'form-control'
    }))
    phone = forms.CharField(required=False, max_length=50, widget=forms.TextInput(attrs={
        'placeholder': '+256 777 353085',
        'class': 'form-control'
    }))
    location = forms.CharField(required=False, max_length=255, widget=forms.TextInput(attrs={
        'placeholder': 'City, Country',
        'class': 'form-control'
    }))

    class Meta:
        model = User
        fields = ("username", "email", "first_name", "last_name", "phone", "location", "password1", "password2")

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data.get('email', '')
        user.first_name = self.cleaned_data.get('first_name', '')
        user.last_name = self.cleaned_data.get('last_name', '')
        if commit:
            user.save()
            # create or update profile
            phone = self.cleaned_data.get('phone', '')
            location = self.cleaned_data.get('location', '')
            try:
                profile = user.profile
            except AttributeError:
                profile = None
            if profile is None:
                from .models import Profile
                Profile.objects.create(user=user, phone=phone, location=location)
            else:
                profile.phone = phone
                profile.location = location
                profile.save()
        return user
