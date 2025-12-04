# Niique Investors Django Project

[![CI](https://github.com/amaani23-git/moon/actions/workflows/ci.yml/badge.svg)](https://github.com/amaani23-git/moon/actions/workflows/ci.yml)
[![Deploy](https://github.com/amaani23-git/moon/actions/workflows/deploy.yml/badge.svg)](https://github.com/amaani23-git/moon/actions/workflows/deploy.yml)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

A Django-based web application for Niique Investors, supporting community investment and development since 2014.

## Project Structure

```
moon/
├── backend/              # Django backend application
│   ├── backend/         # Django project settings
│   └── core/           # Main application module
├── docs/               # Project documentation
├── nginx/              # Nginx configuration for production
├── scripts/            # Utility scripts
├── static/             # Static files (CSS, JS, images)
│   ├── css/           # Stylesheets
│   ├── js/            # JavaScript files
│   └── images/        # Image assets
└── templates/          # Django templates
    ├── core/          # Core app templates
    ├── partials/      # Reusable template parts
    └── registration/  # Auth-related templates
```

## Development Setup

1. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Build and start the development containers:
   ```bash
   docker-compose up --build
   ```

### Local development without Docker

1. Create a virtualenv and install requirements:

```bash
python -m venv .venv
.venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

2. Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
# edit .env with local values (optional)
```

3. Run migrations and start the dev server:

```bash
set PYTHONPATH=backend
set DJANGO_SETTINGS_MODULE=backend.settings
.venv\Scripts\python.exe backend\manage.py migrate
.venv\Scripts\python.exe backend\manage.py runserver
```

### Email configuration

By default the project uses the console email backend for local development. To send real emails in production:

1. Copy `.env.example` to `.env` and set SMTP values (or export the environment variables):

```bash
cp .env.example .env
# edit .env and set EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD, DEFAULT_FROM_EMAIL, ADMIN_EMAIL
```

2. Ensure `DJANGO_EMAIL_BACKEND` is set to `django.core.mail.backends.smtp.EmailBackend`.

3. Restart the application. When a contact message or service request is submitted, an email will be sent to the address configured in `ADMIN_EMAIL`.

Note: For quick testing you can leave `DJANGO_EMAIL_BACKEND` unset and emails will be printed to the console.

## Production Deployment

1. Set up your environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with production values
   ```

2. Build and start the production containers:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Copyright (c) 2025 Niique Investors. All rights reserved.