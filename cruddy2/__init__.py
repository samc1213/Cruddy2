import os
import logging
import psycopg2
import urlparse
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
    app.logger.info(thingAttributeNames)
    api.createThing(thingName, [{'name': thingAttributeNames[i], 'typeid': thingAttributeTypeIds[i]} for i in range(len(thingAttributeNames))])
    return thingName


@app.route('/databaseurl')
def dburl():
    print 'ah!'

    return 'dburl'
