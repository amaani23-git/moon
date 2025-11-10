# Niique Investors Django Project

A Django-based web application for Niique Investors, supporting community investment and development since 2014.

## Setup

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate  # Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```bash
   cd backend
   python manage.py migrate
   ```
5. Start the development server:
   ```bash
   python manage.py runserver
   ```

## Project Structure

- `backend/` - Django project root
  - `backend/` - Main Django app
  - `core/` - Core application features
  - `static/` - Static assets (CSS, JS, images)
  - `templates/` - Django HTML templates
- `images/` - Image assets
- `requirements.txt` - Python dependencies

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Copyright (c) 2025 Niique Investors. All rights reserved.