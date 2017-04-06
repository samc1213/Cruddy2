from cruddy2 import app
from flask_sqlalchemy import SQLAlchemy
import os

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ["DATABASE_URL"]
db = SQLAlchemy(app)


class LayoutData(db.Model):
    __tablename__ = 'layoutdata'
    layoutdataid = db.Column(db.Integer, db.Sequence('layoutdata_layoutdataid_seq'), primary_key=True)
    thingid = db.Column(db.Integer, db.ForeignKey('things.thingid'))
    layout = db.Column(db.String)

    def __init__(self, layout, thingid):
        self.layout = layout
        self.thingid = thingid

class User(db.Model):
    __tablename__ = 'users'

    userid = db.Column(db.Integer, db.Sequence('users_userid_seq'), primary_key=True)
    firstname = db.Column(db.String)
    lastname = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    websites = db.relationship('Website', back_populates='user')

    def __init__(self, firstName, lastName, username, password):
        self.firstname = firstName
        self.lastname = lastName
        self.username = username
        self.password = password



class Photo(db.Model):
    __tablename__ = 'photos'

    photoid = db.Column(db.Integer, db.Sequence('photos_photoid_seq'), primary_key=True)
    photo = db.Column(db.LargeBinary)

    def __init__(self, photo):
        self.photo = photo


class Thing(db.Model):
    # Car

    __tablename__ = 'things'

    thingid = db.Column(db.Integer, db.Sequence('things_thingid_seq'), primary_key=True)
    thingname = db.Column(db.String)
    websiteid = db.Column(db.Integer, db.ForeignKey('websites.websiteid'))
    website = db.relationship('Website', back_populates='things')

    thingattributes = db.relationship('ThingAttribute', back_populates='thing')
    thinginstances = db.relationship('ThingInstance', back_populates='thing')

    def __init__(self, name, websiteid):
        self.thingname = name
        self.websiteid = websiteid

class ThingAttribute(db.Model):
    # db.String, Make
    __tablename__ = 'thingattributes'

    thingattributeid = db.Column(db.Integer, db.Sequence('thingattributes_thingattributeid_seq'), primary_key=True)
    thingattributename = db.Column(db.String)
    thingattributetype = db.Column(db.Integer)
    thingid = db.Column(db.Integer, db.ForeignKey('things.thingid'))
    thing = db.relationship('Thing', back_populates='thingattributes')

    def __init__(self, name, attributetype):
        self.thingattributename = name
        self.thingattributetype = attributetype

class ThingInstance(db.Model):
    # Johnny's 2002 Toyota Corolla
    __tablename__ = 'thinginstances'

    thinginstanceid = db.Column(db.Integer, db.Sequence('thinginstances_thinginstanceid_seq'), primary_key=True)
    thinginstanceinfo = db.Column(db.String)
    thingid = db.Column(db.Integer, db.ForeignKey('things.thingid'))
    thing = db.relationship('Thing')

    def __init__(self, thinginstanceinfo):
        self.thinginstanceinfo = thinginstanceinfo


class ThingInstanceAttribute():
    # ThingAttribute("db.String", "Make"), "Toyota"

    def __init__(self, thingAttribute, value):
        self.ThingAttribute = thingAttribute
        self.Value = value

class Website(db.Model):
    # Craigslist for Cars
    __tablename__ = 'websites'

    websiteid = db.Column(db.Integer, db.Sequence('websites_websiteid_seq'), primary_key=True)
    websitename = db.Column(db.String)
    websitetypeid = db.Column(db.Integer)
    userid = db.Column(db.Integer, db.ForeignKey('users.userid'))
    user = db.relationship('User', back_populates='websites')
    things = db.relationship('Thing', back_populates='website')



    def __init__(self, websitename, websitetypeid, userid):
        self.websitename = websitename
        self.websitetypeid = websitetypeid
        self.userid = userid

# class Administrator(User):
#     # Sam
#
#     def __init__(self):
# db.Model.metadata.create_all()
