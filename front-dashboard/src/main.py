import dotenv
import streamlit
import json
import definitionLoader
import dashboardLoader

def loadPageConfigs():
    streamlit.set_page_config(
        page_title="Dashboard",
        layout="wide")

#@streamlit.cache_data
def loadDashboardJson(username):
    f = open ('data.json', "r");
    data = json.loads(f.read());
    f.close();
    return data;

def getCurrentUsername():
    return streamlit.query_params["username"] if "username" in streamlit.query_params else None;

def main():
    dotenv.load_dotenv();
    loadPageConfigs();

    username=getCurrentUsername();
    print("username:", username);
    
    definitionFile=loadDashboardJson(username);
    dashboardDefinition=definitionLoader.load(definitionFile);
    dashboardLoader.load(dashboardDefinition);


# to open: http://localhost:8501/?username=username&embed=true
main();
