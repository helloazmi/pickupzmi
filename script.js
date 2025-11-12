console.log('script.js loaded!'); //https://www.youtube.com/watch?v=cuEtnrL9-H0

const pickupLines = [
  "Are you an ice berg? I am Titanic and I'm about to go down",
  "Are you a parking ticket? Because you've got FINE written all over you",
  "Are you a magician? Because whenever I look at you, everyone else disappears",
  "Are you made of copper and tellurium? Because you're Cu-Te",
  "Are you a camera? Because every time I look at you, I smile",
  "Is your name Google? Because you have everything I've been searching for",
  "Are you a bank loan? Because you have my interest",
  "Are you the sun? Because you make me want to revolve around you",
  "Are you a Wi-Fi signal? Because I'm really feeling a connection",
  "Are you a time traveler? Because I can see you in my future",
  "Are you a keyboard? Because you're my type",
  "Are you a 90-degree angle? Because you're looking right",
  "Are you a campfire? Because you're hot and I want s'more",
  "Are you an elevator? Because I'll go up and down for you",
  "Are you a cat? Because you're purr-fect"
];

let url = 'https://sheet.best/api/sheets/65a11748-3b33-4550-a354-4e929e17cb01';
let json_data;
let full_pickuplines = {};
let confirmed_openings = [];
let confirmed_punchlines = [];

let opening, punchline;

fetch(url)
  .then(response => response.json())
  .then(data => {

    json_object = data;

    for (let i = 0; i < json_object.length; i++) {
      opening = json_object[i]['Opening/oneLiner']
      punchline = json_object[i]['Punchline']
      let confirmedPickup = json_object[i]['confirmed']
      if (confirmedPickup == 'TRUE') { //Den uppfattar checkbox i GSheets som string

        if (punchline == false) { punchline == ' ' } // om punchline är fasle, alltså tom då lägg till </br>. detta gör att knappen inte ersätter tomma utrymmet utan sitter kvar.

        confirmed_openings.push(opening);
        confirmed_punchlines.push(punchline);
      }
      //console.log(json_object[i]);
    }

    console.log('\n\nConfirmed openings: ', confirmed_openings);
    console.log('\nConfirmed punchlinelines: ', confirmed_punchlines);
    console.log(confirmed_openings[3]);
    console.log(confirmed_punchlines[3]);
    console.log(typeof confirmed_punchlines[3]);

    if (confirmed_punchlines[3] == false) { console.log('COUDLNT FIND IT') }

    // Add pickupLines from const as fallback/additional lines
    for (let i = 0; i < pickupLines.length; i++) {
      confirmed_openings.push(pickupLines[i]);
      confirmed_punchlines.push(''); // Empty punchline for one-liners
    }

    shuffle(confirmed_openings, confirmed_punchlines);
    setTimeout(pickup_function, 3000) //First run
  })
  .catch(error => {
    console.error('Error fetching pickup lines from API:', error);
    // If API fails, use pickupLines from const
    for (let i = 0; i < pickupLines.length; i++) {
      confirmed_openings.push(pickupLines[i]);
      confirmed_punchlines.push(''); // Empty punchline for one-liners
    }
    shuffle(confirmed_openings, confirmed_punchlines);
    setTimeout(pickup_function, 3000) //First run
  })





function pickup_function() {
  console.log('clixxx');
  let pickup_button = document.getElementById('pickup_button');
  let opening_h1 = document.getElementById('opening');
  let punchline_h1 = document.getElementById('punchline');

  let opening_new = opening;
  let punchline_new;


  //Clearing opening and punchline
  opening_h1.innerHTML = ' '; punchline_h1.innerHTML = '</br>';

  //Deleting from opening and punchline arrays.
  confirmed_openings.splice(0, 1)
  confirmed_punchlines.splice(0, 1)

  let confirmed_opening = confirmed_openings[0];
  console.log(confirmed_opening);
  if (confirmed_opening != undefined) {
    opening_h1.innerHTML = confirmed_opening;
    console.log(confirmed_opening)

    //Sleep before giving punchline
    let confirmed_punch = confirmed_punchlines[0];
    sleep(1000).then(() => { console.log("Done"); punchline_h1.innerHTML = confirmed_punch })
  } else {
    opening_h1.innerHTML = 'Go and try the pick-up lines now, tiger!';

  }


}



//
//   sleep(1000).then(()=>{ console.log("Done"); punchline_h1.innerHTML = confirmed_punch;})
//
// } else {
//   punchline_h1.innerHTML = 'Go and try out some of the pick-up lines, tiger!';






function sleep(ms) { return new Promise(resolver => setTimeout(resolver, ms)); };


function shuffle(obj1, obj2) {
  var index = obj1.length;
  var rnd, tmp1, tmp2;

  while (index) {
    rnd = Math.floor(Math.random() * index);
    index -= 1;
    tmp1 = obj1[index];
    tmp2 = obj2[index];
    obj1[index] = obj1[rnd];
    obj2[index] = obj2[rnd];
    obj1[rnd] = tmp1;
    obj2[rnd] = tmp2;
  }
}
