var fs = require( 'fs' )
  , logly = require( 'logly' )
  , path = require( 'path' )
  , spawn = require( 'child_process' ).spawn;

exports.version =
  JSON.parse( fs.readFileSync( __dirname + '/../package.json' ) ).version;

exports.executeSwakeFile = function( swakeTaskFile, args, options ) {
  
  logly.log( 'swakeTaskFile - ' + swakeTaskFile );
  
  var swakeTaskModule;
  
  try {
    swakeTaskModule = require( swakeTaskFile );
    swakeTaskModule.apply( swakeTaskModule, args );
  } catch ( err ) {
    logly.error( err.message );
    logly.error( 'Unable to locate swake task file ' + swakeTaskFile );
    return;
  }
  
};

exports.swake = function( task, args, options, callback ) {
  
  // set swake path from environment or options
  var swakePath = process.env.SWAKE_PATH;
  
  if ( options && options.swakePath ) {
    logly.debug( 'setting SWAKE_PATH from options to ' + options.swakePath );
    swakePath = options.swakePath;
  }
  
  if ( ! swakePath ) {
    logly.debug( 'SWAKE_PATH not defined, using process.cwd()' );
    swakePath = process.cwd();
  }
  
  // parse task name ( ex: seed:some:task )
  var swakeTask = task.split( ':' ).join( '/' );
  
  swakeTask = path.join( swakePath, '/', swakeTask + '.swake.js' );
  
  logly.debug( 'loading swakeTaskModule - ' + swakeTask );
  
  try {
    require( swakeTask );
  } catch ( err ) {
    logly.error( 'Unable to locate swake task ' + task );
    logly.error( err.message );
    return;
  }
  
  // we loaded swakeTask via 'require'
  // run swake with -e ( execute task ) option in a separate process
  args.unshift( swakeTask );
  args.unshift( '-e' );
  logly.debug( 'launching new swake process with ' + args );
  if ( ! callback ) {
    spawn( 'swake', args );
  } else {
    var swakeProcess = spawn( 'swake', args );
    
    swakeProcess.on( 'exit', function( code ) {
      callback( code );
    });
  }
};