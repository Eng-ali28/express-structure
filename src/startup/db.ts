import mongoose from 'mongoose'
import config from 'config'

const mongooseConnectionURL = config.get<string>('DB_URI') + config.get<string>('DB_PORT') + config.get<string>('DB_NAME');

mongoose.connect(mongooseConnectionURL , {autoIndex:true , connectTimeoutMS:10000 , socketTimeoutMS:45000});

const conn = mongoose.connection;

conn.on('error' , ()=>console.log('connection error'));

conn.on("open" , ()=> console.log('connected to db'))



export default conn
