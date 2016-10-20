from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

import urlparse
import os


Base = declarative_base()


class DBSessionManager():

    def GetEngine(self):
        urlparse.uses_netloc.append("postgres")
        url = urlparse.urlparse(os.environ["DATABASE_URL"])

        database = url.path[1:]
        user = url.username
        password = url.password
        host = url.hostname
        port = url.port



        return create_engine(
            'postgresql://{0}:{1}@{2}:{3}/{4}'.format(user, password, host, port, database))

    def GetSession(self):
        engine = self.GetEngine()
        Session = sessionmaker(bind=engine)

        return Session()

    def CommitToSession(self, *args):
        session = self.GetSession()

        for arg in args:
            session.add(arg)

        session.commit()
