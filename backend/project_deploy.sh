#!/usr/bin/env bash

command -v gcloud >/dev/null 2>&1 || { echo >&2 "'gcloud' must be installed and is in PATH."; exit 1; }

if [ ! -f app.yaml ] || [ ! -f requirements-vendor.txt ]; then
    echo "'app.yaml' or 'requirements.txt' not found. Make sure you are executing this in a Python Google App Engine project directory."
fi

rm -r lib/
pip install -t lib -r requirements-vendor.txt

rm -rf static

python manage.py collectstatic
mv static/index.html templates/

DIR=$(pwd)
cd templates
sed -i '.bak' 's#inline.bundle.js#/static/inline.bundle.js#g' index.html
sed -i '.bak' 's#main.bundle.js#/static/main.bundle.js#g' index.html
sed -i '.bak' 's#polyfills.bundle.js#/static/polyfills.bundle.js#g' index.html
sed -i '.bak' 's#styles.bundle.js#/static/styles.bundle.js#g' index.html
sed -i '.bak' 's#vendor.bundle.js#/static/vendor.bundle.js#g' index.html

sed -i '.bak' 's#assets/#/static/assets/#g' index.html
cd ${DIR}
gcloud app deploy