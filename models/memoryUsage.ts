import Mongoose, { Schema, model } from 'mongoose';
import { DB_URL } from "../config";

Mongoose.connect(DB_URL);

const collection = 'memory-usage';
const MemoryUsageSchema: Schema = new Mongoose.Schema({
    timestamp: String,
    usage: String,
});

const MemoryUsageModel = Mongoose.model(collection, MemoryUsageSchema)

export default MemoryUsageModel;