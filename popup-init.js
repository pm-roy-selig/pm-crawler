function main() {

    document.getElementById( 'go' ).addEventListener( 'click', clickGo );
    chrome.extension.getBackgroundPage().popupLoaded( document );
}

function clickGo() {
    var url = document.getElementById( "baseURL" ).value;
    var auth = document.getElementById( "auth" ).value;
    chrome.extension.getBackgroundPage().popupGo( url, auth );
    window.close();
}

document.addEventListener('DOMContentLoaded', function () {
    main();
});