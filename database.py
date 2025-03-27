import sqlite3

conn = sqlite3.connect("recordings.db")
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS recordings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    recordedNotes TEXT NOT NULL
                 )''')
conn.commit()
conn.close()
