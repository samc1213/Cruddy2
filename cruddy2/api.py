from model.DBSessionManager import DBSessionManager
from model.Thing import Thing


class api:

	def createThing(self, name):
	    sessionManager = DBSessionManager()
	    thing = Thing(name)
	    # return thing.thingname
	    # return str(thing.UserId)
	    sessionManager.CommitToSession(thing)
