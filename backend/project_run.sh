#!/usr/bin/env bash

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
python manage.py makemigrations
python manage.py migrate
python manage.py runserver