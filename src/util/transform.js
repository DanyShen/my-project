function mapObjectValueByTarget(data, parts, action, output, targetMeta) {
    var part = parts.splice(0, 1);

    if (targetMeta[part].type === types.Object) {
        output[part] = output[part] || {};
        mapObjectValueByTarget(data, parts, action, output[part], targetMeta[part].item);
    } else {
        output[part] = valueParser[action.type](data, action);
    }
}

function mapObjectValueBySource(data, parts, action, output, target, sourceMeta) {
    var part = parts.splice(0, 1);
    if (sourceMeta[part].type === types.Object) {
        mapObjectValueBySource(data[part], parts, action, output, target, sourceMeta[part].item);
    } else {
        output[target] = valueParser[action.type](data, action);
    }
}

function mapValueByHierarchy(data, sourceParts, targetParts, action, output, sourceMeta, targetMeta, index, isLeafSource, sourceStep, targetStep, arrLength) {
    if (!isLeafSource) {
        sourceStep = sourceStep || 0;
        var sourcePart = sourceParts.length === (sourceStep + 1) ? sourceParts[sourceStep] : sourceParts[sourceStep++];

        if (sourceMeta[sourcePart].type === types.Object) {
            mapValueByHierarchy(data[sourcePart], sourceParts, targetParts, action, output,
                sourceMeta[sourcePart].item, targetMeta, index, isLeafSource, sourceStep, 0, arrLength);

        } else if (sourceMeta[sourcePart].type === types.Array) {
            data[sourcePart].forEach(function (item, itemIndex, list) {
                mapValueByHierarchy(item, sourceParts, targetParts, action, output,
                    sourceMeta[sourcePart].item, targetMeta, itemIndex, true, sourceStep, targetStep, list.length);
            });
        } else {
            mapValueByHierarchy(data, sourceParts, targetParts, action, output, sourceMeta, targetMeta, index, true, sourceStep, 0, arrLength);
        }
    }

    if (isLeafSource) {
        targetStep = targetStep || 0;
        var targetPart = targetParts.length === (targetStep + 1) ? targetParts[targetStep] : targetParts[targetStep++];

        if (targetMeta[targetPart].type === types.Object) {
            output[targetPart] = output[targetPart] || {};
            mapValueByHierarchy(data, sourceParts, targetParts, action, output[targetPart], sourceMeta,
                targetMeta[targetPart].item, index, isLeafSource, sourceStep, targetStep, arrLength);

        } else if (targetMeta[targetPart].type === types.Array) {
            output[targetPart] = output[targetPart] || [];
            var outputStruct = getOutputStructFromExistingList(output[targetPart], index, arrLength);

            mapValueByHierarchy(data, sourceParts, targetParts, action, outputStruct, sourceMeta,
                targetMeta[targetPart].item, index, (sourceStep === sourceParts.length - 1), sourceStep, targetStep, arrLength);

        } else {
            output[targetPart] = valueParser[action.type](data[sourceParts[sourceStep]], action);
        }
    }
}

function getOutputStructFromExistingList(list, index, maxLength) {
    var outputStruct;
    if (list.length < maxLength) {
        outputStruct = {};
        list.push(outputStruct);
    } else {
        outputStruct = list[index];
    }

    return outputStruct;
}

function newValueByHierarchy(data, target, targetMeta, action, output) {

    function createValue(data, targetParts, targetMeta, action, output, step) {
        step = step || 0;
        var part = targetParts.length === (step + 1) ? targetParts[step] : targetParts[step++];

        if (targetMeta[part].type === types.Object) {
            output[part] = output[part] || {};
            createValue(data, targetParts, targetMeta[part].item, action, output[part], step);

        } else if (targetMeta[part].type === types.Array) {
            output[part] = output[part] || [];

            if (output[part].length === 0) {
                var outputStruct = {};
                output[part].push(outputStruct);
                createValue(data, targetParts, targetMeta[part].item, action, outputStruct, step);
            } else {
                output[part].forEach(function (item) {
                    createValue(data, targetParts, targetMeta[part].item, action, item, step);
                });
            }
        } else {
            output[part] = valueParser[action.type](null, action);
        }
    }

    if (!target) {
        return;
    }

    var targetParts = target.split(".");

    createValue(data, targetParts, targetMeta, action, output, 0);
}

function mapValue(data, sourceMeta, targetMeta, mappingItem, output) {
    var source = mappingItem && mappingItem.source;
    var target = mappingItem && mappingItem.target;
    var action = mappingItem && mappingItem.action;

    if (!source) {
        newValueByHierarchy(data, target, targetMeta, action, output);
        return;
    }

    if (!target) {
        return;
    }

    var sourceParts = source.split(".");
    var targetParts = target.split(".");

    if (source.indexOf(".") === -1) {
        if (target.indexOf(".") === -1) {
            output[target] = valueParser[action.type](data[source], action);
        } else {
            // property to hierarchy(object)
            mapObjectValueByTarget(data[source], targetParts, action, output, targetMeta);
        }
        return;
    }
    // hierarchy(object) to property
    if (target.indexOf(".") === -1) {
        mapObjectValueBySource(data, sourceParts, action, output, target, sourceMeta);
        return;
    }

    // hierarchy to hierarchy
    mapValueByHierarchy(data, sourceParts, targetParts, action, output, sourceMeta, targetMeta);
}

var types = {
    String: "string",
    Number: "number",
    Object: "object",
    Array: "array",
    Boolean: "boolean"
};

var valueParser = {
    "DEFAULT": function (data) {
        return data;
    },
    "NEWVALUE": function (data, action) {
        return action.rule && action.rule.value || data;
    },
    "ENUMMAPPING": function (data, action) {
        var rule = action && action.rule || {};

        if (rule.hasOwnProperty(data)) {
            return rule[data];
        } else if (rule.hasOwnProperty("OTHERS")) {
            return rule.OTHERS;
        } else {
            return null;
        }
    }
};

function transform2TargetJSON(transformRule, data) {
    var result = [];
    var mappingObject = transformRule && transformRule.mapping || {};
    var sourceMeta = transformRule && transformRule.sourceMeta || {};
    var targetMeta = transformRule && transformRule.targetMeta || {};
    var mapping = [];

    Object.keys(mappingObject).forEach(function (key) {
        mapping.push(mappingObject[key]);
    });

    var validMapping = mapping.filter(function (item) {
        return !!item.target;
    });
    validMapping.sort(function (itemA, itemB) {
        if (!itemA.source) {
            return 1;
        } else {
            return -1;
        }
    });

    data = data || [];
    data.forEach(function (item) {
        var output = {};

        validMapping.forEach(function (mappingItem) {
            mapValue(item, sourceMeta, targetMeta, mappingItem, output);
        });

        result.push(output);
    });
    return result;
}

export default {
    transform2TargetJSON(transformRule, data) {
        var result = [];
        var mapping = transformRule && transformRule.mapping || {};
        var sourceMeta = transformRule && transformRule.sourceMeta || {};
        var targetMeta = transformRule && transformRule.targetMeta || {};

        var validMapping = mapping.filter(function (item) {
            return !!item.target;
        });
        validMapping.sort(function (itemA, itemB) {
            if (!itemA.source) {
                return 1;
            } else {
                return -1;
            }
        });

        data = data || [];
        data.forEach(function (item) {
            var output = {};

            validMapping.forEach(function (mappingItem) {
                mapValue(item, sourceMeta, targetMeta, mappingItem, output);
            });

            result.push(output);
        });
        return result;
    }
}
