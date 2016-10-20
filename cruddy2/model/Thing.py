from sqlalchemy import Column, Integer, String, Sequence, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Thing():
    # Car

    __tablename__ = 'things'

    thingid = Column(Integer, Sequence('things_thingid_seq'), primary_key=True)
    thingname = Column(String)
    UserId = Column('userid', Integer, ForeignKey('user.userid'))

    def __init__(self, name):
        self.thingname = name
        self.UserId = 2
