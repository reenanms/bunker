#import json
#from jsonpath_ng import jsonpath, parse
import jsonpath_ng


class FieldDefinition(object):
    def __init__(self, description, jPath):
        self.description=description;
        self.jPath=jPath;


class ParseDefinition(object):
    dictionaryFieldDefinitions={};


def getValues(item, jPath):
    jpathExpression = jsonpath_ng.parse(jPath);
    matches = jpathExpression.find(item);
    valuesMapped = map(lambda m: m.value, matches);
    values = list(valuesMapped);
    return values;


def getValue(item, jPath):
    values = getValues(item, jPath)
    return values[0] if len(values) > 0 else None;


def ifValidFieldDefinition(fieldDefinition):
    if fieldDefinition is None:
        return False;
    
    if fieldDefinition.description is None:
        return False;

    return True;


def parseItem(item, parseDefinition):
    result=[]
    for fieldName in parseDefinition.dictionaryFieldDefinitions:
        fieldDefinition = parseDefinition.dictionaryFieldDefinitions[fieldName];
        if not ifValidFieldDefinition(fieldDefinition):
            continue;
        
        value = getValue(item, fieldDefinition.jPath) if fieldDefinition.jPath is not None else fieldDefinition.description;
        result.append(value);

    return result;


def parseData(queryResult, parseDefinition):
    result=[]
    for item in queryResult:
        parsedItem = parseItem(item, parseDefinition);
        result.append(parsedItem);

    return result;


def parseColumns(parseDefinition):
    result=[]
    for fieldName in parseDefinition.dictionaryFieldDefinitions:
        fieldDefinition = parseDefinition.dictionaryFieldDefinitions[fieldName];
        if not ifValidFieldDefinition(fieldDefinition):
            continue;
        
        result.append(fieldDefinition.description);

    return result;

def parseColumnsMapper(parseDefinition):
    result={};
    for fieldName in parseDefinition.dictionaryFieldDefinitions:
        fieldDefinition = parseDefinition.dictionaryFieldDefinitions[fieldName];
        if not ifValidFieldDefinition(fieldDefinition):
            continue;
        
        result[fieldName] = fieldDefinition.description;

    return result;


class ParseResult(object):
    def __init__(self, data, columns, columnsMapper):
        self.data=data;
        self.columns=columns;
        self.columnsMapper=columnsMapper;

def parse(queryResult, parseDefinition):
    data = parseData(queryResult, parseDefinition);
    columns = parseColumns(parseDefinition);
    columnsMapper = parseColumnsMapper(parseDefinition);
    return ParseResult(data, columns, columnsMapper);