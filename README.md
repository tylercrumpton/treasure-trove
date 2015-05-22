# Treasure Trove

## Running the server

This server requires that nodejs, bower, and grunt are installed on your system.

After cloning the repo into the directory of your choice, run:

    npm install
    bower install
    grunt serve:dist
    
## Configuring the server

By default the server runs on port 9000, and connects to a mongo database on localhost. To change the port, start the server after setting the `PORT` environment variable:

    PORT=80; grunt serve:dist
