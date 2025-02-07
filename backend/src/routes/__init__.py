from flask import Blueprint, jsonify
from .response import response
from .query import query_api

# Initiate a routes blueprint to add all the routes.
routes = Blueprint("routes", __name__)

# Add a health check route.
@routes.route("/", methods=["GET"])
def health_check():
    return jsonify(response(True, "App is healthy.")), 200

# Add title route.
routes.register_blueprint(query_api, url_prefix="/api/query")