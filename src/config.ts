const config = {
    customCheckPointAttribute: 'amit-added-custom-attribute', // capital letters not allowed. some problem with cherrio + lowerCaseTags
    specialAttribute: {
        'for-loop1': '*ngFor',
        'for-loop2': '[ngForOf]',
        'qid1': '[attr.qid]',
        'qid2': '[qid]',
        // 'qid3': 'qid'
    },
    // specialAttribute = {
    //     '*ngFor': 'forLoop1',
    //     '[ngForOf]': 'forLoop2',
    //     '[attr.qid]': 'qid1',
    //     '[qid]': 'qid2',
    //     'qid': 'qid3'
    // }
    // ignoreAttributes: [
    //     'qid1', 'qid2', 'qid3'
    // ],
    // selectHtmlElements: [
    //     'a', 'input', 'button'
    // ],
    get qidHtmlElTOSelect() {
        // let str = "";
        // this.selectHtmlElements.map(el => {
        //     str+= `${el}`;
        //     this.ignoreAttributes.map(attr => {
        //         str += `:not([${this.customCheckPointAttribute}="${attr}"])`;
        //     })
        //     str+=','
        // })
        // return str.slice(0,-1);
        return `a:not([${this.customCheckPointAttribute}="qid1"]):not([${this.customCheckPointAttribute}="qid2"]):not([qid]),input:not([${this.customCheckPointAttribute}="qid1"]):not([${this.customCheckPointAttribute}="qid2"]):not([qid]),button:not([${this.customCheckPointAttribute}="qid1"]):not([${this.customCheckPointAttribute}="qid2"]):not([qid])`
        // return `a:not([qid]):not([${this.customCheckPointAttribute}="qid1"]),input:not([qid]),button:not([qid])`;
    }
}
module.exports = config;