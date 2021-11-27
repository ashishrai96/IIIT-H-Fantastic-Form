from db import db

class FormModel(db.Model):
    __tablename__ = 'form'

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(500), nullable=False)
    title=db.Column(db.String(80),nullable=False)
    active=db.Column(db.Boolean, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id',ondelete="CASCADE"), nullable=False)
    questions = db.relationship('QuestionModel',cascade="all,delete" , backref = 'parentform')
    response=db.relationship('ResponseModel',cascade="all,delete" , backref ='parent_form')

 
    def __init__(self, url, title):
        self.url = url
        self.title=title
        self.active=True

    def json(self):
        return {'url': self.url, 'creator_id': self.creator_id, 'active':self.active}

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
