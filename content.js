let body = document.querySelector('body');

const dictionary = {
    "Width:": 'width',
    "Height:": 'height'
}

var observer = new window.MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                if (mutation.addedNodes[i].nodeType != 1 && mutation.addedNodes[i].nodeType != 9) {
                    continue;
                }
                let elems = mutation.addedNodes[i].querySelectorAll('.layerProperty'); 
                console.log("------------");
                let css = fromElemsToCSS(elems);
                console.log(css);
            }
        }
    });    
});

observer.observe(body, {
    childList: true,
    subtree: true
});

function fromElemsToCSS(elems) {
    let css = '.classname {\n';
    for(let i = 0;i < elems.length; i++) {
        let value = getPropertyNameValue(elems[i]);
        console.log('Value', value);
        if(dictionary[value.propertyName]) {
            css += `    ${dictionary[value.propertyName]}: ${value.propertyValue};\n`;
        }
    }
    return `${css}}`;
}

function getPropertyNameValue(elem) {
    let propertyName = elem.querySelector('.propertyName').textContent.trim();
    let propertyValue = elem.querySelector('.propertyValue').textContent;
    return { propertyName, propertyValue };
}

