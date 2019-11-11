async function getDefinition(key, word){
    var url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=' + key;
    let promise = fetch(encodeURI(url));

    let jr = promise.then(function(resp){
        return resp.json();
    })

    jr.then( 
        function(data){
            console.log(data);
            var dataLength = data.length;

            for(var i = 0; i < dataLength; i++){
                var ob = data[i];
                //usage of word
                var fl = data[i].fl;
                //list of definitions of that type
                var definition = data[i].shortdef;
            }

            openModal();            

        }
    ).catch(
        function(data){
            console.log(data);
        }
    )
}

function openModal(){
    var modal = document.getElementById("myModal");
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