import pandas
import database
import dataParser
import chartBuilderFactory

class ChartDefinition(dataParser.ParseDefinition):
    def __init__(self, type: chartBuilderFactory.ChartTypes, colletion, filter, dictionaryFieldDefinitions):
        self.chartType = type;
        self.colletion=colletion;
        self.filter=filter;
        self.dictionaryFieldDefinitions = dictionaryFieldDefinitions;

def build(chartDefinition: ChartDefinition):
    queryResult = database.readCollectionData(chartDefinition.colletion, chartDefinition.filter);
    parseResult = dataParser.parse(queryResult, chartDefinition);

    dataFrame = pandas.DataFrame(data=parseResult.data, columns=parseResult.columns);
    charBuilder = chartBuilderFactory.createChartBuilder(chartDefinition.chartType);
    charBuilder(dataFrame, parseResult.columnsMapper);
