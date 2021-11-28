from enum import unique
from db import db


class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    firstname = db.Column(db.String(80))
    lastname = db.Column(db.String(80))
    forms = db.relationship('FormModel',cascade="all,delete", backref ='creator')
    response=db.relationship('ResponseModel',cascade="all,delete" , backref ='person')

    def __init__(self, username, password, firstname, lastname):
        self.username = username
        self.password = password
        self.firstname = firstname
        self.lastname = lastname

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()
    
    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()
