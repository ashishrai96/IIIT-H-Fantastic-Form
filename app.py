from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager

from resources.user import Test, UserLogin, UserRegister, UserLogout
from resources.form import AddForm
from resources.response import AddResponse
from resources.question import QuestionList, Question
from models.option import OptionModel
from models.response import ResponseModel


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config["JWT_TOKEN_LOCATION"] = ["cookies","headers", "json", "query_string"]
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_SECRET_KEY"] = "super-secret-key"
app.config["JWT_COOKIE_CSRF_PROTECT"] = False

api = Api(app)
jwt = JWTManager(app)

@app.before_first_request
def create_tables():
    db.create_all()

api.add_resource(UserRegister, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(UserLogout, '/logout')
api.add_resource(AddForm, '/addform')
api.add_resource(AddResponse,'/form/<int:_id>/<string:_title>')


if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)
