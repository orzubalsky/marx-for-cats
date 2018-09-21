from apiclient.discovery import build
from google.oauth2 import service_account
from database import init_database, save
import pdb
import random, string
import os

path = os.path.dirname(os.path.abspath(__file__))


SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']
KEY_FILE_LOCATION = os.path.join(path, 'client_secrets.json')
VIEW_ID = '159385875'


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
        'orderBys': [ { 'fieldName': metrics[0] } ]
      }]
    }
  ).execute()


def get_city(analytics):
  response = get_report(analytics, ['ga:sessions'], ['ga:region'])
  city = response['reports'][0]['data']['rows'][-1:][0]['dimensions'][0]
  value = response['reports'][0]['data']['rows'][-1:][0]['metrics'][0]['values'][0]
  return (city, value)


def get_chapter(analytics):
  response = get_report(analytics, ['ga:sessions'], ['ga:eventCategory', 'ga:eventAction', 'ga:eventLabel'])
  pdb.set_trace()


def main():
  init_database()
  analytics = initialize_analyticsreporting()
  # (city, value) = get_city(analytics)
  result = get_chapter(analytics)

  identifier = ''.join(random.choice(string.lowercase) for i in range(8))
  print result
  # save(identifier, { 'city': city, 'value': value })


if __name__ == '__main__':
  main()
