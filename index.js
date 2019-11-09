async function getNews(){
    var url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/test?key=84247a35-6917-4697-b294-d6cca6cd9052';

    let promise = fetch(encodeURI(url));

    let jr = promise.then(function(resp){
        return resp.json();
    })

    jr.then( 
        function(data){
            console.log(data);
            // var articles = data.articles;
            // var aLen = articles.length;
            // var mainDiv = document.querySelector(".cardContainer");
            // count = 1;
            // for(var i = 0; i < aLen; i++){
            //     if(articles[i].title.toLowerCase().includes("fortnite")){
            //     displayNews(mainDiv, articles[i], count);
            //     count++;
            //     }
            // }
        }
    )
}
    
// function displayNews(mainDiv, article, count){
//     // var wrapper = document.querySelector("#wrapper");
//     var cardDiv = document.createElement("div");
//     cardDiv.id = "cardDiv";
//     cardDiv.className = "cardDiv";

//     var card = document.createElement("div");
//     var br = document.createElement("br");
//     card.className = "Card";
//     card.style.width = "400px";
//     card.style.height = "400px";

//     var link = document.createElement("a");
//     link.href = article.url;
//     link.id = "link"
//     link.target = "_blank";

//     var img = document.createElement("img");
//     img.className = "card-img-bottom";
//     img.src = article.urlToImage;
//     img.alt = "Card image";
//     img.style.width = "100%";
//     img.style.height =  "50%";

//     var cardBody = document.createElement("div");
//     cardBody.className = "card-body";

//     var title = document.createElement("h4");
//     title.className = "card-title";
//     title.innerHTML = article.title;

//     var discription = document.createElement("p");
//     discription.className = "card-text";
//     discription.innerHTML = article.description;

//     mainDiv.appendChild(cardDiv);
//     cardDiv.appendChild(card);
//     card.appendChild(link);
//     link.appendChild(img);
//     link.appendChild(cardBody);
//     cardBody.appendChild(title);
//     cardBody.appendChild(discription);
// }
    
function test(){
    var searchText = document.querySelector("#search").value;
    let divs = document.getElementsByClassName("cardDiv");
    if(searchText != ""){
        for (let x = 0; x < divs.length; x++) {
            var innerText = divs[x].innerText;
            let div = divs[x];
            if(innerText.toLowerCase().includes(searchText.toLowerCase())){
                div.style.display = 'block';
            }
            else{
                div.style.display = 'none';
            }
        }
    }
    else{
        for (let x = 0; x < divs.length; x++) {
            let div = divs[x];
            div.style.display = 'block';
        }
    }
}