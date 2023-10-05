import { getSale, getCollections } from "../functions/fetchBlockchain"

const apiRoutes = (app: any) => {

    app.get("/getSale/", async(req: any, res: any) => {

        const { collectionAddress, id } = req.query;
        if(!id) {
            res.send("Required paramenter 'collectionAddress' or 'id' was not declared");
            return;
        }

        const sale = await getSale(collectionAddress, id);
        res.json({
            sale: sale
        });

    });

    app.get("/getCollections/", async(req: any, res: any) => {
        
        const ret = await getCollections();
        res.json(ret);

    });

}

export default apiRoutes;
