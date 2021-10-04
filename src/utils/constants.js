import 'dotenv/config';

export const DATABASE = {
    PASSWORD : process.env.DATABASE_PASSWORD || "",
    NAME: process.env.DATABASE_NAME || "",
    HOST: process.env.DATABASE_HOST || "",
    PORT: process.env.DATABASE_PORT || "",
    USER: process.env.DATABASE_USER || "",
    DIALECT: process.env.DATABASE_DIALECT || ""
}

export const TOKEN={
    SECRET : process.env.TOKEN_SECRET
}