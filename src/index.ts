import * as express from 'express';
import { registerModule } from '@vestibule-link/bridge';
import { Server } from 'http';

const app = express();
const VESTIBULE_HTTP_PORT = process.env['VESTIBULE_HTTP_PORT'] || '18080';
let server: Server

let moduleId: symbol | undefined;
export function startModule() {
    if (!moduleId){
        moduleId = registerModule({
            name: 'http',
            init: async () => {
                await new Promise((resolve, reject) => {
                    try {
                        server = app.listen(Number(VESTIBULE_HTTP_PORT), () => {
                            console.log('Http started on port %d', VESTIBULE_HTTP_PORT);
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