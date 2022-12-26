// deno-lint-ignore-file require-await
import { serve } from "https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";

//ポケモン一覧獲得

let pokemonAll = ["フシギダネ"];
const url = "https://pokeapi.co/api/v2/pokemon-species/";

for (let i = 2; i < 1008; i+=2) {
  const data = await fetch(url + Number(i));
  const data2 = await fetch(url + Number(i+1))
  const json = await data.json();
  const json2 = await data2.json();
  const name = await json["names"][0]["name"];
  const name2 = await json2["names"][0]["name"];

  await pokemonAll.push(name);
  await pokemonAll.push(name2);
  await console.log(name);
  await console.log(name2);
}
// await console.log(pokemonAll);

//ここを乱数にして、ランダムスタート
let previousWord = [];
//しりとり初期化関数
function shiritoriInit() {
  previousWord = [];
  let tempPoke="";
  while(1){
    tempPoke = pokemonAll[Math.floor(Math.random() * 900)];
    if(tempPoke.charAt(tempPoke.length - 1) !== "ン"){
      previousWord.push(tempPoke);
      console.log(tempPoke);
      break;
    }
  }
}
shiritoriInit();

console.log("Listening on http://localhost:8000");

serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  console.log(pathname);
  console.log(previousWord);
  console.log(req.method);

  if (pathname === "/styles.css") {
    return new Response(await Deno.readTextFile("./public/styles.css"), {
      headers: { "Content-Type": "text/css; charset=utf-8" },
    });
  }
  if(pathname === "/reset" ){
    shiritoriInit();
    return new Response(previousWord[previousWord.length - 1]);
  }
  if(pathname === "/rireki"){
    let shiritoriRireki = previousWord[0];
    for(let i = 1;i<previousWord.length;i++){
      shiritoriRireki += "　→　"+ previousWord[i];
    }
    return new Response(shiritoriRireki);
  }
  if (pathname === "/shiritori" && req.method === "GET") {
    return new Response(previousWord[previousWord.length - 1]);
  }
  if (pathname === "/shiritori" && req.method === "POST") {
    const requestJson = await req.json();
    const nextWord = requestJson.nextWord;

    //カタカナだけを対応
    
  const regexp = /[\u{3000}-\u{301C}\u{30A1}-\u{30F6}\u{30FB}-\u{30FE}]/mu;
    if(!regexp.test(nextWord)){
      return new Response("カタカナのみ使用可能です", { status: 400 });
    }
    else if (
      !pokemonAll.some(function (element) {
        return element === nextWord;
      })
    ) {
      return new Response("ポケモンではありません", { status: 400 });
    } else if (
      previousWord.some(function (element) {
        return (
          element === kanaToHira(nextWord) || element === hiraToKana(nextWord)
        );
      })
    ) {
      return new Response("既出の単語です。", { status: 400 });
    } else if (
      nextWord.length > 0 &&
      previousWord[previousWord.length - 1].charAt(
        previousWord[previousWord.length - 1].length - 1
      ) !== kanaToHira(nextWord).charAt(0) &&
      previousWord[previousWord.length - 1].charAt(
        previousWord[previousWord.length - 1].length - 1
      ) !== hiraToKana(nextWord).charAt(0)
    ) {
      return new Response("前の単語に続いていません。", { status: 400 });
      //↓最終的には終了処理
    } else if (kanaToHira(nextWord).charAt(nextWord.length - 1) === "ん") {
      shiritoriInit();
      return new Response(previousWord[previousWord.length - 1], { status: 418 });
    }

    previousWord.push(nextWord);

    return new Response(previousWord[previousWord.length - 1]);
  }

  return serveDir(req, {
    fsRoot: "public",

    urlRoot: "",

    showDirListing: true,

    enableCors: true,
  });
});

function kanaToHira(str) {
  return str.replace(/[\u30a1-\u30f6]/g, function (match) {
    var chr = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(chr);
  });
}

function hiraToKana(str) {
  return str.replace(/[\u3041-\u3096]/g, function (match) {
    var chr = match.charCodeAt(0) + 0x60;
    return String.fromCharCode(chr);
  });
}
