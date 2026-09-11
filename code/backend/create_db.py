import sqlite3

# Create database file
conn = sqlite3.connect("users.db")
cursor = conn.cursor()

# Create table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT
)
""")

# SAFE INSERT
cursor.execute("SELECT * FROM users WHERE username=?", ("admin",))
if not cursor.fetchone():
    cursor.execute(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        ("admin", "1234")
    )

# 🔥 CHECK DATA HERE (CORRECT PLACE)
cursor.execute("SELECT * FROM users")
print(cursor.fetchall())

conn.commit()
conn.close()

print("Database created successfully!")