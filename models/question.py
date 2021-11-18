from db import db

class QuestionModel(db.Model):
    __tablename__ = 'question'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(500),nullable=False)
    description = db.Column(db.String(500))
    question_type = db.Column(db.Integer, nullable=False)
    required=db.Column(db.Boolean,nullable=False)
    form_id = db.Column(db.Integer, db.ForeignKey('form.id',ondelete="CASCADE"), nullable=False)
    options=db.relationship('OptionModel',cascade="all,delete" , backref = 'ques_detail')
    response=db.relationship('ResponseModel',cascade="all,delete" , backref ='ques_detail')

    def __init__(self,question, description, qtype, required):
        self.question=question
        self.description = description
        self.question_type = qtype
        self.required= required

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
