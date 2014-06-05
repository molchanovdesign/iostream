Aynchronous input/output stream between server side and client side 
======
client - node-webkit
server - node js


   (response                  (response
   processing)                processing)  
out  |    messages or data        |
CLIENT  <------------------> SERVER
in   |                            |
    (user info,                 (is user online,
    connection check)           data requests
 