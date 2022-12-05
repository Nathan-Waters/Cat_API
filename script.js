/*
    This file contains all JavaScript code
    for interacting with the remove Web API
    provided by https://thecatapi.com/.

    Author: Nathan Waters
    File: script.js
    Date:11/27/2022
 */

//array of my cat objects
let catObjArr = [];
window.onload = function () {

  let address = `https://api.thecatapi.com/v1/breeds`;
  let params = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "live_DsgtOO1ujGeS4lzePOcvYNFftBHNJHXThugI1Pk0AIRo2Tf0pJJqrMe3qawjQocG"
    }
  };
  fetch(address, params)
    .then(function (respons) {
      return respons.json();
    })
    .then(breedsList);

  let button = document.getElementById("breed-info");
  button.onclick = function (e) {

    let selectId = document.getElementById("breeds").value;
    // console.log(json);
    selectedCat(selectId);
  };
};

function selectedCat(cat) {
  let catObject = {};
  for (let i = 0; i < catObjArr.length; i++) {
    if (cat == catObjArr[i].name) {
      catObject = catObjArr[i];
    }
  }

  let name = document.getElementById("name");
  name.innerHTML = catObject.name;

  let description = document.getElementById("description");
  description.innerHTML = catObject.description;

  let origin = document.getElementById("origin");
  origin.innerHTML = catObject.origin;

  let lifeSpan = document.getElementById("life-span");
  lifeSpan.innerHTML = catObject.lifeSpan;

  let childFriendly = document.getElementById("child-friendly");
  if (catObject.childFriendly == 1) {
    childFriendly.innerHTML = `very unfriendly (${catObject.childFriendly})`;
  } else if (catObject.childFriendly == 2) {
    childFriendly.innerHTML = `unfriendly (${catObject.childFriendly})`;
  } else if (catObject.childFriendly == 3) {
    childFriendly.innerHTML = `indeifferent (${catObject.childFriendly})`;
  } else if (catObject.childFriendly == 4) {
    childFriendly.innerHTML = `friendly (${catObject.childFriendly})`;
  } else {
    childFriendly.innerHTML = `very friendly (${catObject.childFriendly})`;
  }

  let dogFriendly = document.getElementById("dog-friendly");
  if (catObject.dogFriendly == 1) {
    dogFriendly.innerHTML = `very unfriendly (${catObject.dogFriendly})`;
  } else if (catObject.dogFriendly == 2) {
    dogFriendly.innerHTML = `unfriendly (${catObject.dogFriendly})`;
  } else if (catObject.dogFriendly == 3) {
    dogFriendly.innerHTML = `indeifferent (${catObject.dogFriendly})`;
  } else if (catObject.dogFriendly == 4) {
    dogFriendly.innerHTML = `friendly (${catObject.dogFriendly})`;
  } else {
    dogFriendly.innerHTML = `very friendly (${catObject.dogFriendly})`;
  }

  let energyLevel = document.getElementById("energy-level");
  if (catObject.energyLevel == 1) {
    energyLevel.innerHTML = `like a sloth (${catObject.energyLevel})`;
  } else if (catObject.energyLevel == 2) {
    energyLevel.innerHTML = `slow moving (${catObject.energyLevel})`;
  } else if (catObject.energyLevel == 3) {
    energyLevel.innerHTML = `energetic (${catObject.energyLevel})`;
  } else if (catObject.energyLevel == 4) {
    energyLevel.innerHTML = `a ball of energy (${catObject.energyLevel})`;
  } else {
    energyLevel.innerHTML = `bouncing off the walls (${catObject.energyLevel})`;
  }

  let socialNeeds = document.getElementById("social-needs");
  if (catObject.socialNeeds == 1) {
    socialNeeds.innerHTML = `antisocial (${catObject.socialNeeds})`;
  } else if (catObject.socialNeeds == 2) {
    socialNeeds.innerHTML = `a loner (${catObject.socialNeeds})`;
  } else if (catObject.socialNeeds == 3) {
    socialNeeds.innerHTML = `indifferent (${catObject.socialNeeds})`;
  } else if (catObject.socialNeeds == 4) {
    socialNeeds.innerHTML = `needs friends (${catObject.socialNeeds})`;
  } else {
    socialNeeds.innerHTML = `very needy (${catObject.socialNeeds})`;
  }

  let wiki = document.getElementById("wiki");
  wiki.setAttribute("href", catObject.wiki);
  wiki.innerHTML = "wikipedia";

  let address = `https://api.thecatapi.com/v1/images/search?breed_ids=${catObject.id}&limit=10`;
  let params = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "live_DsgtOO1ujGeS4lzePOcvYNFftBHNJHXThugI1Pk0AIRo2Tf0pJJqrMe3qawjQocG"
    }
  };
  fetch(address, params)
    .then(function (respons) {
      return respons.json();
    })
    .then(function (catImg) {
      let img = document.querySelector("#bottom");
      
      while(img.firstChild){
        img.removeChild(img.firstChild);
      }
      
      for (let i = 0; i < catImg.length; i++) {
        let imgCreate = document.createElement("img");
        

        let source = catImg[i].url;
        imgCreate.src = source;
        imgCreate.alt = "a random cat picture";
        img.appendChild(imgCreate);
      }

    });
}

function breedsList(json) {
  for (let i = 0; i < json.length; i++) {
    // console.log(json);
    cats(json[i].name, json[i].description, json[i].origin, json[i].life_span, json[i].child_friendly, json[i].dog_friendly, json[i].energy_level, json[i].social_needs, json[i].wikipedia_url, json[i].id);
    let selectId = document.getElementById("breeds");
    let catNames = document.createElement("option");
    catNames.innerHTML = json[i].name;
    selectId.appendChild(catNames);
  }
}


function cats(name, description, origin, lifeSpan, childFriendly, dogFriendly, energyLevel, socialNeeds, wiki, id) {
  let newCat = {
    name: name,
    description: description,
    origin: origin,
    lifeSpan: lifeSpan,
    childFriendly: childFriendly,
    dogFriendly: dogFriendly,
    energyLevel: energyLevel,
    socialNeeds: socialNeeds,
    wiki: wiki,
    id: id
  }

  catObjArr.push(newCat);
}

function catInfo(catObj) {
  let name = document.getElementById("name");
  name.innerHTML = catObj.name;
}

console.log(catObjArr);


// function breedsList(json) {
//   for (let i = 0; i < json.length; i++) {
//     // console.log(json[i]);
//     cats(json[i].name, json[i].description, json[i].origin, json[i].life_span, json[i].child_friendly, json[i].dog_friendly, json[i].energy_level, json[i].social_needs, json[i].wikipedia_url);
//   }
// }
//, description, origin, lifeSpan, childFriendly, dogFriendly, energyLevel, socialNeeds, wiki, catId