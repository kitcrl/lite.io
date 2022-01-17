var liteio = require('./lite_io_httpd');

liteio.work("--exec httpd --httpd_port 8083 --httpd_home /opt/www --httpd_index index.html", httpd_callback);

function arr2str(b)
{
  return String.fromCharCode.apply(null, new Uint16Array(b));
}

function httpd_callback(fd, uri, sz, type)
{
  var html;
  console.log("-------------------------------");
  console.log( arr2str(uri) );
  var _uri = arr2str(uri).split('?');

  console.log(_uri[0]);
  console.log(_uri[1]);
  console.log("-------------------------------");

  switch(type)
  {
    case  0xE0001010:
      if ( _uri[0] == '/network' )
      {
        html  = "HTTP/1.1 200 OK\r\n";
        html += "Content-Type: text/html\r\n";
        html += "\r\n";
        html += "<form method=post action='/network2?test=sample'>";
        html += "<input type=text name='id'>";
        html += "<input type=submit>";
        html += "</form>";
      }
      else if ( _uri[0] == '/network2' )
      {
        html  = "HTTP/1.1 200 OK\r\n";
        html += "\r\n";
        html += "network2\r\n";
      }
      else
      {
        html  = "HTTP/1.1 404 Not Found\r\n";
        html += "\r\n";
        html += "Not Found\r\n";
      }
      liteio.write(fd, html, html.length);
      break;

    case 0xE000FDC0:
      console.log(fd + ' :  connected');
      break;

    case 0xE000FDCF:
      console.log(fd + ' :  disconnected');
      break;
  }
}

