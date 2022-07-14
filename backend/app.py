from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource

from flask_pymongo import PyMongo
from bson.objectid import ObjectId
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
@app.route('/<int:page>',methods = ['GET'])
def getImages(page=None):
	# get all images - pagination
	perPage = 2
	page_no = 0
	if page != None:
		page_no = page-1
	count = Images.count_documents({}) / perPage
	if count % perPage != 0:
		count = count + 1
	images = Images.find({}, {"ImgURL":1,}).sort("_id").skip(perPage * page_no).limit(perPage)
	img_list = []
	for i in list(images):
		item = {
			"id" : str(i["_id"]),
			"ImgURL": str(i["ImgURL"])
		}
		img_list.append(item)

	return {"images" : img_list, "page_count" : int(count)}, 200



@app.route('/',methods = ['POST'])
def uploadImage():
	# upload Images
	data = request.get_json()
	item = {
		"ImgName" : data["image_name"],
		"ImgURL" : data["image_url"],
		"ImgDetails" : data["image_details"]
	}
	Images.insert_one(item)
	return {"message": "Image added Successfully"}, 200


@app.route('/show/<string:id>',methods = ['GET'])
def getImage(id):
	# get image with id - 
	image = Images.find_one({'_id': ObjectId(id)})
	if image == None:
		return {"image": {}}, 200
	item = {
		"id" : str(image["_id"]),
		"image_url": str(image["ImgURL"]),
		"image_details" : str(image["ImgDetails"]),
		"image_name": str(image["ImgName"])
	}
	return {"image" : item}, 200

@app.route('/<string:id>/edit',methods = ['PUT'])
def editImage(id):
	# update image with id
	new_item = {}
	data = request.get_json()
	if "image_url" in data:
		new_item["ImgURL"] = data["image_url"]
	if "image_details" in data:
		new_item["ImgDetails"] = data["image_details"]
	if "image_name" in data:
		new_item["ImgName"] = data["image_name"]
	newvalues = { "$set": new_item }
	Images.update_one({'_id': ObjectId(id)}, newvalues)
	return {"message": "Image Updated"}, 200

@app.route('/delete/<string:id>',methods = ['DELETE'])
def deleteImage(id):
	# delete image with id
	Images.delete_one({"_id": ObjectId(id)})
	return {'message': 'Image deleted successfully'},200

@app.route('/<string:name>',methods = ['GET'])
def searchImage(name):
	# update image with id
	image = Images.find_one({"ImgName": str(name)})
	if image == None:
		return {"image" : {}}, 200
	item = {
		"id" : str(image["_id"]),
		"image_url": str(image["ImgURL"]),
		"image_details" : str(image["ImgDetails"]),
		"image_name": str(image["ImgName"])
	}
	return {"image" : item}, 200


if __name__ == '__main__':
  app.run(debug=True)