from model.DBSessionManager import DBSessionManager
from model.Model import *
import json
import uuid
import os
import base64
import bcrypt


class api:
    def __init__(self):
        self.sessionManager = DBSessionManager()
        self.session = self.sessionManager.GetSession()

    def createThing(self, thingName, thingAttributes):
        newThing = Thing(thingName)
        objectsToCommitToDB = []

        for thingAttribute in thingAttributes:
            tattr = ThingAttribute(
                thingAttribute['name'], thingAttribute['typeid'])
            tattr.thing = newThing
            objectsToCommitToDB.append(tattr)

        objectsToCommitToDB.append(newThing)

        self.sessionManager.CommitToSession(objectsToCommitToDB)

    def savePhoto(self, fileStore):
        self.saveFileToUploads()

    def createThingInstance(self, form, files):
        thingId = int(form['thingid'])
        thingInstance = {}

        for name in form:
            if name.startswith('thingattributeid.'):
                thingAttributeIdIndex = len('thingattributeid.')
                thingAttributeId = name[thingAttributeIdIndex:]
                thingInstance[thingAttributeId] = form[name]

        for file, values in files.iteritems():
            thingAttributeIdIndex = len('thingattributeid.')
            thingAttributeId = file[thingAttributeIdIndex:]
            thingInstance[thingAttributeId] = base64.b64encode(values.read())

        newThingInstance = ThingInstance(json.dumps(thingInstance))
        newThingInstance.thingid = thingId

        self.sessionManager.CommitToSession([newThingInstance])

    def getThing(self, thingId):
        thing = self.session.query(Thing).get(thingId)

        return thing

    def getThingInstances(self, thingId):
        thing = self.getThing(thingId)

        return thing.thinginstances

    def createUser(self, form):
        try:
            password = bcrypt.hashpw(form['password'].encode('utf-8'), bcrypt.gensalt())
            user = User(form['firstname'], form['lastname'], form['username'], password)
        
            self.sessionManager.CommitToSession([user])
            return True
        except:
            return False

    def validateUser(self, form):
        try:
            user = self.getUserFromUsername(form['username'])
            if bcrypt.checkpw(form['password'].encode('utf-8'), user.password.encode('utf-8')):
                return True
            else:
                return False
        except:
            return False


    def getThingAttributeIdToNameDict(self, thing):
        idToNameDict = {}
        for thingAttribute in thing.thingattributes:
            idToNameDict[thingAttribute.thingattributeid] = thingAttribute.thingattributename

        return idToNameDict

    def getThingAttributes(self, thingId):
        thing = self.getThing(thingId)
        thingAttributes = {}
        for thingAttribute in thing.thingattributes:
            thingAttributes[thingAttribute.thingattributeid] = {
                    'name': thingAttribute.thingattributename,
                    'typeid': thingAttribute.thingattributetype
                }
        return thingAttributes

    def getUserFromUsername(self, username):
        user = self.session.query(User).filter_by(username=username).first()
        return user
