# Interface BG

The objective of this project is to create an application server/client side for B&G 

## Getting Started

First launch, right after cloning this repo : `npm install`

Local development : `npm start` 

### Application architecture

* Public 
  * css -> css files
  * images -> favicon of the server
  * javascript -> client -> JSClientSide / server -> JS -> ServerSide
* Routes
  * 01_route -> execute home route
  * 02_route -> execute api in order to get strategy data
  * 03_route -> execute api in order to get market data
  * ...
* Views
  * layout 
* App.js -> Main file with configs and roads !
