import sqlite3
import bcrypt


def create_database() -> None: 
    con = sqlite3.connect("songs.db", check_same_thread=False)
    cur = con.cursor()

    cur.execute('''
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY,
                username VARCHAR(25) NOT NULL,
                description VARCHAR(500),
                datetime DATETIME NOT NULL
                UNIQUE(username)
            )
    ''')
    cur.execute('''
        CREATE TABLE IF NOT EXISTS songs(
            id INTEGER PRIMARY KEY,
            datetime DATETIME NOT NULL,
            recording TEXXT NOT NULL
        )
    ''')

def password_matches() -> bool:
    ...

def temp_create_db() -> None:
    conn = sqlite3.connect("recordings.db")
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS recordings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            recordedNotes TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()
