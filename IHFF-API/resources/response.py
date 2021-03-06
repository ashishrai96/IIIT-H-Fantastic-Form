from flask_restful import Resource
from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

import copy
from models.form import FormModel
from models.user import UserModel
from models.question import QuestionModel
from models.response import ResponseModel
from models.statement import StatementModel

def get_statements(question_id):
    statements= StatementModel.query.filter_by(ques_id=question_id)
    res=[]
    for statement in statements:
        state=statement.statement
        res.append(state)
    
    return res

def get_form_structure(_id,_title):
    form = FormModel.query.filter_by(title = _title, creator_id = _id).first()
    items = [x.json() for x in QuestionModel.query.filter_by(form_id = form.id)]
    n=len(items)
    for i in range(n):
        if items[i]['type']==3:
            items[i]['isMultiChoice']=True
            items[i]['type']=0
        else:
            items[i]['isMultiChoice']=False
        
        if items[i]['type']==2:
            items[i]['statements']=get_statements(items[i]['questionId'])
    for x in QuestionModel.query.filter_by(form_id = form.id):
        print(x.question)
    #print(items)
    #print(form.title)
    formPayload = {
        "title" : _title,
        "formId" : form.id,
        "items" : items,
        "active" : form.active
    }
    return formPayload

class AddResponse(Resource):
    @jwt_required()
    def get(self, _id, _title):
        formPayload=get_form_structure(_id,_title)
        return formPayload



    @jwt_required()
    def post(self, _id, _title):
        data = request.get_json()
        user = UserModel.find_by_id(get_jwt_identity())
        form = FormModel.find_by_id(data['formId'])
        # ques = set()
        # quesObj = form.questions
        # for i in quesObj:
        #     ques.add(i.id)
        # print(ques)
        if ResponseModel.query.filter_by(user_id = user.id, form_id = form.id).first():
            return {"message" : "You've already added a response"}
        for question in data['items']:
            print(question)
            # if question['questionId'] not in ques:
            #     return{"message": "Invalid Response."}
            quesObj = QuestionModel.find_by_id(question['questionId'])
            answer = ""
            if question['isMultiChoice']:
                for i in question['answer']:
                    answer = answer + i + " $$$ "
            elif question['type']==2:
                for i in question['answer']:
                    answer = answer + i + " $$$ "
            else:
                answer = question['answer']
            resObj = ResponseModel(form.id, user.id, quesObj.id, answer)
            resObj.save_to_db()
        return {"message" : "Response added."}


class GetResponse(Resource):
    @jwt_required()
    def get(self, _id, _title):
        formstruc = get_form_structure(_id, _title)
        #print(formstruc)
        form = FormModel.query.filter_by(title = _title, creator_id = _id).first() 
        resObj = form.response
        users = set()
        for i in resObj:
            users.add(i.user_id)
        response = []
        print(users)
        for i in users:
            responses = ResponseModel.resp_user(i,form.id)
            temp = copy.deepcopy(formstruc)
            for question in temp['items']:
                if question['type'] == 2:
                    question['answer'] = responses[question['questionId']].split(' $$$ ')
                elif question['isMultiChoice']:
                    question['answer'] = responses[question['questionId']].split(' $$$ ')
                else:
                    question['answer'] = responses[question['questionId']]
            response.append(temp)
        return {"title": form.title, "response" : response, "active":form.active}, 200 