from flask import Flask, render_template, request, jsonify, send_file
import numpy as np
import scipy.misc
import base64
from io import BytesIO
from static.network.Artist_nw.scripts.label_image import getArtIDontLike
import time
import re
from random import randint

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/artILike', methods=['GET', 'POST'])
def artILike():
    if request.method == "POST":
        painterIDontLikeList=[]
        inputImg = request.get_json('imagePath')['imagePath']
        for path in inputImg:
                path = re.sub('/../', '', path)
                print("path is", path)
                outputImg = getArtIDontLike(path.replace('\n', ''))
                print("outputImg is", outputImg)
                painterIDontLikeList.append(outputImg)
        # scipy.misc.imsave('static/output.png', inputImg)

        return jsonify(artist=painterIDontLikeList[randint(0,len(painterIDontLikeList)-1)])


if __name__=="__main__":
    app.run(host='0.0.0.0', port=80)