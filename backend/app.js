require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./database.sqlite');

// Create tables one by one (safer)
db.serialize(() => {
  // Staff table
  db.run(`CREATE TABLE IF NOT EXISTS staff (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    role TEXT,
    phone TEXT
  )`);

  // Services table
  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    duration_minutes INTEGER,
    price_etb INTEGER,
    category TEXT
  )`);

  // Appointments table
  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    customer_phone TEXT,
    service_id INTEGER,
    staff_id INTEGER,
    start_time TEXT,
    end_time TEXT,
    deposit_paid INTEGER DEFAULT 0,
    deposit_amount INTEGER DEFAULT 0,
    status TEXT DEFAULT 'booked',
    notes TEXT
  )`);

  // Check if staff table is empty
  db.get(`SELECT COUNT(*) as count FROM staff`, (err, row) => {
    if (err) {
      console.error('Error checking staff:', err.message);
      return;
    }
    
    if (row.count === 0) {
      console.log('Inserting demo data...');
      
      // Insert staff
      db.run(`INSERT INTO staff (name, role, phone) VALUES 
        ('Meseret Abebe', 'Senior Hair Stylist', '0912345678'),
        ('Hanna Tekle', 'Nail Artist', '0923456789'),
        ('Ruth Desta', 'Spa Therapist', '0934567890')`);
      
      // Insert services
      db.run(`INSERT INTO services (name, duration_minutes, price_etb, category) VALUES 
        ('Haircut + Style', 45, 350, 'hair'),
        ('Knotless Braids', 180, 800, 'hair'),
        ('Nail Art + Gel', 75, 450, 'nails'),
        ('Full Body Massage', 60, 600, 'spa'),
        ('Pedicure + Design', 60, 400, 'nails')`);
      
      console.log('Demo data inserted successfully!');
    }
  });
});

// API Routes

app.get('/api/services', (req, res) => {
  db.all(`SELECT * FROM services`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/staff', (req, res) => {
  db.all(`SELECT * FROM staff`, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/slots/:date/:staff_id', (req, res) => {
  const { staff_id } = req.params;
  const availableSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];
  
  res.json({ availableSlots });
});

app.post('/api/book', (req, res) => {
  const { customer_name, customer_phone, service_id, staff_id, start_time, deposit_paid, notes } = req.body;
  
  db.run(`INSERT INTO appointments (customer_name, customer_phone, service_id, staff_id, start_time, end_time, deposit_paid, notes)
          VALUES (?, ?, ?, ?, ?, datetime(?, '+45 minutes'), ?, ?)`,
          [customer_name, customer_phone, service_id, staff_id, start_time, start_time, deposit_paid || 0, notes || ''],
          function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true, booking_id: this.lastID });
  });
});

app.get('/api/today-appointments', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  
  db.all(`SELECT a.*, s.name as service_name, st.name as staff_name 
          FROM appointments a
          JOIN services s ON a.service_id = s.id
          JOIN staff st ON a.staff_id = st.id
          WHERE date(a.start_time) = date(?)`, [today], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.put('/api/appointment/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  db.run(`UPDATE appointments SET status = ? WHERE id = ?`, [status, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Test: http://localhost:${PORT}/api/services`);
});