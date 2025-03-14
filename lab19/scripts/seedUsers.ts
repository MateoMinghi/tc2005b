import bcrypt from 'bcryptjs';
import pool from '../src/lib/db';

async function seedUsers() {
  const users = [
    { username: 'john_doe', email: 'john.doe@example.com', password: 'password123', role: 'user' },
    { username: 'jane_smith', email: 'jane.smith@example.com', password: 'securepass', role: 'admin' },
    { username: 'peter_jones', email: 'peter.jones@example.com', password: 'testpass', role: 'user' },
  ];

  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await pool.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [user.username, user.email, hashedPassword, user.role]
    );
  }
  console.log('Users seeded successfully.');
}

seedUsers().catch((err) => {
  console.error('Error seeding users:', err);
});