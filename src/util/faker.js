import BookListData from '../mock/booklist.json'
import BpData from '../mock/b1_bp_customer_data_20.json'
import BpSimplifiedData from '../mock/b1_bp_customer_data_simplified_50.json'
import BpMappingRule from '../mock/mappingRule2.json'

export default {
    getBookListData() {
        return BookListData;
    },
    getBPData() {
        return BpData;
    },
    getBpSimplifiedData() {
        return BpSimplifiedData;
    },
    getBpMappingRule() {
        return BpMappingRule;
    }
}
