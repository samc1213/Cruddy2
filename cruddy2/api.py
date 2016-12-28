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

    def createWebsite(self, form):
        websiteTypeId = int(form['websitetypeid'])
        websiteName = str(form['websitename'])
        user = self.getUserFromUsername(form['username'])
        newWebsite = Website(websiteName, websiteTypeId, int(user.userid))
        sessionManager = DBSessionManager()
        sessionManager.CommitToSession([newWebsite])

    def createThing(self, thingName, websiteID, thingAttributes):
        newThing = Thing(thingName, websiteID)
        objectsToCommitToDB = []
        print "inthisbitch"

        for thingAttribute in thingAttributes:
            print "fuky"

            tattr = ThingAttribute(
                thingAttribute['name'], thingAttribute['typeid'])
            tattr.thing = newThing
            objectsToCommitToDB.append(tattr)

        objectsToCommitToDB.append(newThing)

        self.sessionManager.CommitToSession(objectsToCommitToDB)

    def savePhoto(self, fileStore):
        self.saveFileToUploads()

    def getThingByWebsiteID(self, websiteId):
        return self.session.query(Thing).filter_by(websiteid=websiteId).first()


    def createThingInstance(self, form, files):
        websitename = form['websitename']
        thingId = self.getThingIdFromWebsiteName(websitename)

        if thingId is None:
            return ''
            
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

        return newThingInstance

    def getThing(self, thingId):
        thing = self.session.query(Thing).get(thingId)

        return thing

    def getWebsiteIDByName(self, websiteName):
        website = self.session.query(Website).filter_by(websitename=websiteName).first()
        print website.websiteid
        return int(website.websiteid)

    def getWebsiteByID(self, websiteID):
        website = self.session.query(Website).filter_by(websiteid=websiteID).first()
        return website

    def getWebsiteFromName(self, websiteName):
        website = self.session.query(Website).filter_by(websitename=websiteName).first()
        return website

    def getThingIdFromWebsiteName(self, websiteName):
        website = self.getWebsiteFromName(websiteName)
        if len(website.things) > 0:
            return website.things[0].thingid
        else:
            return None


    def getWebsites(self, username):
        user = self.getUserFromUsername(username)
        websites = self.getWebsiteFromUserID(user.userid)
        return websites

    def getWebsiteFromUserID(self, id):
        tempwebsites = self.session.query(Website).filter_by(userid=id)
        websites = {}
        for website in tempwebsites:
            websites[website.websiteid] = {
                'websitename': website.websitename,
                'websitetypeid': website.websitetypeid
            }
        return websites


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

    def getThingFromThingName(self, thingName):
        thing = self.session.query(Thing).filter_by(thingname=thingName).first()
        return thing
