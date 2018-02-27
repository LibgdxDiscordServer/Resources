var weekLoaded = "";

function loadEntry(week){
    if(weekLoaded == week){
        console.log("alreaded loaded");
    }
    else{
        $.ajax({
            type: 'GET',
            url: 'assets/feb2018.json',
            dataType: 'json',
            success: function(data){
                createCardGroup(data, week);
            }
        });
    }
}

function createCardGroup(result, week){
    weekLoaded = week;
    console.log("week set");

    var title, author, description, sourceLink, playOnlineLink, jarLink, playStoreLink, previewImage;
    //start group
    var deck = '<div class="card-group padding">';
    //start row
    //deck += '<div class="row">';
    
    var maxNumberOfCardsPerRow = 3;
    var numberOfCardsInRow;
    
    for(var i = 0; i < result.length; i++){
        title = result[i].Title;
        author = result[i].Author;
        description = result[i].Description;
        sourceLink = result[i].SourceLink;
        playOnlineLink = result[i].PlayOnlineLink;
        jarLink = result[i].JarLink;
        playStoreLink = result[i].PlayStoreLink;
        previewImage = result[i].PreviewImage;

        numberOfCardsInRow++;

        //create column
        deck += '<div class="col-sm">';
        //create card
        deck += createCard(title, author, description, sourceLink, playOnlineLink, jarLink, playStoreLink, previewImage);
        //end column
        deck += '</div>';

        //if we reach the max number of cards per row start a new row
        if(numberOfCardsInRow == maxNumberOfCardsPerRow){
            numberOfCardsInRow = 0;
            //end row
            //deck += '</div>';
            //start row
            //deck += '<div class="row">';
        }
    }
    //end row
    //deck += '</div>';
    //end group
    deck += '</div>';
        
    document.getElementById("entry").innerHTML = deck;
}

function createCard(title, author, description, sourceLink, playOnlineLink, jarLink, playStoreLink, image) {
    //start of the card
    var card = '<div class="card padding">';
    //start of the body
    card += '<div class="card-body">';

    //create the image
    card += '<img class="card-img-top img-fluid cardImage" alt="no image" src="' +  image + '">';

    //create the title
    card += '<h3 class="card-title">' + capitalizeEveryWord(title) + '</h3>';

    card += '<h5 class="card-subtitle text-muted">' + capitalizeEveryWord(author) + '</h5>';

    //create the description
    card += '<p class="card-text">' + description + '</p>';

    //create the source link
    if(sourceLink.length > 0){
        sourceLink = isPropperLink(sourceLink);
        card += '<a href="' + sourceLink + '" class="card-link" target="_blank">' + "Source" + '</a>';
    }
    
    //create the play online link
    if(playOnlineLink.length > 0){
        playOnlineLink = isPropperLink(playOnlineLink);
        card += '<a href="' + playOnlineLink + '" class="card-link" target="_blank">' + "<br>PlayOnline" + '</a>';
    }
    
    //create the jar link
    if(jarLink.length > 0){
        jarLink = isPropperLink(jarLink);
        card += '<a href="' + jarLink + '" class="card-link" target="_blank">' + "<br>Jar" + '</a>';
    }
    
    //create the play store link
    if(playStoreLink.length > 0){
        playStoreLink = isPropperLink(playStoreLink);
        card += '<a href="' + playStoreLink + '" class="card-link" target="_blank">' + "<br>PlayStore" + '</a>';
    }

    //end of the body
    card += '</div>'
    //end of the card
    card += '</div>';
    return card;
}

function capitalizeEveryWord(text){
    return text
    .toLowerCase()
    .split(' ')
    .map(function(word){
        return word[0].toUpperCase() + word.substr(1);
    })
    .join(' ');
}

function isPropperLink(link){
    //is a propper link
    if(link.search("https://www.") != -1 || link.search("http://www.") != -1){
        console.log("is proper link");
        return link;
    }
    //incomplete link
    else if(link.search("www.") != -1){
        return "http://" + link;
    }
    else{
        return "http://www." + link;
    }
}