import os
import logging
import psycopg2
import urlparse
import json
from flask import Flask, render_template, request, redirect, url_for, send_file
from model.Model import *
from model.DBSessionManager import DBSessionManager
from model.Cruddy2Enums import ThingAttributeTypes
from api import *

app = Flask(__name__)
api = api()


@app.route('/exampleimage')
def exampleimg():
    return send_file('./static/1.jpg')
#
# @app.route('/')
# def index():
#     return 'hi'
#
@app.route('/api/getthingattributetypes')
def getThingAttributeTypes():
    return json.dumps(ThingAttributeTypes)

@app.route('/api/getthingattributes/<thingId>')
def getThingAttributes(thingId):
    thingAttributes = api.getThingAttributes(thingId)
    return json.dumps(thingAttributes)

@app.route('/api/getthinginstances/<thingId>')
def getThingInstances(thingId):
    thingInstances = api.getThingInstances(thingId)
    thingAttributes = api.getThingAttributes(thingId)



    result = {}
    result['thingInstances'] = [json.loads(thingInstance.thinginstanceinfo) for thingInstance in thingInstances]
    result['thingAttributes'] = thingAttributes

    return json.dumps(result)

@app.route('/api/postnewwebsite', methods=['POST'])
def postNewWebsite():
    api.createWebsite(request.form)
    return request.form['websitename']

@app.route('/postnewthing', methods=['POST'])
def postNewThing():
    form = request.form

    thingName=form['thingname']
    thingAttributeNames = [None for i in range((len(form)-1)/3)]
    thingAttributeTypeIds = [None for i in range((len(form)-1)/3)]
    print form
    assert len(thingAttributeNames) == len(thingAttributeTypeIds)
    for key, value in form.iteritems():
        if key[11:] == "thingattributetypeid":
            thingAttributeTypeIds[int(key[8])] = value
        elif key[11:] == "thingattributename":
            thingAttributeNames[int(key[8])] = value

    try:
        api.createThing(thingName,
            [{'name': thingAttributeNames[i],
            'typeid': thingAttributeTypeIds[i]}
                for i in range(len(thingAttributeNames))])
    except Exception as e:
        print "EXCEPTION"

    return thingName + 'po'
#
@app.route('/submittedthing', methods=['POST'])
def submittedThing():
    thingName=request.form['thingname']
    thingAttributeNames = request.form.getlist('thingattributename[]')
    thingAttributeTypeIds = request.form.getlist('thingattributetypeid[]')

    assert len(thingAttributeNames) == len(thingAttributeTypeIds)

    api.createThing(thingName,
        [{'name': thingAttributeNames[i],
        'typeid': thingAttributeTypeIds[i]}
            for i in range(len(thingAttributeNames))])
    return thingName

@app.route('/api/postnewaccount', methods=['POST'])
def postNewAccount():
    if api.createUser(request.form) == True:
        return json.dumps({'success': True, 'username': request.form['username']}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success': False, 'username': ''}), 200, {'ContentType':'application/json'}

@app.route('/api/postloginuser', methods=['POST'])
def postLoginUser():
    if api.validateUser(request.form) == True:
        return json.dumps({'success': True, 'username': request.form['username']}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success': False, 'username': ''}), 200, {'ContentType':'application/json'}

@app.route('/api/postnewthinginstance', methods=['POST'])
def postNewThingInstance():
    app.logger.debug(request.files)
    api.createThingInstance(request.form, request.files)
    return 'success'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    print path
    return render_template('createthingreact.html')
