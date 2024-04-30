
import pandas
import streamlit
from enum import StrEnum, auto

class ChartTypes(StrEnum):
    LINE = auto()
    AREA = auto()
    BAR = auto()
    MAP = auto()

def getProp(mapper, propName):
    return mapper[propName] if propName in mapper else None

def chartLineBuilder(data:pandas.DataFrame, mapper):
    streamlit.line_chart(data,
                         x=getProp(mapper, "x"),
                         y=getProp(mapper, "y"),
                         color=getProp(mapper, "color"));

def chartAreaBuilder(data:pandas.DataFrame, mapper):
    streamlit.area_chart(data,
                         x=getProp(mapper, "x"),
                         y=getProp(mapper, "y"),
                         color=getProp(mapper, "color"));

def chartBarBuilder(data:pandas.DataFrame, mapper):
    streamlit.bar_chart(data,
                         x=getProp(mapper, "x"),
                         y=getProp(mapper, "y"),
                         color=getProp(mapper, "color"));

def chartMapBuilder(data:pandas.DataFrame, mapper):
    streamlit.map(data,
                  latitude=getProp(mapper, "latitude"),
                  longitude=getProp(mapper, "longitude"),
                  size=getProp(mapper, "size"))

#sample:
# def createMapChart():
#     data={
#         "lat": np.random.randn(10) / 50 + 37.76,
#         "lon": np.random.randn(10) / 50 + -122.4,
#         "siz": np.random.randn(10) * 100,
#         "col": np.random.rand(10, 4).tolist(),
#     };
#     df = pd.DataFrame(data)
#     #st.map(df, latitude='lat', longitude='lon', size='siz', color='col')
#     st.map(df, latitude='lat', longitude='lon', size='siz')


def createChartBuilder(type:ChartTypes):
    chartBuilders = {
        ChartTypes.LINE: chartLineBuilder,
        ChartTypes.AREA: chartAreaBuilder,
        ChartTypes.BAR: chartBarBuilder,
        ChartTypes.MAP: chartMapBuilder,
    };
    return chartBuilders[type];
