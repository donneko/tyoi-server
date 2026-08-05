import { Server } from "../../../src/index.js";

const server = new Server({
    baseDirname: import.meta.dirname,
    showQrCode:true
});

await server.start({
    showQrCode:false
})

const showQrCode = server.getConfig("showQrCode");

if(showQrCode)throw new Error();


await server.stop();