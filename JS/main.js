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
            return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 ||
                //dotyczy safari
                navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined');
        } catch (e) {
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
            if (httpSuccess(this)) {


                //jesli dane w formacie XML to zwroc obiekt responseXML, w przeciwnym wypadku 
                // responsetext (JSON to text)
                var returnData = (options.dataType == 'xml') ? this.responseXML :
                    this.responseText;

                options.onSuccess(returnData);

                //zerowanie polaczenia
                httpReq = null;
            } else {
                options.onError(console.log('błąd'));
            }
        }
    }
    //wyslanie zapytania do serwera
    httpReq.send();

}


//funkcja wychwytujaca czy jestesmy na dole
window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        // you're at the bottom of the page


        //wywolanie ajaxa
        ajax({
            type: 'GET',

            url: 'https://jsonplaceholder.typicode.com/users',

            onError: function (msg) {
                console.log(msg);
            },

            onSuccess: function (response) {
                var jsonObjArray = JSON.parse(response);

                var beginOfData = document.createElement('p');
                var endOfData = document.createElement('p');

                beginOfData.innerHTML = '<br>---------begin-------------<br>';
                endOfData.innerHTML = '<br>---------end-------------<br>';

                document.body.appendChild(beginOfData);

                for (var i in jsonObjArray) {
                    var userID = document.createElement('p');
                    var userNAME = document.createElement('p');
                    var userURL = document.createElement('p');

                    userID.innerHTML = 'User ID: ' + jsonObjArray[i].id;
                    userNAME.innerHTML = 'User Name: ' + jsonObjArray[i].name;
                    userURL.innerHTML = 'User URL: ' + jsonObjArray[i].website + '<br>---';

                    document.body.appendChild(userID);
                    document.body.appendChild(userNAME);
                    document.body.appendChild(userURL);
 
                }

                document.body.appendChild(endOfData);









            }
        });

    }
};