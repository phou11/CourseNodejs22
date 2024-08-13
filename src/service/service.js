import jwt from "jsonwebtoken";
import { SECREAT_KEY, SECREAT_KEY_REFRESH } from "../config/globalkey.js";
import CryptoJS from "crypto-js";
import connected from "../config/db.js";
import { EMessage } from "./message.js";
export const checkEmail = async (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkEmail = "Select * from user where email=?";
            connected.query(checkEmail, email, (err, result) => {
                if (err) reject(err);
                if (result[0]) reject("Email Already");
                resolve(true);
            });
        } catch (error) {
            reject(error);
        }
    });
};
export const verifyToken = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            jwt.verify(token, SECREAT_KEY.toString(), async (err, decode) => {
                if (err) reject(err);
                console.log(decode);
                const decript = CryptoJS.AES.decrypt(decode.id, SECREAT_KEY).toString(CryptoJS.enc.enc.Utf8);
                const checkUuid = "Select * from user where uuid=?";
                connected.query(checkUuid, decript, (error, result) => {
                    if (error) reject(error);
                    if (!result[0]) reject(EMessage.Unauthorized);
                    console.log(result);
                    resolve(result[0]);
                })
            })
        } catch (error) {
            console.log(error);
            reject(error);
        }
    })
}
export const GenerateToken = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = {
                id: CryptoJS.AES.encrypt(data.id, SECREAT_KEY).toString()
            }
            const payload_refresh = {
                id: CryptoJS.AES.encrypt(data.id, SECREAT_KEY_REFRESH).toString()
            }
            const token = jwt.sign(payload, SECREAT_KEY, { expiresIn: "2h" });
            const refreshToken = jwt.sign(payload_refresh, SECREAT_KEY_REFRESH, { expiresIn: "4h", });
            resolve({ token, refreshToken });
        } catch (error) {
            reject(error);
        }
    })
}