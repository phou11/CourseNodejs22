import { EMessage } from "../service/message.js";
import { SendError, SendError400 } from "../service/response.js";
import { verifyToken } from "../service/service.js";

export const auth = async (req, res, next) => {
    try {
        const headeer = req.headers['authorization'];
        if (!headeer) {
            return SendError400(res, EMessage.BadRequest + "token");
        }
        const token = headeer.replace("Bearer ","");
        if (!token) return SendError(res, 401, EMessage.Unauthorized);
        const user = await verifyToken(token);
        req.user = user.uuid
        next()
    } catch (error) {
        console.log(error);
        return SendError(res, 500, EMessage.ServerError, error)
    }
}