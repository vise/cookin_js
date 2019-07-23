// ==UserScript==
// @name         Cookin2
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        http://195.67.73.245/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const eanIds = document.querySelectorAll('[name^="seller_artno"]');
    const m = new Map();

    m.set('1000', 69.72);
    m.set('1001', 10.01);
    m.set('1002', 10.02);
    m.set('1006', 10.06);

    function findParentTarget(el, targTag) {
        let parent = el.parentElement;
        while( parent && parent.tagName.toUpperCase() !== targTag.toUpperCase() && parent !== document) {
            parent = parent.parentElement;
        }
        return parent;
    }

    eanIds.forEach(entry => {
        const artNo = entry.value.replace(/[^\d]*$/, '');
        const parentTr = findParentTarget(entry, 'tr');
        const priceInputEl = parentTr.querySelector('[name^="unit_price"]');
        if (parentTr && priceInputEl && m.has(artNo)) {
            priceInputEl.value = m.get(artNo);
        }
    });
})();
