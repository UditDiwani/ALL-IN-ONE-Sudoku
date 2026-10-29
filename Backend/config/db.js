const mongoose = require('mongoose');
const dns = require('dns');
console.log(!process.env.MONGO_URI)
// Ensure Node's DNS resolver can resolve SRV records (use public DNS as fallback)
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  // if setting DNS servers fails, continue and let the system resolver be used
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(`DB connection error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;