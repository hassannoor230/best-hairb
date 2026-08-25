import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

dotenv.config();

async function fixPassword() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const hash = await bcrypt.hash('admin123', 12);
    await mongoose.connection.db.collection('users').updateOne(
      { email: 'admin@example.com' },
      { $set: { password: hash } }
    );
    const user = await mongoose.connection.db.collection('users').findOne({ email: 'admin@example.com' });
    const match = await bcrypt.compare('admin123', user.password);
    console.log('Updated password hash');
    console.log('Verify match:', match);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

fixPassword();
