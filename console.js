require("dotenv").config();
let repl = require("repl");


// global['DateTime'] = require('./lib/DateTime').default;

function puts(p){
  p.then(u => console.log(u)).catch(err => console.log("ERR", err));
}

global["puts"] = puts;
global["utils"] = require("./build/utils");
// global["services"] = require("./build/services");
// global["logging"] = require("./build/logging");
// global["consumers"] = require("./build/consumers");
// global["repositories"] = require("./build/database/repositories");
global["models"] = require("./build/database/models");
// global["mappers"] = require("./build/mappers");
// global["messageProcessors"] = require("./build/messageProcessors");
// const MongoDbConnectionManager = require("./build/database/models/mongodb/index");
// MongoDbConnectionManager.default.getDbInstance();

repl.start({
  prompt: "app > "
});