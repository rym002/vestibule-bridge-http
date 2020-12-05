import * as express from 'express';
import { registerModule } from '@vestibule-link/bridge';
import { Server } from 'http';

const app = express();
const VESTIBULE_HTTP_PORT = process.env['VESTIBULE_HTTP_PORT'] || '18080';
let server: Server

let moduleId: symbol | undefined;
export function startModule() {
    if (!moduleId) {
        moduleId = registerModule({
            name: 'http',
            init: async () => {
                await new Promise((resolve, reject) => {
                    const httpPort = Number(VESTIBULE_HTTP_PORT)
                    try {
                        server = app.listen(httpPort, () => {
                            console.log('Http started on port %d', httpPort);
                            resolve();
                        })
                    } catch (err) {
                        reject(err);
                    }
                });
            }
        })
    }
    return moduleId;
}
export function addRouter(routerPath: string, router: express.Router) {
    return app.use(routerPath, router);
}

export function stopServer() {
    server.close();
}