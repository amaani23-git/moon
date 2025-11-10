# Niique Investors Django Project

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