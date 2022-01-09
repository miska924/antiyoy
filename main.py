import json

from flask import Flask, render_template
import os


app = Flask(__name__)

field = [
    {
        'x': 6,
        'y': 4
    },
    {
        'x': 5,
        'y': 5
    },
    {
        'x': 6,
        'y': 5
    },
    {
        'x': 7,
        'y': 4
    },
    {
        'x': 7,
        'y': 5
    },
    {
        'x': 5,
        'y': 6
    },
    {
        'x': 6,
        'y': 6
    },

    {
        'x': 1,
        'y': 9
    },
    {
        'x': 3,
        'y': 8
    },
    {
        'x': 5,
        'y': 8
    },
    {
        'x': 3,
        'y': 2
    },
    {
        'x': 2,
        'y': 7
    },
    {
        'x': 5,
        'y': 3
    },
    {
        'x': 7,
        'y': 9
    },
    {
        'x': 10,
        'y': 10
    }
]


def dir_last_updated(folder):
    return str(max(os.path.getmtime(os.path.join(root_path, f))
                   for root_path, dirs, files in os.walk(folder)
                   for f in files))


@app.route('/')
def main_page():
    return render_template('index.html', last_updated=dir_last_updated('static'), field=json.dumps(field))


@app.route('/main')
def main():
    return 'main'
