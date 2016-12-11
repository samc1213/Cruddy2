from model.DBSessionManager import DBSessionManager
from model.Model import *


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

    def createThingInstance(self, thingInstanceInfo, thingId):
        newThingInstance = ThingInstance(thingInstanceInfo)
        newThingInstance.thingid = thingId

        sessionManager = DBSessionManager()
        sessionManager.CommitToSession([newThingInstance])

    def getThing(self, thingId):
        sessionManager = DBSessionManager()
        session = sessionManager.GetSession()
        thing = session.query(Thing).get(thingId)

        return thing

    def getThingInstances(self, thing):
        return thing.thinginstances

    def getThingAttributeIdToNameDict(self, thing):
        idToNameDict = {}
        for thingAttribute in thing.thingattributes:
            idToNameDict[thingAttribute.thingattributeid] = thingAttribute.thingattributename

        return idToNameDict

    def getThingAttributes(self, thing):
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
