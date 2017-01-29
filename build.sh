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
export FLASK_APP=cruddy2
export FLASK_DEBUG=true
export DATABASE_URL=postgres://krutbopdjrrdka:gFWwf6ZbgrZ9IUhtbpltoEvMRm@ec2-54-235-246-220.compute-1.amazonaws.com:5432/d8nftrednl0snj
export LOCALHOST=1
python devenvimport.py
flask run
