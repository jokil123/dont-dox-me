import { containsIllegalAlien } from "./textCheck.js";
export const findIllegalAlienElements = (element, illegalAliens) => {
    let illegalAlienElements = [];
    const iteratorFunction = (element) => {
        if (IsElementSus(element, illegalAliens)) {
            illegalAlienElements.push(element);
        }
    };
    const discriminatorFunction = (element) => {
        return containsIllegalAlien(element.innerHTML, illegalAliens);
    };
    ElementRecursive(element, iteratorFunction, discriminatorFunction);
    return illegalAlienElements;
};
const IsElementSus = (element, illegalAliens) => {
    return Array.from(element.attributes).some((attribute) => {
        return containsIllegalAlien([attribute.name, attribute.value, attribute.nodeName], illegalAliens);
    });
};
const ElementRecursive = (element, iteratorFunction, discriminatorFunction) => {
    iteratorFunction(element);
    Array.from(element.children).forEach((child) => {
        if (discriminatorFunction(child)) {
            ElementRecursive(child, iteratorFunction, discriminatorFunction);
        }
    });
};
