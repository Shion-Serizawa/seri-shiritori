// const person = {
//   name: ["Bob", "Smith"],
//   age: 32,
//   gender: "male",
//   interests: ["music", "skiing"],
//   bio: function () {
//     alert(
//       this.name[0] +
//         " " +
//         this.name[1] +
//         " is " +
//         this.age +
//         " years old. He likes " +
//         this.interests[0] +
//         " and " +
//         this.interests[1] +
//         "."
//     );
//   },
//   greeting: function () {
//     alert("Hi! I'm " + this.name[0] + ".");
//   },
// };


// console.log(person);

// person.age = 45;
// person['name'][1] = 'Cratchit';

// console.log(person);

// person['eyes'] = 'hazel';
// person.farewell = function() { alert("Bye everybody!"); }

// console.log(person);

// const cat = {
//     name : 'Bertie',
//     breed : 'Cymric',
//     color : 'white',
//     greeting: function() {
//       console.log('Meow!');
//     }
//   }
  
//   // Put your code here
//   const catName = {
//     name : "nyao"
//   }
//   cat.greeting();
//   cat.color = "Black";
  
  
//   // Don't edit the code below here
  
//   let para1 = document.createElement('p');
//   let para2 = document.createElement('p');
  
//   para1.textContent = `The cat's name is ${ catName }.`;
//   para2.textContent = `The cat's color is ${ cat.color }.`;
//   section.appendChild(para1);
//   section.appendChild(para2);

//これで名前だけゲット！
const url = "https://pokeapi.co/api/v2/pokemon-species/";
const data = await fetch(url + Number(334));
const json = await data.json()
console.log(json["names"][0]["name"]);

let tempPoke = "マッシブーン"
if(tempPoke.charAt(tempPoke.length - 1) !== "ン"){
    previousWord.push(pokemonAll[Math.floor(Math.random() * 900)]);
    console("んではありません");
  }

