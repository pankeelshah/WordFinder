async function getDefinition(key, word){
    var url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=' + key;
    let promise = fetch(encodeURI(url));

    let jr = promise.then(function(resp){
        return resp.json();
    })

    jr.then( 
        function(data){
            console.log(data);
            var text = formatModalText(data);
            openModal(text); 
        }
    ).catch(
        function(data){
            console.log(data);
        }
    )
}

function formatModalText(data){
    text = "";
    var dataLength = data.length;
            
    for(var i = 0; i < dataLength; i++){
        var ob = data[i];
        //usage of word
        var fl = data[i].fl;
        //list of definitions of that type
        var definitions = data[i].shortdef;
        
        text += fl + "<br>";
        var numberOfDefinitions = definitions.length;
        for(var j = 0; j < numberOfDefinitions; j++){
            text += (j+1).toString() + ". " + definitions[j] + "<br>";
        }
        text += "<br>";
    }
    return text;
}

function openModal(text){
    var modal = document.getElementById("myModal");
    var modalText = document.getElementById("modalText");
    
    modalText.innerHTML = text;
    modal.style.display = "block";
}

function closeModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}