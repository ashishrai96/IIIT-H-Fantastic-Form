from db import db

class FormModel(db.Model):
    __tablename__ = 'form'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500))

    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    questions = db.relationship('QuestionModel',cascade="all,delete-orphan" , backref = 'parentform')
 
    def __init__(self, url, creator_id):
        self.url = url
        self.creator_id = creator_id

    def json(self):
        return {'url': self.url, 'creator_id': self.creator_id}

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    def save_to_db(self):
        print(self.url)
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
