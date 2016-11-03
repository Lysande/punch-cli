module.exports = (function () {
  "use strict";
  /**
    This is a straight-faced, 1:1 interface. No shorthands or macros. 

    Make those with batch or bash. 
  */

  let app = require("punch.js");

  let helper = 
  {
    print(result) 
    {
      if (result instanceof Error) 
      {
        process.stderr.write(result.stack);
      }

      if ("object" == typeof result) 
      {
        // Escape quotes. Else things gone break when deserializing. 
        result = JSON.stringify(result);    
        result = result
                  .replace(/\"/g, "\\\"")
      }
      else result = result.toString();

      process.stdout.write(result);  
    },
    toPrinter(fn)
    {
      return function (...args) 
      {
        helper.print(fn(...args));
      }
    }
  }

  let cli = require("commander");

  cli.command("clock <direction>").action(helper.toPrinter(app.clock));

  /** 
      By setting up the option like this, 
      everything following will get access 
      to it. 

      Could perhaps a) override further down
      b) make git-style subcommands.

      As of 1.0, paths are sent as-is, meaning that paths 
      will not be relative to the root if sent in, but relative to 
      the node_modules.

      Add support for absolute-ing paths firther down the road. 
  **/

  cli.option("-t, --template [tmpl]")
  cli.command("log <data>")
      .action(function (data) {
        let template = cli.template;

        try 
        {
          data = JSON.parse(data)
        }
        catch (e) {}

        let log = helper.toPrinter(app.log);

        log(data, template);
      });


  cli.parse(process.argv);

})();