from sqlalchemy import Column, Integer, String, Sequence, ForeignKey
from sqlalchemy.orm import relationship
from DBSessionManager import Base
from sqlalchemy.ext.declarative import declarative_base


class User(Base):
    __tablename__ = 'users'

    userid = Column(Integer, Sequence('users_userid_seq'), primary_key=True)
    firstname = Column(String)
    lastname = Column(String)
    things = relationship('Thing', back_populates='user')


    def __init__(self, firstName, lastName):
        self.firstname = firstName
        self.lastname = lastName



# class Administrator(User):
#     # Sam


class Thing(Base):
    # Car

    __tablename__ = 'things'

    thingid = Column(Integer, Sequence('things_thingid_seq'), primary_key=True)
    thingname = Column(String)
    userid = Column(Integer, ForeignKey('users.userid'))
    # user = relationship("User", back_populates="things")
    user = relationship('User', back_populates='things')
    thingattributes = relationship('ThingAttribute', back_populates="thing")

    def __init__(self, name):
        self.thingname = name
        self.userid = 2

class ThingAttribute(Base):
    # String, Make
    __tablename__ = 'thingattributes'

    thingattributeid = Column(Integer, Sequence('thingattributes_thingattributeid_seq'), primary_key=True)
    thingattributename = Column(String)
    thingattributetype = Column(Integer)
    thingid = Column(Integer, ForeignKey('things.thingid'))
    thing = relationship('Thing', back_populates='thingattributes')

    def __init__(self, name, attributetype):
        self.thingattributename = name
        self.thingattributetype = attributetype 

class ThingInstance():
    # Johnny's 2002 Toyota Corolla

    def __init__(self, thing):
        self.Thing = thing


class ThingInstanceAttribute():
    # ThingAttribute("String", "Make"), "Toyota"

    def __init__(self, thingAttribute, value):
        self.ThingAttribute = thingAttribute
        self.Value = value


# Base.metadata.create_all()
