var liteio = require('./lite_io_httpd');

liteio.work("--exec httpd --httpd_port 8083 --httpd_home /opt/www --httpd_index index.html", httpd_callback);

function httpd_callback(fd, b, sz, type)
{
  var html;
  switch(type)
  {
    case  0xE0001010:
      if ( b == '/network' )
      {
        html  = "HTTP/1.1 200 OK\r\n";
        html += "\r\n";
        html += "network\r\n";
      }
      else if ( b == '/network2' )
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

