import { Response, Request } from "express";
import { STATUS_CODES } from "../constants/constants";

export class ResponseHelper {
    static respondError(res: Response, req: Request, obj: unknown): Response {
        return res.status(STATUS_CODES.UNPROCESSABLE).
            json({
                "success": false,
                "error": {
                    "code": STATUS_CODES.UNPROCESSABLE,
                    "message": "Invalid Request",
                    "trace_id": "",
                    "details": obj || "Unable to process the request"
                }
            });
    }

    static respondOk(res: Response, obj: any = {}): Response {
        console.log("ResonseHelper | respondOk | response ", { obj });
        return res.status(STATUS_CODES.SUCCESS).json({ "success": true, "data": obj });
    }
}
