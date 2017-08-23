function isString(it) {
    return Object.prototype.toString.call(it) === '[object String]';
}

function isObject(it) {
    return Object.prototype.toString.call(it) === '[object Object]';
}

function isArray(it) {
    return Object.prototype.toString.call(it) === '[object Array]';
}

function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}

function getLeafProperty(item) {

}

function getValueBySource(data, source, rule) {
    function getValue(sourceData, sourceItem, ) {
        var result = {
            value: sourceData[sourceItem.name],
            type: sourceItem.type
        };

        if (sourceItem.item) {
            result = getValue(result, sourceItem.item);
        }

        return result;
    }

    var valueList = [];

    source = source || [];

    for (var i = 0; i < source.length; i++) {
        var value = getValue(data, source[i]);
        valueList.push(value);
    }

    return isString(rule) ? ruleList[rule](valueList) : ruleList["mapping"](valueList, rule);
}

function getValueByHierarchy(data, sourceMeta, index) {}

function generateDefaultValue(type) {
    switch (type) {
        case types.Object:
            return {};
        case types.Array:
            return [];
        default:
            return null;
    }
}

function generateOutput(data, sourceMeta, targetMeta, mappingItem, output) {
    var target = mappingItem && mappingItem.target;
    var targetValue;
    if (!target) {
        return;
    }

    if (target.indexOf(".") === -1) {
        output[target] = generateDefaultValue(targetMeta[target].type);
    } else {
        var targetParts = target.split(".");
        var currentPart = targetParts.splice(0, 1);

        output[target] = generateDefaultValue(targetMeta[currentPart].type);
    }




    var source = mappingItem && mappingItem.source;
    var sourceValue;
    if (!source) {
        sourceValue = null;
    }

    if (source.indexOf(".") === -1) {
        sourceValue = data[source];
    }

    var sourceParts = source.split(".");


    

    
}

function getSourceValue(data, sourceMeta, targetMeta, mappingItem, output) {
    var source = mappingItem && mappingItem.source;

    if (!source) {
        return null;
    }

    if (source.indexOf(".") === -1) {
        return data[source];
    }

    var parts = source.split(".");

    function getValue(parts, sourceMeta, targetMeta) {}
    // var prop = data;
    // var meta = sourceMeta;

    // parts.forEach(function(part) {

    // });
    // for (var i = 0; i < parts.length; i++) {
    //     var part = parts[i];
    //     meta = meta[part];
    //     if (meta[part].type === types.Object) {
    //         prop = prop[part];
    //     }

    //     if (meta[part].type === types.Array) {
    //         // 
    //     }
    // }

    return porp;
}

var types = {
    String: "String",
    Number: "Number",
    Object: "Object",
    Array: "Array",
    Enum: "Enum"
};
var ruleList = {
    "DEFAULT": function(data) {
        var result = [];
        data = data || [];
        for (var i = 0; i< data.length; i++) {
            result.push(data[i].value);
        }
        return result.length === 1 ? result[0] : result.join();
    },

    "mapping": function(data, rule) {
        // 
    }
};

export default {
    transformData(transformRule, data) {
        var result = [];
        var mapping = transformRule && transformRule.mapping || [];
        var sourceMeta = transformRule && transformRule.sourceMeta || {};
        var targetMeta = transformRule && transformRule.targetMeta || {};

        data = data || [];

        data.forEach(function(item) {});

        data.forEach(function(item) {
            var output = {};
            mapping.forEach(function(mappingItem) {
                if (!mappingItem.target) {
                    return;
                }

                var sourceValue = getSourceValue(item, sourceMeta, targetMeta, mappingItem, output);
            });
        });

        mapping.forEach(function(mappingItem) {
            if (!mappingItem.target) {
                return;
            }

            var output = {};

            data.forEach(function(item) {
                var sourceValue;
                if (!mappingItem.source) {
                    sourceValue = null;
                } else {
                    var sourceParts = mappingItem.source.split(".");
                    if (sourceParts.length === 1) {
                        sourceValue = item[mappingItem.source];
                    } else if (sourceParts.length > 1) {
                        sourceValue = getValueByHierarchy(item, sourceMeta);
                    }
                }
                



                var parts = mappingItem.target.split(".");

                if (parts.length === 1) {
                    // TODO
                    if (!output[mappingItem.target]) {
                        output[mappingItem.target] = null;
                    }
                } else if (parts.length > 1) {
                    // TODO
                }
            });


            // var output = {};
            // data.forEach(function(item) {
            //     // var propTarget = getLeafProperty(ruleItem.target);

            //     var targetItem = ruleItem.target;
            //     if (!output[targetItem.name]) {
            //         output[targetItem.name] = targetItem.type === types.Array ? [] : targetItem.type === types.Object ? {} : null;
            //     }

            //     var value = getValueBySource(item, ruleItem.source, ruleItem.rule); 
            // });
        });
        return result;
    }
}
