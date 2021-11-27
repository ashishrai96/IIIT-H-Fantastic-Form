from db import db
from models.option import OptionModel

class QuestionModel(db.Model):
    __tablename__ = 'question'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(500),nullable=False)
    description = db.Column(db.String(500))
    question_type = db.Column(db.Integer, nullable=False)
    #0-mcq #1-text #2-scale #3-msq
    required=db.Column(db.Boolean,nullable=False)
    form_id = db.Column(db.Integer, db.ForeignKey('form.id',ondelete="CASCADE"), nullable=False)
    options=db.relationship('OptionModel',cascade="all,delete" , backref = 'ques_detail')
    response=db.relationship('ResponseModel',cascade="all,delete" , backref ='ques_detail')
    statements = db.relationship('StatementModel', cascade="all,delete", bakref = 'ques_detail')

    def __init__(self,question, description, qtype, required,form_id):
        self.question=question
        self.description = description
        self.question_type = qtype
        self.required= required
        self.form_id = form_id

    def json(self):
        return {'questionId': self.id,'question': self.question, 'description': self.description, 'type' : self.question_type, 'required': self.required, 'choices': [x.description for x in OptionModel.query.filter_by(ques_id = self.id)]}

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
