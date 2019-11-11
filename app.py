from flask import Flask, request, Response, render_template, redirect, flash, url_for
import requests
import itertools
from flask_wtf.csrf import CSRFProtect
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
import wtforms
import re

class WordForm(FlaskForm):
    avail_letters = StringField("Letters")
    pattern = StringField("Pattern")
    submit = SubmitField("Search")
    min_length = StringField("Min")
    max_length = StringField("Max")
    
csrf = CSRFProtect()
app = Flask(__name__)
app.config["SECRET_KEY"] = "row the boat"
csrf.init_app(app)

@app.route('/')
def default():
    return redirect(url_for('index'))

@app.route('/index')
def index():
    form = WordForm()
    return render_template("index.html", form=form)

@app.route('/words', methods=['POST','GET'])
def letters_2_words():

    form = WordForm()
    if form.validate_on_submit():
        letters = form.avail_letters.data
        pattern = form.pattern.data
        min_length = form.min_length.data
        max_length = form.max_length.data
    else:
        return render_template("index.html", form=form)

    good_words = set()
    f = open('sowpods.txt')

    if(pattern != ""):
        user_regex_string = re.compile(pattern)
        strings = re.findall(user_regex_string, f.read())
    else:
        strings = f.readlines()
    
    if(min_length == ""):
        min_length = 3
    else:
        min_length = int(min_length)
    
    if(max_length == ""):
        max_length = 10
    else:
        max_length = int(max_length)

    for x in strings:
        word_length = len(x)
        if(min_length <= word_length and word_length <= max_length):
            good_words.add(x.strip().lower())

    f.close()
    word_set = set()
    for l in range(3,len(letters)+1):
        for word in itertools.permutations(letters,l):
            w = "".join(word)
            if w in good_words:
                word_set.add(w)

    word_set = sorted(word_set, reverse=False)
    word_set = sorted(word_set, reverse=False, key=len)

    return render_template('wordlist.html',
        wordlist=word_set,
        name="CS4131", key = "84247a35-6917-4697-b294-d6cca6cd9052")

@app.route('/proxy')
def proxy():
    result = requests.get(request.args['url'])
    resp = Response(result.text)
    resp.headers['Content-Type'] = 'application/json'
    return resp

# import re

# def findAllWords(fname):
#     fp = open(fname)
#     strings = re.findall(r'',fp.read())
#     print(strings)

# #findAllWords("test.txt")

# n = ['yyyyy', 'aaaaa', 'yyy', 'aaa']
# n.sort() # sorts normally by alphabetical order
# print(n)
# n.sort(key=len, reverse=False) # sorts by descending length
# print(n)
