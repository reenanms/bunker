import os
from pymongo import MongoClient

def getConnection():
   NOSQL_CONNECTION = os.environ["NOSQL_CONNECTION"]
   client = MongoClient(NOSQL_CONNECTION)
   return client.get_database()

def readCollectionData(collectionName, query={}):
   connection = getConnection();
   collection = connection[collectionName]

   queryResult = collection.find(query)
   return queryResult;
  
# if __name__ == "__main__":   
#    dbname = get_database()