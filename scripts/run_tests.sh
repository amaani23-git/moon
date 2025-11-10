#!/bin/bash
set -e

# Run tests with coverage
pytest --cov=backend --cov-report=html --cov-report=term-missing "$@"

# Print coverage report location
echo "Coverage report generated in htmlcov/index.html"