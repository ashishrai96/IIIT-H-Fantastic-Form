from db import db

class OptionModel(db.Model):
    __tablename__ = 'option'
    id= db.Column(db.Integer,primary_key=True)
    ques_id = db.Column(db.Integer,db.ForeignKey('question.id',ondelete="CASCADE"), nullable=False)
    option = db.Column(db.String(10))
    description= db.Column(db.String(100), nullable=False)

    def __init__(self,ques_id,description):
        self.ques_id = ques_id
        self.description= description
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()