from db import db

class OptionModel(db.Model):
    __tablename__ = 'option'

    id = db.Column(db.Integer,db.ForeignKey('question.id',ondelete="CASCADE"), primary_key=True)
    option = db.Column(db.String(10),primary_key=True)
    description= db.Column(db.String(100))