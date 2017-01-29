from sqlalchemy import Column, Integer, String, Sequence, ForeignKey, LargeBinary
from sqlalchemy.orm import relationship
from cruddy2 import app
from flask_sqlalchemy import SQLAlchemy
import os

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ["DATABASE_URL"]
db = SQLAlchemy(app)


class User(db.Model):
    __tablename__ = 'users'

    userid = Column(Integer, Sequence('users_userid_seq'), primary_key=True)
    firstname = Column(String)
    lastname = Column(String)
    username = Column(String)
    password = Column(String)
    websites = relationship('Website', back_populates='user')



    def __init__(self, firstName, lastName, username, password):
        self.firstname = firstName
        self.lastname = lastName
        self.username = username
        self.password = password



class Photo(db.Model):
    __tablename__ = 'photos'

    photoid = Column(Integer, Sequence('photos_photoid_seq'), primary_key=True)
    photo = Column(LargeBinary)

    def __init__(self, photo):
        self.photo = photo


class Thing(db.Model):
    # Car

    __tablename__ = 'things'

    thingid = Column(Integer, Sequence('things_thingid_seq'), primary_key=True)
    thingname = Column(String)
    websiteid = Column(Integer, ForeignKey('websites.websiteid'))
    website = relationship('Website', back_populates='things')

    thingattributes = relationship('ThingAttribute', back_populates='thing')
    thinginstances = relationship('ThingInstance', back_populates='thing')

    def __init__(self, name, websiteid):
        self.thingname = name
        self.websiteid = websiteid

class ThingAttribute(db.Model):
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

class ThingInstance(db.Model):
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

class Website(db.Model):
    # Craigslist for Cars
    __tablename__ = 'websites'

    websiteid = Column(Integer, Sequence('websites_websiteid_seq'), primary_key=True)
    websitename = Column(String)
    websitetypeid = Column(Integer)
    userid = Column(Integer, ForeignKey('users.userid'))
    user = relationship('User', back_populates='websites')
    things = relationship('Thing', back_populates='website')



    def __init__(self, websitename, websitetypeid, userid):
        self.websitename = websitename
        self.websitetypeid = websitetypeid
        self.userid = userid

# class Administrator(User):
#     # Sam
#
#     def __init__(self):
# db.Model.metadata.create_all()
