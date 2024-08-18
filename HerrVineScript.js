// ==UserScript==
// @name         HerrVine Script
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @updateURL    https://raw.githubusercontent.com/MultiworldLP/HerrVine-Script/main/HerrVineScript.js
// @downloadURL  https://raw.githubusercontent.com/MultiworldLP/HerrVine-Script/main/HerrVineScript.js
// @description  Lädt Script extern. Um Diebe abzuhalten. :P
// @author       Calvin
// @match        https://www.amazon.de/vine/vine-items*
// @grant        GM_xmlhttpRequest
// @connect      herrvine.de
// ==/UserScript==

(function() {
    'use strict';
     console.log("Skript wird ausgeführt");
    const vfToken = localStorage.getItem('vf-token');
    const scriptUrl = 'https://herrvine.de/vineScriptNotifier?token=' + vfToken;
	function checkTokenAndPrompt() {
		if (!vfToken) {
			const tokenInput = prompt('Bitte geben Sie den Token ein:');
			if (tokenInput) {
				localStorage.setItem('vf-token', tokenInput);
				alert('Token gespeichert!');
			} else {
				alert('Bitte Token beim nächsten mal angeben :P.');
			}
		}
	}
	checkTokenAndPrompt();

    GM_xmlhttpRequest({
        method: 'GET',
        url: scriptUrl,
        onload: function(response) {
            if (response.status === 200) {
                const script = document.createElement('script');
                script.textContent = response.responseText;
                document.body.appendChild(script);
            } else {
                console.error('Fehler beim Laden des Scripts:', response.statusText);
            }
        }
    });
})();
