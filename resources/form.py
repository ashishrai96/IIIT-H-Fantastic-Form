from flask_jwt_extended.utils import get_jwt_identity
from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required

from models.form import FormModel
from models.user import UserModel
from models.question import QuestionModel
from models.option import OptionModel
from models.statement import StatementModel


class AddForm(Resource):

    @jwt_required()
    def post(self):
        data = request.get_json()
        if FormModel.query.filter_by(title = data['title'], creator_id = get_jwt_identity()).first():
            return {"message" : "form already exists."}
        url = "http://127.0.0.1:5000/form/" + str(get_jwt_identity()) + "/" + data['title']
        form = FormModel(url,data['title'])
        try:
            user = UserModel.find_by_id(get_jwt_identity())
            form.creator = user
            form.save_to_db()
            print(form.id)
        except:
            return {"message" : "Error adding form to database."}
        for questions in data['items']:
            if questions['type']==0 and questions['isMultiChoice']:
                questions['type']=3
            new_question = QuestionModel(questions['question'], 
                                         questions['description'],
                                         questions['type'],
                                         questions['required'], form.id)
            #new_question.parentform = form
            try:
                new_question.save_to_db()
            except:
                {"message": "Error adding questions"}
            if questions['type'] != 1:
                for options in questions['choices']:
                    new_option = OptionModel(new_question.id, options)
                    try:
                        new_option.save_to_db()
                    except:
                        return {"message":"Error adding option"}
    
            if questions['type'] == 2:
                for statement in questions['statements']:
                    new_statement = StatementModel(new_question.id, statement)
                    try:
                        new_statement.save_to_db()
                    except:
                        return {"message":"Error adding statement"}
        return form.json(), 201


class DeactivateForm(Resource):
    @jwt_required
    def post(_id, _title):
        form = FormModel.query.filter_by(title = _title, creator_id = _id).first()
        form.active = False
        FormModel.save_to_db(form)
        return {"message":"Form Deactivated", "status":200}

