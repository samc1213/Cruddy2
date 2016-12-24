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
    return send_file('./static/car.jpg', mimetype='image/jpeg')

@app.route('/r8')
def r8():
    return send_file('./static/r8edit.jpg', mimetype='image/jpeg')

@app.route('/examplecard')
def exampleCard():
    return send_file('./static/ExampleCard.png', mimetype='image/png')

@app.route('/exampletable')
def exampleTable():
    return send_file('./static/ExampleTable.png', mimetype='image/png')
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

@app.route('/api/getwebsiteidbyname/<websiteName>')
def getWebsiteIDByName(websiteName):
    website = api.getWebsiteIDByName(websiteName)
    return json.dumps(website.websiteid)

@app.route('/api/getwebsites/<username>')
def getWebsites(username):
    print "inhere"
    websites = api.getWebsites(username)
    return json.dumps(websites)

@app.route('/api/postnewwebsite', methods=['POST'])
def postNewWebsite():
    api.createWebsite(request.form)
    redirectstring = '/'+str(request.form['websitename'])+'/creatething'
    return redirect(redirectstring)


@app.route('/postnewthing', methods=['POST'])
def postNewThing():
    form = request.form
    websiteName = form['websitename']
    websiteID = api.getWebsiteIDByName(websiteName)
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
        api.createThing(thingName, websiteID,
            [{'name': thingAttributeNames[i],
            'typeid': thingAttributeTypeIds[i]}
                for i in range(len(thingAttributeNames))])
    except Exception as e:
        return json.dumps({'success': False, 'thingid': '', 'thingname': request.form['thingname'], 'message': 'There was a problem processing your new Thing'}), 500, {'ContentType':'application/json'}
    thing = api.getThingFromThingName(thingName)
    return json.dumps({'success': False, 'thingid': str(thing.thingid), 'thingname': request.form['thingname'], 'websitename': websiteName}), 200, {'ContentType':'application/json'}
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
    app.logger.debug(request.form)
    thingInstance = api.createThingInstance(request.form, request.files)
    return json.dumps({'success': True, 'thingid': thingInstance.thing.thingid, 'websitename': request.form['websitename'] }), 200, {'ContentType':'application/json'}

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    print path
    return render_template('createthingreact.html')
