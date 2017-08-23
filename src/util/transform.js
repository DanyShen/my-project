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
    transformData(mappingRule, data) {
        var result = [];
        var rules = mappingRule && mappingRule.mapping || [];

        data = data || [];
        // data.forEach(function(item) {
        //     rules.forEach(function(ruleItem) {
        //         ruleItem.source
        //     });
        // });

        rules.forEach(function(ruleItem) {
            if (ruleItem.source && ruleItem.source.length === 0) {
                return;
            }

            if (isEmptyObject(ruleItem.target)) {
                return;
            }

            var output = {};
            data.forEach(function(item) {
                // var propTarget = getLeafProperty(ruleItem.target);

                var targetItem = ruleItem.target;
                if (!output[targetItem.name]) {
                    output[targetItem.name] = targetItem.type === types.Array ? [] : targetItem.type === types.Object ? {} : null;
                }

                var value = getValueBySource(item, ruleItem.source, ruleItem.rule); 
            });
        });
        return result;
    }
}
