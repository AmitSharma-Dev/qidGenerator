const cheerio = require('cheerio')
const htmlparser2 = require('htmlparser2');
const config = require('./config');

export const updateQidInHtml = (template: any, qidPrefixInput: string) => {
    Object.entries(config.specialAttribute).map((attr) => {
        template = template.split(attr[1]).join(`${config.customCheckPointAttribute}="${attr[0]}" ${attr[1]}`);
    })
    const dom = htmlparser2.parseDOM(template, {
        lowerCaseTags: false,
        lowerCaseAttributeNames: false
    });
    const $ = cheerio.load(dom, {
        decodeEntities: false
    });
    let qidEl = $(config.qidHtmlElTOSelect);
    qidEl.each((i, v) => {
        $(v).attr('amitaddedqid', `${qidPrefixInput}-${i}`);
    })
    let ngForEl = $(`[${config.customCheckPointAttribute}="for-loop1"]`);
    ngForEl.each((i, v) => {

        qidEl = $(config.qidHtmlElTOSelect, v);
        if (qidEl && qidEl.length > 0) {
            let newforLoopIndex = findForLoopIndexVariable($, v);
            qidEl.each((i1, v1) => {
                const previousQIDValue = $(v1).attr('amitaddedqid');
                $(v1).attr('amitaddedqid', previousQIDValue + '-' + newforLoopIndex);
            })
        }
    })

    let html = $.html()
    Object.entries(config.specialAttribute).map((attr) => {
        html = html.split(` ${config.customCheckPointAttribute}="${attr[0]}"`).join("");
    })
    html = html.split('amitaddedqid').join('qid');

    return html;
}

const findForLoopIndexVariable = function ($, element) {
    var forAttributeValue = $(element).attr('*ngFor');
    var matched = forAttributeValue.match(';.*let.*index.*');
    if (matched && matched[0]) {
        return matched[0].substring(matched[0].indexOf('let') + 3, matched[0].indexOf('=')).trim();
    } else {
        // handle mutliple for loop scenario
        $(element).attr('*ngFor', forAttributeValue + ';let qidIndex = index;');
        return 'qidIndex';
    }
}