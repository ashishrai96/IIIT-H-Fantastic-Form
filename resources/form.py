from flask_restful import Resource, reqparse
from models.form import FormModel


class Form(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('url',
                        type=str,
                        required=True,
                        help="Every question needs a URL."
                        )
    parser.add_argument('creator_id',
                        type=int,
                        required=True,
                        help="Every question needs a creator_id."
                        )

    def post(self):
        data = Form.parser.parse_args()
        
        form = FormModel(data['url'],data['creator_id'])
        try:
            form.save_to_db()
        except:
            return {"message": "An error occurred inserting the form."}, 500
        return form.json(), 201

