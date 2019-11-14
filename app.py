from flask import Flask, request, Response, render_template, redirect, flash, url_for
import requests
import itertools
from flask_wtf.csrf import CSRFProtect
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
import wtforms
from wtforms.validators import Regexp
import re

letters = ""
pattern = ""
length = 0

class WordForm(FlaskForm):
    avail_letters = StringField("Letters", validators= [
        Regexp(r'^$|^[a-z]+$', message="Must contain only lowercase letters a-z")
    ])
    
    pattern = StringField("Pattern", validators= [
        Regexp(r'^$|^[a-z|.]+$', message="Must contain only lowercase letters a-z or .")
    ])

    length = StringField("Length", validators= [
        Regexp(r'^$|^(3|4|5|6|7|8|9|10)$', message="Must contain only one number in range 3-10")
    ])

    submit = SubmitField("Search")
    

csrf = CSRFProtect()
app = Flask(__name__)
app.config["SECRET_KEY"] = '84247a35-6917-4697-b294-d6cca6cd9052'  
csrf.init_app(app)

@app.route('/')
def default():
    return redirect(url_for('index'))

@app.route('/index', methods=['POST','GET'])
def index():
    global letters
    global pattern
    global length
    form = WordForm()
    if form.validate_on_submit():
        letters = form.avail_letters.data
        pattern = form.pattern.data
        length = form.length.data

        if length != "" and pattern != "" and len(pattern) != int(length):
            return render_template("index.html", form=form, error="Pattern Length and Length must be equal.")
        elif letters == "" and pattern == "":
            return render_template("index.html", form=form, error="Letters or Pattern must be provided")
        elif length != "" and letters != "" and int(length) > len(letters):
            return render_template("index.html", form=form, error="Length cannot be greater than number of letters.")
        return redirect(url_for('letters_2_words'))
    else:
        return render_template("index.html", form=form)

@app.route('/words', methods=['POST','GET'])
def letters_2_words():
    global letters
    global pattern
    global length

    form = WordForm()
    good_words = set()
    f = open('sowpods.txt')

    if(pattern != ""):
        user_regex_string = re.compile(pattern)
        strings = re.findall(user_regex_string, f.read())
    else:
        strings = f.readlines()
    
    if length == "":
        length = 0
    else:
        length = int(length)
        length += 1

    if letters == "" and pattern != "" and length != "" and length != 0:
        length -= 1

    if pattern != "":
        length = len(pattern)

    for x in strings:
        word_length = len(x)
        if(length == 0):
            good_words.add(x.strip().lower())
        elif(length != 0 and length == word_length):
            good_words.add(x.strip().lower())
    f.close()
    word_set = set()
    if(letters != ""):
        for l in range(3,len(letters)+1):
            for word in itertools.permutations(letters,l):
                w = "".join(word)
                if w in good_words:
                    word_set.add(w)
    else:
        word_set = list(good_words)
    
    word_set = sorted(word_set, reverse=False)
    word_set = sorted(word_set, reverse=False, key=len)

    return render_template('wordlist.html',
        wordlist=word_set,
        name="CS4131")

@app.route('/proxy/<word>')
def proxy(word):
    result = requests.get(f'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=' + app.config["SECRET_KEY"])
    resp = Response(result.text)
    resp.headers['Content-Type'] = 'application/json'
    return resp