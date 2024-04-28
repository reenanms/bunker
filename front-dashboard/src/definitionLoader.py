import chartBuilder
import dataParser
import chartBuilderFactory


class DashboardLineDefinition():
    def __init__(self, columnsSizes, chartDefinitions):
        self.columnsSizes = columnsSizes;
        self.chartDefinitions = chartDefinitions;


def loadDictionaryFieldDefinitions(jsonChartDefinition):
    dictionaryFieldDefinitions = {};
    for fieldName in jsonChartDefinition:
        fieldDefinition = jsonChartDefinition[fieldName];
        jPath = fieldDefinition["jPath"] if "jPath" in fieldDefinition else None;
        dictionaryFieldDefinitions[fieldName] = dataParser.FieldDefinition(fieldDefinition["description"], jPath)

    return dictionaryFieldDefinitions;


def loadDashboarChartDefinition(jsonColumnDefinition):
    dictionaryFieldDefinitions = loadDictionaryFieldDefinitions(jsonColumnDefinition["chartDefinition"]);
    chartType=chartBuilderFactory.ChartTypes[jsonColumnDefinition["chartType"]];
    chartDefinition = chartBuilder.ChartDefinition(chartType,
                                                    jsonColumnDefinition["colletion"],
                                                    jsonColumnDefinition["filter"],
                                                    dictionaryFieldDefinitions);
    return chartDefinition;


def loadDashboarLineDefinition(jsonLineDefinition):
    columnsSizes=[]; chartDefinitions=[];
    for jsonColumnDefinition in jsonLineDefinition:
        columnsSize = jsonColumnDefinition["size"];
        columnsSizes.append(columnsSize);

        chartDefinition = loadDashboarChartDefinition(jsonColumnDefinition);
        chartDefinitions.append(chartDefinition);
    
    dashboardLineDefinition=DashboardLineDefinition(columnsSizes, chartDefinitions);
    return dashboardLineDefinition;


def load(jsonDefinition):
    dashboardLines=[];
    for jsonLineDefinition in jsonDefinition:
        columnChartDefinition=loadDashboarLineDefinition(jsonLineDefinition);
        dashboardLines.append(columnChartDefinition);
    return dashboardLines;