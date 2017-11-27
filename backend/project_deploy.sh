#!/usr/bin/env bash

command -v gcloud >/dev/null 2>&1 || { echo >&2 "'gcloud' must be installed and is in PATH."; exit 1; }

if [ ! -f app.yaml ] || [ ! -f requirements.txt ]; then
    echo "'app.yaml' or 'requirements.txt' not found. Make sure you are executing this in a Python Google App Engine project directory."
fi

pip install -t lib -r requirements.txt --upgrade

gcloud app deploy