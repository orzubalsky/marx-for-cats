import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

def init_database():
  cred = credentials.Certificate('firebase-key.json')
  firebase = firebase_admin.initialize_app(cred, { 'databaseURL': 'https://marx-for-cats.firebaseio.com' })

def save(id, data):
  records_ref = db.reference('/records')
  return records_ref.child(id).update(data)
