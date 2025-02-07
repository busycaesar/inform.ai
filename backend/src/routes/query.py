from flask import Blueprint, request, jsonify
from .response import response
from llm import get_search_result

query_api = Blueprint("query_api", __name__)

@query_api.route("/", methods=["POST"])
def query_api_post():
    # Get all the data from request body.
    data = request.get_json()

    # Get the query of the user.
    query = data.get("query")

    if not query:
        return jsonify(response(False, "Query is not provided.")), 400
    
    try:
        # Get the response by passing the query.
        result = get_search_result(query) 

        return jsonify(response(True, "Sent the response", result)), 200
    
    except Exception as e:
        return jsonify(response(False, f"Error: {str(e)}")), 500