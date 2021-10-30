async function makeRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method,
            body: JSON.stringify(body)
        })
        const result = await response.json()
        //console.log(result) //<<<<här vår JSON
        return result
    } catch (err) {
        console.error(err)
    }
}


fetch('https://api.discogs.com/artists/1/releases?page=2&per_page=75').then(function (response) {
    if (response.ok) {
        response.json().then(function (json) {
            artistList = json;
            console.log(artistList)
            document.getElementById('artistsDiv').innerHTML = "<h3>Här kan se Artist Listan från external API</h3>";
            for (var i = 0; i < artistList.releases.length; i++) {
                console.log(artistList.releases[i])
                const element = document.createElement('li')
                element.innerText = artistList.releases[i].artist + " " + artistList.releases[i].title
                document.getElementById('artistsDiv').appendChild(element)
            }
            console.log('Network request for connection status is ' + response.status + ': ' + response.statusText);
        });
    } else {
        console.log('Network request for artistList.json failed with response ' + response.status + ': ' + response.statusText);
    }
});


let btnDiv = document.createElement("div")
let saveArtistBtn = document.createElement('button') 
let saveArtistName = document.createElement('h4') 
saveArtistName.innerText = "Spara" 
betta.appendChild(btnDiv)
btnDiv.appendChild(saveArtistBtn)
saveArtistBtn.appendChild(saveArtistName)

saveArtistBtn.onclick = async function () {
    let name = document.getElementById('anyValue').value
    console.log(name)
    const status = await makeRequest("/artists", "POST", { name: name })
    console.log(status)
    if (name == "") {
        alert("Tyvärr du sparade tomt namn! ")
    }
    document.getElementById('anyValue').value = "";
}

let getArtists = document.createElement('button')
let getArtistName = document.createElement('h4')
getArtistName.innerText = 'Visa Lista'
btnDiv.appendChild(getArtists)
getArtists.appendChild(getArtistName)

getArtists.onclick = async function () {
    const visaArtists = await makeRequest("/artists", "GET")
    console.log(visaArtists)
    document.getElementById('artistsDiv').innerHTML = "<h3>Här kan se Artist Listan från local server</h3>"
    

    for (let i = 0; i < visaArtists.length; i++) {
        const element = document.createElement('li')
        element.innerText = visaArtists[i].id + " " + visaArtists[i].name
        console.log(visaArtists[i])
        document.getElementById('artistsDiv').appendChild(element)
    }
}


let updateArtistBtn = document.createElement('button')
let updateArtistName = document.createElement('h4')
updateArtistName.innerText = "Ändra"

btnDiv.appendChild(updateArtistBtn)
updateArtistBtn.appendChild(updateArtistName)

updateArtistBtn.onclick = async function () {
    let name = document.getElementById('anyValue').value
    let discription = document.getElementById('updatedText').value
    //console.log(name)
    //console.log(discription)
  
    let artistId = name;
    
    let response = await makeRequest(`/artists/${artistId}`, 'PUT', {  name: discription }); // Här jag skickar id och name
    console.log(response);
    console.log(artistId)
    
    if (discription == "") {
        alert("Vänligen slå texten som du vill modifiera TACK ")
    };
    if (name == "") {
        alert("Vänligen slå ID som du vill modifiera TACK ")
    }
    document.getElementById('anyValue').value = "";
    document.getElementById('updatedText').value = "";
}


let deleteArtistBtn = document.createElement('button')
let deleteArtistName = document.createElement('h4')
deleteArtistName.innerText = "Ta bort"

btnDiv.appendChild(deleteArtistBtn)
deleteArtistBtn.appendChild(deleteArtistName)

deleteArtistBtn.onclick = async function () {
    let name = document.getElementById('anyValue').value
    console.log(name)
    fetch('/artists/' + name, {
        method: 'DELETE',
    })
        .then(res => res.json()) // eller res.text()
        .then(res => console.log(res))
    if (name == "") {
        alert("Tyvärr det är tomt ! ")
    }
    document.getElementById('anyValue').value = "";
}

