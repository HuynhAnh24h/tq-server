/**
 * @copyright 2025 Huynh Anh Developer
 * @license Apache-2.0
 */

// Node modules
import mongoose from "mongoose"
import type { ConnectOptions } from "mongoose"

// Custom modules
import Env from "./Env.config"
import Logger from "@/lib/Winston.lib"


// Client Options
const clientOptions: ConnectOptions = {
    dbName: "tq-cambodia",
    appName: "tq-cambodia",
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    },
}

// Connect to Database

export const Database = async(): Promise<void> =>{

    if(!Env.DB_USERNAME || !Env.DB_PASSWORD){
        throw new Error("Database username or password is not defined in environment variables")
    }

    try{
        const connect = await mongoose.connect(`mongodb+srv://${Env.DB_USERNAME}:${Env.DB_PASSWORD}@tq-cambodia.hmwp1lu.mongodb.net/?appName=tq-cambodia`,clientOptions)
        if(connect.connection.readyState === 1){
            Logger.info("Connect Database Success")
        }else{
            Logger.error("Connect Database False")
        }
    }catch(error){
       if(error instanceof Error){
        throw error
       }
       Logger.error("Error connecting to the database: ", error)
    }
}

export const DisconnectDB = async () :Promise<void> =>{
    try{
        await mongoose.disconnect()
        Logger.warn("Disconnect Database Success")
    }catch(error){
        if(error instanceof Error){
            throw new Error(error.message)
        }
        Logger.error("Error to disconnecting database: ", error)
    }
}

