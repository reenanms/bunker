import streamlit
import chartBuilder

def load(dashboardDefinition):
    for dashboardLine in dashboardDefinition:
        currentColumnIndex=0;
        lineColumns = streamlit.columns(dashboardLine.columnsSizes, gap='small');
        for chartDefinition in dashboardLine.chartDefinitions:
            with lineColumns[currentColumnIndex]:
                chartBuilder.build(chartDefinition);
            currentColumnIndex += 1;
