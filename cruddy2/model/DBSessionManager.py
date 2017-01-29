from Model import db


class DBSessionManager():

    def CommitToSession(self, listofargs):
        for arg in listofargs:
            db.session.add(arg)

        db.session.commit()
