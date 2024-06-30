import dotenv
import streamlit
import json
import definitionLoader
import dashboardLoader
import database

def loadPageConfigs():
    streamlit.set_page_config(
        page_title="Dashboard",
        layout="wide")

#@streamlit.cache_data
def loadDashboardJson(username):
    # f = open ('data.json', "r");
    # data = json.loads(f.read());
    # f.close();
    # return data;

    if (username is None):
        return None;

    try:
        queryResult = database.readCollectionData("DashboardConfig", {"username": { "$eq": username} });
        for item in queryResult:
            config = item["config"];
            data = json.loads(config);
            return data;
    except:
        return None;

    return None;

def getCurrentUsername():
    return streamlit.query_params["username"] if "username" in streamlit.query_params else None;

def main():
    dotenv.load_dotenv();
    loadPageConfigs();

    username=getCurrentUsername();
    print("username:", username);
    
    definitionFile=loadDashboardJson(username);
    if (definitionFile is None):
        return

    dashboardDefinition=definitionLoader.load(definitionFile);
    dashboardLoader.load(dashboardDefinition);


# to open: http://localhost:8501/?username=admin&embed=true
main();
