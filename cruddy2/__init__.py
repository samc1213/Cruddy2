from flask import Flask
app = Flask(__name__)

import cruddy2.views
from cruddy2.model.Model import db
import os
import logging
import psycopg2
import urlparse
import json
from flask import Flask, render_template, request, redirect, url_for, send_file, send_from_directory
from model.Model import *
from model.DBSessionManager import DBSessionManager
from model.Cruddy2Enums import ThingAttributeTypes
from api import *
api = api()
