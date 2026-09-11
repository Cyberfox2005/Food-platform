const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersPath = path.join(__dirname, '../../../data/users.json');
const sessions = new Map();
const readUsers = () => JSON.parse(fs.readFileSync(usersPath, 'utf8'));
const writeUsers = users => fs.writeFileSync(usersPath, `${JSON.stringify(users, null, 2)}\n`);
const hashPassword = password => crypto.scryptSync(password, 'gravity-grill-salt', 64).toString('hex');
const publicUser = user => ({ id: user.id, name: user.name, email: user.email, role: user.role });

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 8) return res.status(400).json({ error: 'Name, email, and a password of at least 8 characters are required.' });
  const users = readUsers();
  if (users.some(user => user.email === email.toLowerCase())) return res.status(409).json({ error: 'An account with this email already exists.' });
  const user = { id: crypto.randomUUID(), name, email: email.toLowerCase(), passwordHash: hashPassword(password), role: 'customer' };
  users.push(user);
  writeUsers(users);
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, user.id);
  res.status(201).json({ token, user: publicUser(user) });
});

router.post('/login', (req, res) => {
  const { email, password, accountType = 'customer' } = req.body;
  const user = readUsers().find(item => item.email === String(email).toLowerCase());
  if (!user || hashPassword(password || '') !== user.passwordHash) return res.status(401).json({ error: 'Invalid email or password.' });
  if (user.role !== accountType) return res.status(403).json({ error: `This account is registered as ${user.role}. Choose the matching account type.` });
  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, user.id);
  res.json({ token, user: publicUser(user) });
});

router.get('/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  const userId = sessions.get(token);
  const user = readUsers().find(item => item.id === userId);
  if (!user) return res.status(401).json({ error: 'Authentication required.' });
  res.json({ user: publicUser(user) });
});

module.exports = router;