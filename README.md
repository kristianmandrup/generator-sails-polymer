# generator-sails-polymer
Can be installed through npm with
> npm install -g generator-sails-polymer

Once installed, simply invoke the the generator through the yo command (making sure that it is installed first) then invoking
>yo sails-polymer

The generator will take you through the rest of the process.


## FAQ
A common problem when running this generator is the lack of a 'basePath' field for the swagger-express module. If you also receive the error "./node_modules/swagger-express/lib/swagger-express/index.js:228
     throw new Error('\'basePath\' is required.');
"
then before execution of line 265 (but in the body of the exports.init function) set
>ops.basePath = '.';

and the app should lift smoothly.






