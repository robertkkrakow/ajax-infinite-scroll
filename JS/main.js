'use strict';

//definicja funkcji ajax

function ajax(ajaxOptions) {

    //opcje polaczenia i jego typu
    var options = {
        type: ajaxOptions.type || 'POST',
        url: ajaxOptions.url || '',
        onError: ajaxOptions.onError || function () {},
        onSuccess: ajaxOptions.onSuccess || function () {},
        dataType: ajaxOptions.dataType || 'text',
    }
    //funkcja sprawdzajaca statusy polaczenia
    function httpSuccess(httpRequest) {
        try {
            return(httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 ||
                  //dotyczy safari
                  navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined');
        } catch(e){
            return false;
        }
    }


    //utworzenie obiektu XMLHTTPRequest
    var httpReq = new XMLHttpRequest();

    //otwieranie polaczenia = metoda np post lub get | url | asynchronicznie czy nie
    httpReq.open(options.type, options.url, true);

    //iterowane za kazdym razem kiedy zmienia sie sie ready state od 0 do 4
    httpReq.onreadystatechange = function () {
        if (this.readyState == 4) {
            //sprawdz status polaczenia
            if(httpSuccess(this)){
                //console.log('polaczenia dziala');
                //console.log(this.readyState);
                //console.log(this.status);
                
                //jesli dane w formacie XML to zwroc obiekt responseXML, w przeciwnym wypadku 
                // responsetext (JSON to text)
                var returnData = (options.dataType == 'xml') ? this.responseXML :
                this.responseText;
                
                options.onSuccess(returnData);
                
            
                
                
                //zerowanie polaczenia
                httpReq = null;
            } else{
                options.onError(console.log('błąd'));
            }
        }
    }
    //wyslanie zapytania do serwera
    httpReq.send();

}

ajax({
    type: 'GET',
    url: 'http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl',
    onError: function(msg) {
        console.log(msg);
    },
    onSuccess: function (response){
        var jsonObj = JSON.parse(response);
        console.log(jsonObj);
        
        var userID = jsonObj.userId;
        //jquery
        $('#testowy').text(userID);
        //to samo wtylko w JS
       // document.getElementById('testowy').innerHTML = userID;
        
        
    }
});