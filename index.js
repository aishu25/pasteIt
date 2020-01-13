const index_page = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
</head>
<body>
  <div class="container">
    <h2>Paste your code!</h2>
    <form id="form1" action="" method="post">
      <div class="form-group">
        <label for="Code">Code:</label>
        <textarea class="form-control" rows="5" id="pasted_code" name="pasted_code" value="pasted_code" placeholder="Paste your code..."></textarea>
        <label for="syntax">Syntax:</label>
        <select class="form-control" id="syntax" name="syntax" value="syntax">
          <option name="plaintext" value="plaintext">Plain Text</option>
          <option value="apache">Apache</option>
          <option value="bash">Bash</option>
          <option value="coffeescript">coffeeScript</option>
          <option value="crmsh">crmsh</option>
          <option value="c++">C++</option>
          <option value="cpp">C#</option>
          <option value="css">CSS</option>
          <option value="django">Django</option>
          <option value="diff">Diff</option>
          <option value="dockerfile">Dockerfile</option>
          <option value="dsconfig">dsconfig</option>
          <option value="excel">Excel</option>
          <option value="http">HTTP</option>
          <option value="html">HTML,XML</option>
          <option value="go">GoLang</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
          <option value="json">JSON</option>
          <option value="makefile">Makefile</option>
          <option value="matlab">Matlab</option>
          <option value="markdown">Markdown</option>
          <option value="nginx">Nginx</option>
          <option value="objectivec">Objective-C</option>
          <option value="perl">Perl</option>
          <option value="php">PHP</option>
          <option value="python">Python</option>
          <option value="ruby">Ruby</option>
          <option value="r">R </option>
          <option value="shell">Shell Session</option>
          <option value="sql">SQL</option>
          <option value="swift">Swift</option>
          <option value="scss">SCSS</option>
          <option value="typescript">TypeScript</option>
          <option value="vim">VIM Script</option>
        </select>
      </div>
      <button class="btn btn-default">Submit Code</button>
    </form>
  </div>
</body>
</html>
`
var created_page = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="utf-8">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.9/styles/tomorrow-night.min.css" rel="stylesheet">
</head>
<body>
<div class="container">
  <h2>Your code</h2>
  <div class="panel panel-default">
    <div class="panel-body">
      <pre>
        <code class="$CLASS">
          $PASTEDCODE
        </code>
      </pre>
    </div>
  </div>
  <h3>URL : <a href="$URL">$URL</a></h3>
</div>
</body>
<script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.9/highlight.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/highlightjs@9.12.0/highlight.pack.js"></script>
<script>
  document.querySelectorAll("#textvalue").forEach(function(element) {
    element.innerHTML = element.innerHTML.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/!/g, "&#33;").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  });
</script>
<script>hljs.initHighlightingOnLoad();</script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
</html>
`
var code_page = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.9/styles/tomorrow-night.min.css" rel="stylesheet">
  </head>
  <body>
  <div class="panel panel-default">
    <h2>Pasted Code:</h2>
    <div class="panel-body">
      <pre>
        <code class="$RES" id="textvalue">
            $YOURCODE
        </code>
      </pre>
    <div>
  </div>
  </body>
  <script charset="UTF-8" type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.9/highlight.min.js"\></script>
  <script src="https://cdn.jsdelivr.net/npm/highlightjs@9.12.0/highlight.pack.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
  <script>
    document.querySelectorAll("#textvalue").forEach(function(element) {
      element.innerHTML = element.innerHTML.replace(/!/g, "&#33;").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    });
  </script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
</html>
`
/**
 * rawHtmlResponse delievers a response with HTML inputted directly
 * into the worker script
 * @param {string} html
 */
async function rawHtmlResponse(html) {
  const init = {
    headers: {
      "content-type": "text/html;charset=UTF-8",
      "Cache-Control" :"no-cache, no-store, must-revalidate",
      "Pragma" : "no-cache"
    },
  }
  return new Response(html, init)
}


addEventListener('fetch', event => {
  const { request } = event;
  const { url } = request;
  let requestURL = new URL(request.url)
  // let path = requestURL.pathname
  if (request.method == "GET" ){
    return event.respondWith(handleGetRequest(request)); 
  } 
  else if (request.method === "POST") {
    console.log("comes to post eventlistner")
  return event.respondWith(handlePostRequest(request));
  }
})

async function handleGetRequest(request) {
  const url = request.url;
  if (request.url === 'https://haikuthedog.com/paste/') {
    return rawHtmlResponse(index_page);
  }
  else {
    console.log("goes to redirect")
    var url_first = request.url.split('/')
    console.log(url_first)
    var valueUri = url_first[4]
    const getCache = () => RANDOM.get(valueUri)
    var value = await getCache() 
    const getSyntax = () => SYNTAX.get(valueUri)
    var result = await getSyntax()
    console.log("VALUE : ", value)
    console.log("RESULT : ", result)
    console.log("URL : ", URL)
    code_page2 = code_page.replace(/\$RES/g,result)
    code_page2 = code_page.replace(/\$YOURCODE/g,value)
    return rawHtmlResponse(code_page2);
  }
}

async function handlePostRequest(request) {
  console.log("comes to post")
  const body = await request.formData();
  var pasted_code = body.get("pasted_code");
  var syntax = body.get("syntax")
  console.log("SYNTAX : ", syntax)
  console.log("pasted_code : ", pasted_code)
  var num = (Math.random() * 10).toString(36).substring(2)
  var new_url = "https://haikuthedog.com/paste/" + num
  await RANDOM.put(num,pasted_code)
  await SYNTAX.put(num,syntax)
  console.log("NUM : ", num)
  created_page = created_page.replace(/\$CLASS/g,syntax)
  created_page = created_page.replace(/\$PASTEDCODE/g,pasted_code)
  created_page = created_page.replace(/\$URL/g, new_url)
  return rawHtmlResponse(created_page);
}
