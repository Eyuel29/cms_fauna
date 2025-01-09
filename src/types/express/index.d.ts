export {}

declare global {
    namespace Express {
        interface Request {
            user_id: String,
            user_role: number
        }
    }
}