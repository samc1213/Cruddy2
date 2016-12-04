#!/bin/sh

npm install
$(browserify "cruddy2/static/src/index.js" -o "cruddy2/static/build/app.js")
if [[ $? != 0 ]]; then
    echo "Browserify Failure 😡"
    echo '\007'
    exit
else
    echo "Browserify Success 😊"
fi
python setup.py
