import os
import logging
import psycopg2
import urlparse
import json
from flask import Flask, render_template, request, redirect, url_for
from model.Model import *
from model.DBSessionManager import DBSessionManager
from model.Cruddy2Enums import ThingAttributeType
from api import *

app = Flask(__name__)
api = api()

@app.route('/')
def index():
    sessionManager = DBSessionManager()
    user = User('Sam', 'Cohen')
    sessionManager.CommitToSession([user])
    return render_template('index.html')

@app.route('/creatething')
def createThing():
    return render_template('creatething.html', thingAttributeTypes=ThingAttributeType)

@app.route('/submittedthing', methods=['POST'])
def submittedThing():
    thingName=request.form['thingname']
    thingAttributeNames = request.form.getlist('thingattributename[]')
    thingAttributeTypeIds = request.form.getlist('thingattributetypeid[]')

    assert len(thingAttributeNames) == len(thingAttributeTypeIds)

    api.createThing(thingName, [{'name': thingAttributeNames[i], 'typeid': thingAttributeTypeIds[i]} for i in range(len(thingAttributeNames))])
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

@app.route('/databaseurl')
def dburl():
    print 'ah!'

    return 'dburl'
