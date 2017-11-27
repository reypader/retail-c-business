#!/usr/bin/env bash

command -v gcloud >/dev/null 2>&1 || { echo >&2 "'gcloud' must be installed and is in PATH."; exit 1; }

if [ ! -f app.yaml ] || [ ! -f requirements-vendor.txt ]; then
    echo "'app.yaml' or 'requirements.txt' not found. Make sure you are executing this in a Python Google App Engine project directory."
fi

rm -r lib/
pip install -t lib -r requirements-vendor.txt --upgrade

python manage.py collectstatic

gcloud app deploy