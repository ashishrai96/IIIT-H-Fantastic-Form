from db import db

class ResponseModel(db.Model):
    __tablename__ = 'response'

    form_id= db.Column(db.Integer,db.ForeignKey('form.id',ondelete="CASCADE"), primary_key=True)
    user_id= db.Column(db.Integer,db.ForeignKey('user.id',ondelete="CASCADE"), primary_key=True)
    ques_id= db.Column(db.Integer,db.ForeignKey('question.id',ondelete="CASCADE"), primary_key=True)
    response= db.Column(db.String(700))
    