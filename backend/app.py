from crypt import methods
import re
from flask import Flask, request

app = Flask(__name__)

@app.route('/writeimg',methods=['POST'])
def writeImg():
    if request.method == 'POST':
        pass
    return '<h1>hello</h1>'


if __name__ == '__main__':
    app.run(debug=True)