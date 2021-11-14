from flask import Flask
from flask_restful import Api

from resources.user import UserRegister
from resources.form import Form
from resources.question import QuestionList, Question

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'jdsadkasjdjkasdaksjdkkajsdaksjdjas'

api = Api(app)


@app.before_first_request
def create_tables():
    db.create_all()

api.add_resource(UserRegister, '/register')
api.add_resource(Form, '/form')
api.add_resource(QuestionList, '/questionlist/<int:id>')
api.add_resource(Question, '/question')

if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)
