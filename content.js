let body = document.querySelector('body');

const dictionary = {
    'Width:': {
        type: 'Pt',
        cssName: 'width'
    },
    'Height:': {
        type: 'Pt', 
        cssName: 'height'
    },
    'Radius:': {
        type: 'Pt', 
        cssName: 'border-radius'
    },
    'Size:': {
        type: 'Pt', 
        cssName: 'font-size'
    },
    'Align:': {
        type: 'String',
        cssName: 'text-align'
    }
}

var observer = new window.MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                if (mutation.addedNodes[i].nodeType != 1 && mutation.addedNodes[i].nodeType != 9) {
                    continue;
                }
                let elems = mutation.addedNodes[i].querySelectorAll('.layerProperty'); 
                getColorValue(body);
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
        let nameValue = getPropertyNameValue(elems[i]);
        console.log('Value', nameValue);
        if(dictionary[nameValue.propertyName]) {
            let cssValue;
            if(dictionary[nameValue.propertyName]) {
                if(dictionary[nameValue.propertyName].type === 'Pt') {
                    cssValue = ptToPx(nameValue.propertyValue) + 'px';
                }
                else {
                    cssValue = nameValue.propertyValue;
                }
                css += `    ${dictionary[nameValue.propertyName].cssName}: ${cssValue};\n`;
            }
        }
    }
    return `${css}}`;
}

function getPropertyNameValue(elem) {
    let propertyName = elem.querySelector('.propertyName').textContent.trim();
    let propertyValue = elem.querySelector('.propertyValue').textContent;
    return { propertyName, propertyValue };
}

function ptToPx(ptValue) {
    return Number.parseInt(ptValue);
}

function getColorValue(elem) {
    let sidebarSections = elem.querySelectorAll('.sidebarSection');
    console.log(sidebarSections);
}