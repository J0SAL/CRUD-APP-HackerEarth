from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource

from flask_pymongo import PyMongo
import os

from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app)

app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
mongo = PyMongo(app)

#MODELS

Images = mongo.db.images

# API VIEWS

@app.route('/',methods = ['GET'])
def getImages():
	# get all images - pagination
	images = Images.find({}, {"ImgURL":1,})
	img_list = []
	for i in list(images):
		item = {
			"id" : str(i["_id"]),
			"ImgURL": str(i["ImgURL"])
		}
		img_list.append(item)

	return {"images" : img_list}, 200



@app.route('/',methods = ['POST'])
def uploadImage():
	# upload Images
	data = request.get_json()
	item = {
		"ImgName" : data["image_name"]
		"ImgURL" : data["image_url"]
		"ImgDetails" : data["image_details"]
	}
	Images.insert_one(item)
	return {"message": "Question added Successfully"}, 200


@app.route('/show/<string:id>',methods = ['GET'])
def getImage(id):
	# get image with id - 
	image = Images.find({"_id": ObjectId(id)})
	item = {
		"id" : str(image["_id"]),
		"image_url": str(image["ImgURL"])
		"image_details" : str(image["ImgDetails"])
		"image_name": str(image["ImgName"])
	}
	return {"image" : item}, 200

@app.route('/<string:id>/edit',methods = ['DELETE'])
def deleteImage(id):
	# delete image with id
	pass

@app.route('/delete/<string:id>',methods = ['PUT'])
def editImage(id):
	# update image with id
	pass

@app.route('/<string:name>',methods = ['PUT'])
def searchImage(id):
	# update image with id
	pass


if __name__ == '__main__':
  app.run(debug=True)