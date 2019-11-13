async function getDefinition(word){
    var url = '/proxy/' + word;
    let promise = fetch(encodeURI(url));

    let jr = promise.then(function(resp){
        return resp.json();
    })

    jr.then( 
        function(data){
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
        try{
            var definitions = data[i].shortdef;
            var numberOfDefinitions = definitions.length;
            text += fl + "<br>";
            
            for(var j = 0; j < numberOfDefinitions; j++){
                text += (j+1).toString() + ". " + definitions[j] + "<br>";
            }
            text += "<br>";
        }
        catch(e){
            text += "No definition exists for this word.";
            break;
        }
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