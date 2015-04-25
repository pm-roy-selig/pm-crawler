var popupDoc,
    baseURL,
    auth,
    visitedLinks = {},
    unvisitedLinks = {};

function popupLoaded( document ) {

    popupDoc = document;

}

function popupGo( _url, _auth ) {

    baseURL = _url;
    auth= _auth;

    get( baseURL, parsePage );

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
            fullyResovedURL = eval( url );
            links.push(fullyResolvedURL);
        }catch(e){ console.log() }
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