from db import db

class OptionModel(db.Model):
    __tablename__ = 'option'
    id= db.Column(db.Integer,primary_key=True)
    ques_id = db.Column(db.Integer,db.ForeignKey('question.id',ondelete="CASCADE"), nullable=False)
    option = db.Column(db.String(10), nullable=False)
    description= db.Column(db.String(100), nullable=False)

    def __init__(self,ques_id,option,description):
        self.ques_id = ques_id
        self.option = option
        self.description= description