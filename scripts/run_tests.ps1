# Run tests with coverage
pytest --cov=backend --cov-report=html --cov-report=term-missing $args

# Print coverage report location
Write-Host "Coverage report generated in htmlcov/index.html"