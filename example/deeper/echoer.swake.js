var exec = require( 'child_process' ).exec,
    logly = require( 'logly' );

module.exports = function( text ) {  
  exec( 'echo "deeper echoer: ' + text + ' - ' + new Date().getTime() 
      + '" >> /tmp/echoer.swake.js');
};