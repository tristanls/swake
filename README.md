swake
====

`swake` is a simple task execution tool that executes a `swake task`.

## Installation

    npm install swake -g
    
## Usage

to execute the example `swake` task run the following:

    swake echoer 'print this task' --swake-path /path/to/example/folder
    
`swake` will treat `--swake-path` as a root folder and will attempt to find a
file called `echoer.swake.js`. If it is found, `swake` will `require` it and
run it with the provided arguments ( See: `example/echoer.swake.js` ).

if environment variable `SWAKE_PATH` exists, `swake` will use that as the root
folder.

    env SWAKE_PATH=/path/to/example/folder swake echoer 'print this task'
    
Additionally, it is easy to embed `swake` tasks in a foldier hierarchy. For example:

    swake deeper:echoer 'print this task' --swake-path /path/to/example/folder