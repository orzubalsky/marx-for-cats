from googleapiclient.discovery import build
from google.oauth2 import service_account
from database import init_database, save
import json
import slugify
import pdb
import random, string
import os

path = os.path.dirname(os.path.abspath(__file__))


SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
KEY_FILE_LOCATION = os.path.join(path, 'client_secrets.json')
VIEW_ID = '182326572'


def initialize_analyticsreporting():
  credentials = service_account.Credentials.from_service_account_file(
        KEY_FILE_LOCATION, scopes=SCOPES)

  analytics = build('analyticsreporting', 'v4', credentials=credentials)

  return analytics


def get_report(analytics, metrics = [], dimensions = []):
  return analytics.reports().batchGet(
    body={
      'reportRequests': [
      {
        'viewId': VIEW_ID,
        'dateRanges': [{'startDate': '2018-01-01', 'endDate': 'today'}],
        'metrics': [{ 'expression': m } for m in metrics],
        'dimensions': [{ 'name': d } for d in dimensions ],
        'orderBys': [ { 'fieldName': metrics[0] } ],
        'pageSize': 100000
      }]
    }
  ).execute()


def get_city(analytics):
  response = get_report(analytics, ['ga:sessions'], ['ga:region'])
  city = response['reports'][0]['data']['rows'][-1:][0]['dimensions'][0]
  value = response['reports'][0]['data']['rows'][-1:][0]['metrics'][0]['values'][0]
  return (city, value)

def row(r):
  return {
    'name': r['dimensions'][2],
    'event': r['dimensions'][1],
    'value': r['metrics'][0]['values'][0]
}

def createMap (dataObject, data, key):
  for i in data:
    name, value, event = row(i).values()

    slug = slugify.slugify(name)

    if name == '/':
      slug = 'homepage'

    if slug not in dataObject[key]:
        dataObject[key][slug] = {
          'name': name,
          'slug': slug,
          'events': {
            'attention': {},
            'watch': {},
            'play': 0
          }
        }

    if (event.lower() == 'play'):
      dataObject[key][slug]['events']['play'] = int(value)

    if ('attention' in event.lower()):
      try:
        dataObject[key][slug]['events']['attention'][int(event.split('-')[-1])] = int(value)
      except ValueError:
        pass

    if ('watch' in event.lower()):
      try:
        dataObject[key][slug]['events']['watch'][int(event.split('-')[-1][:-1])] = int(value)
      except ValueError:
        pass

  return dataObject


def get_events(analytics):
  response = get_report(analytics, ['ga:sessions'], ['ga:eventCategory', 'ga:eventAction', 'ga:eventLabel'])

  # import pdb
  # pdb.set_trace()

  if ('rows' in response['reports'][0]['data']):
    rows = response['reports'][0]['data']['rows']

    data = {
      'videos': {},
      'pages': {},
      'ads': {}
    }

    videos = [row for row in rows if row['dimensions'][0] == 'Video']
    pages = [row for row in rows if row['dimensions'][0] == 'Page']
    ads = [row for row in rows if row['dimensions'][0] == 'Ad']

    data = createMap(data, videos, 'videos')
    data = createMap(data, pages, 'pages')
    data = createMap(data, ads, 'ads')

    return data

  return False


def main():
  init_database()
  analytics = initialize_analyticsreporting()
  data = get_events(analytics)

  if (data):
    save(data)


if __name__ == '__main__':
  main()
