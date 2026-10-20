import sqlite3

DB_NAME = "campusconnect.db"

def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            headline TEXT,
            skills TEXT,
            bio TEXT
        )
    """)
    conn.commit()
    conn.close()

def save_profile(name, headline, skills, bio):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO profiles (name, headline, skills, bio) VALUES (?, ?, ?, ?)",
        (name, headline, skills, bio)
    )
    conn.commit()
    conn.close()

def get_all_profiles():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM profiles")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]
