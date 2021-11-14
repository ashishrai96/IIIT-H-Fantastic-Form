from db import db

class QuestionModel(db.Model):
    __tablename__ = 'question'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(500))
    type = db.Column(db.String(50))
    form_id = db.Column(db.Integer, db.ForeignKey('form.id',ondelete="CASCADE"))
 
    def __init__(self, description, type, form_id):
        self.description = description
        self.type = type
        self.form_id = form_id

    def json(self):
        return {'description': self.description, 'type' : self.type, 'form_id': self.form_id}

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
