from flask_restful import Resource, reqparse
from flask_jwt import jwt_required
from models.question import QuestionModel


class Question(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('type',
                        type=str,
                        required=True,
                        help="Every question needs a type."
                        )
    parser.add_argument('description',
                        type=str,
                        required=True,
                        help="Every question needs a description."
                        )
    parser.add_argument('form_id',
                        type=int,
                        required=True,
                        help="Every question needs a form_id."
                        )

    def post(self):
        data = Question.parser.parse_args()
        question = QuestionModel(**data)
        try:
            question.save_to_db()
        except:
            return {"message": "An error occurred inserting the question."}, 500

        return question.json(), 201


class QuestionList(Resource):
    def get(self, id):
        return {'questions': list(map(lambda x: x.json(), QuestionModel.query.filter_by(form_id = id).all()))}
