async function getDefinition(key, word){
    var word = 'test';
    var key = '84247a35-6917-4697-b294-d6cca6cd9052';
    var url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=' + key;
    let promise = fetch(encodeURI(url));

    let jr = promise.then(function(resp){
        return resp.json();
    })

    jr.then( 
        function(data){
            console.log(data);
        }
    )
}