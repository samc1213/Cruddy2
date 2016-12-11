from model.DBSessionManager import DBSessionManager
from model.Model import *
import json
import uuid
import os
import base64


class api:

    def createThing(self, thingName, thingAttributes):
        newThing = Thing(thingName)
        objectsToCommitToDB = []

        for thingAttribute in thingAttributes:
            tattr = ThingAttribute(
                thingAttribute['name'], thingAttribute['typeid'])
            tattr.thing = newThing
            objectsToCommitToDB.append(tattr)

        objectsToCommitToDB.append(newThing)

        sessionManager = DBSessionManager()
        sessionManager.CommitToSession(objectsToCommitToDB)

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

        sessionManager = DBSessionManager()
        sessionManager.CommitToSession([newThingInstance])

    def getThing(self, thingId):
        sessionManager = DBSessionManager()
        session = sessionManager.GetSession()
        thing = session.query(Thing).get(thingId)

        return thing

    def getThingInstances(self, thingId):
        thing = self.getThing(thingId)

        return thing.thinginstances

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

    # def createThingAttribute(self, name, attributetype):
    #     sessionManager = DBSessionManager()
    #     thingattribute = ThingAttribute(name, attributetype)
    #     # return thing.thingname
    #     # return str(thing.UserId)
    #     sessionManager.CommitToSession(thingattribute)
