// const Hapi =  require('@hapi/hapi');
import Hapi from "@hapi/hapi"
import {routes} from "./src/route.js"


const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
              origin: ['*']
            }
        }
    });

    server.route(routes);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
}

init();
