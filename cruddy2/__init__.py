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

@app.route('/')
def index():
    return 'hi'

@app.route('/getthingattributetypes')
def getthingattributetypes():
    print "GETTHINGS"
    return json.dumps(ThingAttributeTypes)

@app.route('/creatething')
def createThing():
    return render_template('createthingreact.html', thingAttributeTypes=ThingAttributeTypes)

@app.route('/postnewthing', methods=['POST'])
def postNewThing():
    form = request.form

    thingName=form['thingname']
    thingAttributeNames = [None for i in range((len(form)-1)/3)]
    thingAttributeTypeIds = [None for i in range((len(form)-1)/3)]

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

@app.route('/createthinginstance/<thingid>')
def createThingInstance(thingid):
    sessionManager = DBSessionManager()
    session = sessionManager.GetSession()
    myThing = session.query(Thing).get(thingid)

    return render_template('createthinginstance.html', thingName=myThing.thingname, thingAttributes=myThing.thingattributes, thingId=thingid)

@app.route('/submittedthinginstance', methods=['POST'])
def submittedThingInstance():
    thingInstanceBlob = {}
    thingId = int(request.form['thingid'])

    for name in request.form:
        if name.startswith('thingattributeid.'):
            thingAttributeIdIndex = len('thingattributeid.')
            thingAttributeId = name[thingAttributeIdIndex:]
            thingInstanceBlob[thingAttributeId] = request.form[name]

    api.createThingInstance(json.dumps(thingInstanceBlob), thingId)

    return str(thingId)

@app.route('/viewthinginstancetable/<thingId>')
def viewThingInstanceTable(thingId):
    thing = api.getThing(thingId)
    thingInstances = api.getThingInstances(thing)
    thingInstanceInfos = [json.loads(ti.thinginstanceinfo) for ti in thingInstances]
    thingAttributesConversionDict = api.getThingAttributeIdToNameDict(thing)

    print thingAttributesConversionDict

    thingInstancesAttributeNamesToAttributeValues = []

    for tiInfo in thingInstanceInfos:
        for thingAttributeId, thingInstanceAttribute in tiInfo.iteritems():
            thingInstancesAttributeNamesToAttributeValues.append(
                {thingAttributesConversionDict[int(thingAttributeId)]: thingInstanceAttribute})

    return render_template('thinginstancetable.html',
        thingName = thing.thingname,
        thingInstances = thingInstancesAttributeNamesToAttributeValues)
