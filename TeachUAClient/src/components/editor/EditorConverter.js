import { convertToRaw, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { convertToHtmlOptions } from "./BlockSetting";

export const saveContent = (content) => {
    if (typeof content == "object") {
        console.log(typeof content);
        return JSON.stringify(convertToRaw(content));
    } else {
        return content;
    }
};

export const convertToHtml = (content) => {
    const contentFromRaw = convertFromJson(content);

    return stateToHTML(contentFromRaw, convertToHtmlOptions);
};

export const convertFromJson = (json) => {
    return convertFromRaw(JSON.parse(json));
};

export const getShortContent = (content) => {
    var contentObject;
    try{
        contentObject = JSON.parse(content);
    } catch(e){
        return "У цього гуртка немає опису...";
    }
    let shortDescription = "";

    contentObject.blocks
        .filter(
            (block) =>
                block.type !== "header-two" && block.type !== "blockquote"
        )
        .map((block) => {
            shortDescription += " " + block.text;
        });

    if (shortDescription === " ") {
        return "У цього гуртка немає опису...";
    }

    return shortDescription;
};
