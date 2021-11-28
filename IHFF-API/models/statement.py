from db import db

class StatementModel(db.Model):
    __tablename__ = 'statement'
    id= db.Column(db.Integer, primary_key=True)
    ques_id = db.Column(db.Integer,db.ForeignKey('question.id',ondelete="CASCADE"), nullable=False)
    statement=db.Column(db.String(500),nullable=False)

    def __init__(self,q_id,state):
        self.ques_id=q_id
        self.statement=state
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()