import Mongoose, { Schema, model } from 'mongoose';
import { DB_URL } from "../config";

// Connects Mongoose with DB
Mongoose.connect(DB_URL);

const collection = 'memory-usage';

/**
 * MemoryUsage Mongoose schema
 */
const MemoryUsageSchema: Schema = new Mongoose.Schema({
    timestamp: String,
    usage: String,
});

/**
 * MemoryUsage Mongoose Model
 */
const MemoryUsageModel = Mongoose.model(collection, MemoryUsageSchema)

export default MemoryUsageModel;