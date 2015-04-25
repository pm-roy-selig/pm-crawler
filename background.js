var popupDoc,
    baseURL,
    auth,
    url,
    visitedLinks = {},
    unvisitedLinks = {};



function popupLoaded( document ) {

    popupDoc = document;
    chrome.tabs.getSelected(null, setDefaultUrl_);

}


/**
 * Initialize the popup's fields.
 * Callback from chrome.tabs.getSelected.
 * @param {Tab} The currently selected tab.
 * @private
 */
function setDefaultUrl_(tab) {
    // Use the currently selected tab's URL as a start point.
    url;
    if (tab && tab.url && tab.url.match(/^\s*https?:\/\//i)) {
        url = tab.url;
    } else {
        url = 'http://www.example.com/';
    }

    baseURL = url.split( "?" )[0];
    var i  = baseURL.lastIndexOf("/");

    baseURL = baseURL.substr(0, i + 1);
    qs = url.split( "?" )[1] || "";
    matches = qs.match(/opString=([^&]*)/);
    auth = matches[1];

    popupDoc.getElementById('baseURL').value = baseURL;
    popupDoc.getElementById('auth').value = auth;
}

function popupGo( ) {

    if(url && baseURL && auth)
        get( url, parsePage );

}

function parsePage( response ){


    var page = document.createDocumentFragment();
    var div  = document.createElement("div");
        div.innerHTML=response;
        page.appendChild(div);

    var anchors = page.querySelectorAll("a");


    var links = [];

    for( var i in anchors) {

        var a = anchors[ i ];
        resolveURL( links, a.href );
    }

    console.log( links.join("\n") );


}

function get( url, callback ) {

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        if ( httpRequest.readyState == 4 ) {
            var response = httpRequest.responseText;
            callback.call( this, response );
        }
    };
    httpRequest.open( 'GET', url, true );
    httpRequest.send();
}

function resolveURL( links, url ){

    if( url.indexOf( "javascript:" ) === 0 ) {
        try {

            var action = url.match(/javascript:(.*?)/gim)[1];
            alert(url);
            //fullyResovedURL = eval( url );
            //links.push(fullyResolvedURL);
        }catch(e){ console.log(e) }
    }

}


PubMatic = {


    UIBase: {

        getAuthToken:function(){
            return auth;
        },
        redirect: function( url ){
            return baseURL + url;
        }
    }}
//DZGGW0Q4U6IYN15CX26C94VQS5Y7EFDZ