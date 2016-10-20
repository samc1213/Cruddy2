from sqlalchemy import Column, Integer, String, Sequence
from sqlalchemy.orm import relationship
from DBSessionManager import Base
from sqlalchemy.ext.declarative import declarative_base


class User(Base):
    __tablename__ = 'users'

    userid = Column(Integer, Sequence('users_userid_seq'), primary_key=True)
    firstname = Column(String)
    lastname = Column(String)
    thing = relationship("Thing")

    def __init__(self, firstName, lastName):
        self.firstname = firstName
        self.lastname = lastName
