import { UserRepository } from "../database/repositories/user";
import { ExpressRequest, ExpressResponse } from "../types";
import { IUser } from "../types/user";

export class UserController {
    static async get(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
        try {
            const query = req.params;

            const address = query.address as string;
            if(!address) {
                return res.status(400).json({success: false, error: { message: "Validation Failed" }});
            }

            const user = await UserRepository.get(address);
            return res.status(200).json({ success: true, data: user });
        } catch (error: any) {
            console.error("User get api failed", { error });
            return res.status(500).json({ success: false, error: { message: "Internal Server Error" }});
        }
    }

    static async create(req: ExpressRequest, res: ExpressResponse): Promise<ExpressResponse> {
        try {
            const query = req.body;

            const address = query.address as string;
            if(!address) {
                return res.status(400).json({success: false, error: { message: "Validation Failed" }});
            }
            

            const user = await UserRepository.create({ address, network: "SUI" });
            return res.status(200).json({ success: true, data: user });
        } catch (error: any) {
            console.error("User get api failed", { error });
            return res.status(500).json({ success: false, error: { message: "Internal Server Error" }});
        }
    }
}