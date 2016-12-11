from sqlalchemy import Column, Integer, String, Sequence, ForeignKey, LargeBinary
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



class Photo(Base):
    __tablename__ = 'photos'

    photoid = Column(Integer, Sequence('photos_photoid_seq'), primary_key=True)
    photo = Column(LargeBinary)

    def __init__(self, photo):
        self.photo = photo


class Thing(Base):
    # Car

    __tablename__ = 'things'

    thingid = Column(Integer, Sequence('things_thingid_seq'), primary_key=True)
    thingname = Column(String)
    userid = Column(Integer, ForeignKey('users.userid'))
    # user = relationship("User", back_populates="things")
    user = relationship('User', back_populates='things')
    thingattributes = relationship('ThingAttribute', back_populates="thing")
    thinginstances = relationship('ThingInstance', back_populates='thing')

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

class ThingInstance(Base):
    # Johnny's 2002 Toyota Corolla
    __tablename__ = 'thinginstances'

    thinginstanceid = Column(Integer, Sequence('thinginstances_thinginstanceid_seq'), primary_key=True)
    thinginstanceinfo = Column(String)
    thingid = Column(Integer, ForeignKey('things.thingid'))
    thing = relationship('Thing')

    def __init__(self, thinginstanceinfo):
        self.thinginstanceinfo = thinginstanceinfo


class ThingInstanceAttribute():
    # ThingAttribute("String", "Make"), "Toyota"

    def __init__(self, thingAttribute, value):
        self.ThingAttribute = thingAttribute
        self.Value = value

class WebApp():
    # Craigslist for Cars

    def __init__(self, administrator):
        self.Administrator = administrator

# class Administrator(User):
#     # Sam
#
#     def __init__(self):
# Base.metadata.create_all()
