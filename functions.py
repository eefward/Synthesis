import sqlite3
import bcrypt

def createUsersDB(conn):
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    ''')

def create_database(conn) -> None: 
    cursor = conn.cursor()
    cursor.execute('''
            CREATE TABLE IF NOT EXISTS users(
                id INTEGER PRIMARY KEY,
                username VARCHAR(25) NOT NULL,
                description VARCHAR(500),
                datetime DATETIME NOT NULL
                UNIQUE(username)
            )
    ''')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS songs(
            id INTEGER PRIMARY KEY,
            datetime DATETIME NOT NULL,
            recording TEXXT NOT NULL
        )
    ''')

def password_matches() -> bool:
    ...

def createRecordingsDB(conn) -> None:
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS recordings (
            id INTEGER PRIMARY KEY,
            title VARCHAR(255),
            user VARCHAR(255),
            duration TEXT,
            BPM INTEGER,
            recordedNotes TEXT NOT NULL
        );
    ''')

