from sqlalchemy import Column, Integer, String, Sequence, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from DBSessionManager import Base

class Thing(Base):
    # Car

    __tablename__ = 'things'

    thingid = Column(Integer, Sequence('things_thingid_seq'), primary_key=True)
    thingname = Column(String)
    userid = Column(Integer, ForeignKey('users.userid'))
    # user = relationship("User", back_populates="things")
    
    def __init__(self, name):
        self.thingname = name
        self.userid = 2
