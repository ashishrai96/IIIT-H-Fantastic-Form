from audioop import add
from flask import Flask
from flask_restful import Api
from flask_jwt_extended import JWTManager

import datetime

from resources.user import Test, UserLogin, UserRegister, UserLogout,GetForms
from resources.form import AddForm, DeactivateForm, DeleteForm
from resources.response import AddResponse, GetResponse
from resources.question import QuestionList, Question
from models.option import OptionModel
from models.response import ResponseModel
from resources.transcript import Transcipt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['PROPAGATE_EXCEPTIONS'] = True
app.config["JWT_TOKEN_LOCATION"] = ["cookies","headers", "json", "query_string"]
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = datetime.timedelta(minutes=180)
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
#api.add_resource(DeleteUser, '/deleteUser')
api.add_resource(AddForm, '/addform')
api.add_resource(AddResponse,'/form/<int:_id>/<string:_title>')
api.add_resource(Transcipt, '/uploader')
api.add_resource(GetResponse, '/response/<int:_id>/<string:_title>')
api.add_resource(DeactivateForm, '/deactivate/<int:_id>/<string:_title>')
api.add_resource(DeleteForm, '/delete/<int:_id>/<string:_title>')
api.add_resource(GetForms, '/getforms/<int:_id>')


if __name__ == '__main__':
    from db import db
    db.init_app(app)
    app.run(port=5000, debug=True)
