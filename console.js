require("dotenv").config();
let repl = require("repl");


// global['DateTime'] = require('./lib/DateTime').default;

function puts(p){
  p.then(u => console.log(u)).catch(err => console.log("ERR", err));
}

global["puts"] = puts;
global["utils"] = require("./build/src/utils");
global["services"] = require("./build/src/services");
global["logging"] = require("./build/src/logging");
global["consumers"] = require("./build/src/consumers");
global["repositories"] = require("./build/src/database/repositories");
global["models"] = require("./build/src/database/models");
global["mappers"] = require("./build/src/mappers");
global["messageProcessors"] = require("./build/src/messageProcessors");
const MongoDbConnectionManager = require("./build/src/database/models/mongodb/index");
MongoDbConnectionManager.default.getDbInstance();

repl.start({
  prompt: "app > "
});