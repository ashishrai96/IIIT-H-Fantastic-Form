from flask_restful import Resource, reqparse
from flask import request
from models.form import FormModel
from models.user import UserModel
from models.question import QuestionModel
from models.option import OptionModel


class AddForm(Resource):

    def post(self):
        data = request.get_json()
        print(data)
        url = "http://127.0.0.1:5000/form/" + str(data['creator_id']) + "/" + data['title']
        form = FormModel(url,data['title'])
        try:
            user = UserModel.find_by_id(data['creator_id'])
            form.creator = user
            form.save_to_db()
        except:
            return {"message": "An error occurred inserting the form."}, 500
        for questions in data['items']:
            new_question = QuestionModel(questions['question'], 
                                         questions['description'],
                                         questions['type'],
                                         questions['required'], form.id)
            #new_question.parentform = form
            try:
                new_question.save_to_db()
            except:
                {"message": "Error adding questions"}
            print(questions['choices'])
            for options in questions['choices']:
                print(options)
                new_option = OptionModel(new_question.id, options)
                print(type(new_option))
                try:
                    print("sadasd")
                    new_option.save_to_db()
                except:
                    {"message":"Error adding option"}


        return form.json(), 201


class AddResponse(Resource):
    def post(self, _id, _title):
        form = FormModel.query.filter_by(creator_id = _id, title = _title).first()
        
        print(form.title)
        return form.json(), 201

