from cruddy2 import app
from flask import Flask, render_template, request, redirect, url_for, send_file, send_from_directory
from cruddy2.model.Model import db
import os
import logging
import psycopg2
import urlparse
import json
from model.Model import *
from model.DBSessionManager import DBSessionManager
from model.Cruddy2Enums import ThingAttributeTypes
from api import *
api = api()

@app.route('/images/<path:path>')
def send_image(path):
    return send_from_directory('./static/images', path)

@app.route('/api/getview/<websiteId>')
def getView(websiteId):
    website = api.getWebsiteByID(websiteId)
    redirectstring = '/' + str(website.websitename)
    return redirect(redirectstring)

@app.route('/api/getthingattributetypes')
def getThingAttributeTypes():
    return json.dumps(ThingAttributeTypes)

@app.route('/api/getthingattributes/<websiteName>')
def getThingAttributes(websiteName):
    thingId = api.getThingIdFromWebsiteName(websiteName)
    if thingId is not None:
        thingAttributes = api.getThingAttributes(thingId)
        return json.dumps(thingAttributes)
    else:
        return ''

@app.route('/api/getthinginstances/<websiteName>')
def getThingInstances(websiteName):
    app.logger.debug(websiteName)
    thingId = api.getThingIdFromWebsiteName(websiteName)
    if thingId is not None:
        app.logger.debug('boobs')
        thingInstances = api.getThingInstances(thingId)
        thingAttributes = api.getThingAttributes(thingId)
        results = []

        thingInstanceInfos = [json.loads(thingInstance.thinginstanceinfo) for thingInstance in thingInstances]
        for thingInstanceInfo in thingInstanceInfos:
            newThingInstance = {}
            for thingAttributeId, value in thingInstanceInfo.iteritems():
                thingAttributeName = thingAttributes[int(thingAttributeId)]['name']
                thingAttributeTypeId = thingAttributes[int(thingAttributeId)]['typeid']
                newThingInstance[thingAttributeName] = {'value': value, 'typeid': thingAttributeTypeId}
            results.append(newThingInstance)
        return json.dumps({'thingInstances': results})
    else:
        app.logger.debug('boobs')
        return ''
@app.route('/api/getlayout/<websiteName>')
def getLayout(websiteName):
    layout = api.getLayoutFromWebsiteName(websiteName)
    if layout is not None:
        return json.dumps({'success': True, 'data': layout}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success': False}), 200, {'ContentType':'application/json'}



@app.route('/api/postcarddata', methods=['POST'])
def postCardData():
    print 'postcarddata'
    try:
        layout = json.loads(request.form['layout'])
        thingid = int(request.form['thingid'])
        api.createLayout(layout, thingid)
    except Exception as ex:
        print 'errro' + str(ex)
    return json.dumps({'success': True}), 200, {'ContentType':'application/json'}

@app.route('/api/postnewwebsitelayout', methods=['POST'])
def postNewWebsiteLayout():
    print request.form
    try:
        websitelayout = json.loads(request.form['layout'])
        websiteid = api.getWebsiteIDByName(request.form['websiteName'])
        api.createWebsiteLayout(websitelayout, websiteid)
    except Exception as ex:
        print 'errro' + str(ex)
        return json.dumps({'success': False}), 200, {'ContentType':'application/json'}
    return json.dumps({'success': True}), 200, {'ContentType':'application/json'}

@app.route('/api/getwebsites/<username>')
def getWebsites(username):
    print "inhere"
    websites = api.getWebsites(username)
    return json.dumps(websites)

@app.route('/api/postnewwebsite', methods=['POST'])
def postNewWebsite():
    print request.form
    if api.createWebsite(request.form) == True:
        return json.dumps({'success': True, 'websitename': request.form['websitename']}), 200, {'ContentType':'application/json'}
    else:
        return json.dumps({'success': False, 'websitename': ''}), 200, {'ContentType':'application/json'}




@app.route('/postnewthing', methods=['POST'])
def postNewThing():
    form = request.form
    websiteName = form['websitename']
    websiteID = api.getWebsiteIDByName(websiteName)
    thingName=form['thingname']
    thingAttributeNames = [None for i in range((len(form)-1)/3)]
    thingAttributeTypeIds = [None for i in range((len(form)-1)/3)]
    print form
    try:
        assert len(thingAttributeNames) == len(thingAttributeTypeIds)
        for key, value in form.iteritems():
            if key[11:] == "thingattributetypeid":
                thingAttributeTypeIds[int(key[8])] = value
            elif key[11:] == "thingattributename":
                print value
                thingAttributeNames[int(key[8])] = value

        thing = api.createThing(thingName, websiteID,
            [{'name': thingAttributeNames[i],
            'typeid': thingAttributeTypeIds[i]}
                for i in range(len(thingAttributeNames))])
    except Exception as e:
        print 'EXCEPTION' + str(e)
        return json.dumps({'success': False, 'thingid': '', 'thingname': request.form['thingname'], 'message': 'There was a problem processing your new Thing'}), 500, {'ContentType':'application/json'}
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
    thingInstance = api.createThingInstance(request.form, request.files)
    return json.dumps({'success': True, 'thingid': thingInstance.thing.thingid, 'websitename': request.form['websitename'] }), 200, {'ContentType':'application/json'}

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    print path
    return render_template('createthingreact.html')
