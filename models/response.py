from db import db

class ResponseModel(db.Model):
    __tablename__ = 'response'
    #id= db.Column(db.Integer,primary_key=True)
    form_id= db.Column(db.Integer,db.ForeignKey('form.id',ondelete="CASCADE"), primary_key=True, nullable=False)
    user_id= db.Column(db.Integer,db.ForeignKey('users.id',ondelete="CASCADE"), primary_key=True, nullable=False)
    ques_id= db.Column(db.Integer,db.ForeignKey('question.id',ondelete="CASCADE"), primary_key=True, nullable=False)
    response= db.Column(db.String(700), nullable=False)

    def __init__(self,form_id,user_id,ques_id,response):
        self.form_id= form_id
        self.user_id = user_id
        self.ques_id= ques_id
        self.response= response
    
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def resp_user(cls, u_id, f_id):
        obj = cls.query.filter_by(user_id = u_id, form_id = f_id )
        l = []
        for i in obj:
            temp = {"question_id" : i.ques_id, "response" : i.response}
        l.append(temp)
        return {"user_id" : l}
    