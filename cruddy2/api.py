from model.DBSessionManager import DBSessionManager
from model.Model import *


class api:

	def createThing(self, thingname, thingattributes):
	    thing = Thing(thingname)
	    tattrs = []
	    for thingattribute in thingattributes:
	    	tattr = ThingAttribute(thingattribute['name'], thingattribute['typeid'])
	    	tattr.thing = thing
	    	tattrs.append(tattr)
	    tattrs.append(thing)
	    sessionManager = DBSessionManager()
	    sessionManager.CommitToSession(tattrs)







	# def createThingAttribute(self, name, attributetype):
	#     sessionManager = DBSessionManager()
	#     thingattribute = ThingAttribute(name, attributetype)
	#     # return thing.thingname
	#     # return str(thing.UserId)
	#     sessionManager.CommitToSession(thingattribute)
