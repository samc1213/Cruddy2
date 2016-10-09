from Cruddy2Enums import *

class ThingAttribute():
    # String, Make
    def __init__(self, type, name):
        self.Type = ThingAttributeType[type]
