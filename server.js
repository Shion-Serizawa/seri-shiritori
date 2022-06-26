// deno-lint-ignore-file require-await
import { serve } from "https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";

let previousWord = "しりとり";

console.log("Listening on http://localhost:8000");

serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  console.log(pathname);

  if (pathname === "/shiritori" && req.method === "GET") {
    return new Response(previousWord);
  }
  if (pathname === "/shiritori" && req.method === "POST") {
    const requestJson = await req.json();
    const nextWord = requestJson.nextWord;

    //カタカナとひらがなを対応
    if (
      nextWord.length > 0 &&
      (previousWord.charAt(previousWord.length - 1) !== kanaToHira(nextWord).charAt(0) &&  previousWord.charAt(previousWord.length - 1) !== hiraToKana(nextWord).charAt(0))
    ) {
      return new Response("前の単語に続いていません。", { status: 400 });
    }

    previousWord = nextWord;
    return new Response(previousWord);
  }

  return serveDir(req, {
    fsRoot: "public",

    urlRoot: "",

    showDirListing: true,

    enableCors: true,
  });
});

function kanaToHira(str) {
    return str.replace(/[\u30a1-\u30f6]/g, function(match) {
        var chr = match.charCodeAt(0) - 0x60;
        return String.fromCharCode(chr);
    });
}

function hiraToKana(str) {
    return str.replace(/[\u3041-\u3096]/g, function(match) {
        var chr = match.charCodeAt(0) + 0x60;
        return String.fromCharCode(chr);
    });
}
