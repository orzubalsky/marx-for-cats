import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import os

path = os.path.dirname(os.path.abspath(__file__))

def init_database():
  key = os.path.join(path, 'firebase-key.json')
  cred = credentials.Certificate(key)
  firebase = firebase_admin.initialize_app(cred, { 'databaseURL': 'https://marx-for-cats.firebaseio.com' })

def save(id, data):
  records_ref = db.reference('/records')
  return records_ref.child(id).update(data)
