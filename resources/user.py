from flask_restful import Resource, reqparse
from flask import make_response
from models.user import UserModel
from models.form import FormModel
from werkzeug.security import safe_str_cmp
from flask_jwt_extended import set_access_cookies, create_access_token, jwt_required, unset_jwt_cookies, get_jwt_identity


class UserRegister(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="Username cannot be blank."
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="Password cannot be blank."
                        )

    def post(self):
        data = UserRegister.parser.parse_args()

        if UserModel.query.filter_by(username = data['username']).first():
            return {"message": "A user with that username already exists.", "status":500}, 400

        user = UserModel(data['username'], data['password'])
        user.save_to_db()
        response = make_response({"message": "User Registered sucessfully.", "status":200})
        access_token = create_access_token(identity = user.id)
        set_access_cookies(response, access_token)
        return response



class UserLogin(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )
    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="This field cannot be blank."
                        )

    def post(self):
        data = UserLogin.parser.parse_args()
        user = UserModel.query.filter_by(username = data['username']).first()
        if user and safe_str_cmp(data['password'], user.password):
            formPayload = [{x.title: x.url} for x in FormModel.query.filter_by(creator_id = user.id)]
            print(formPayload)
            
            access_token = create_access_token(identity=user.id)
            response = make_response({"message": "login successful.",
                                       "forms" : formPayload,
                                       "status":200 ,
                                       "access_token":access_token})
            set_access_cookies(response, access_token)
            return response
        return {"message" : "Invalid Credentials.","status":500}


class UserLogout(Resource):
    @jwt_required()
    def post(self):
        print("dasda")
        response = make_response({"message": "logout successful."})
        unset_jwt_cookies(response)
        return response

class Test(Resource):
    @jwt_required()
    def get(self):
        # Access the identity of the current user with get_jwt_identity
        current_user = get_jwt_identity()
        return {"current_user" : current_user}, 200