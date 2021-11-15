from db import db

class ResponseModel(db.Model):
    __tablename__ = 'response'
    id= db.Column(db.Integer,primary_key=True)
    form_id= db.Column(db.Integer,db.ForeignKey('form.id',ondelete="CASCADE"), nullable=False)
    user_id= db.Column(db.Integer,db.ForeignKey('user.id',ondelete="CASCADE"), nullable=False)
    ques_id= db.Column(db.Integer,db.ForeignKey('question.id',ondelete="CASCADE"), nullable=False)
    response= db.Column(db.String(700), nullable=False)
    