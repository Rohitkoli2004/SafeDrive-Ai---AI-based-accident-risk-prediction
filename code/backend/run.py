import os
import uvicorn
import webbrowser
import threading
import time

def open_browser():
    # Wait for server to start
    time.sleep(2)

    # Path to your frontend login page
    frontend_path = os.path.join(os.getcwd(), "..", "frontend", "login.html")

    # Open in default browser
    webbrowser.open(f"file://{frontend_path}")

if __name__ == "__main__":
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    os.chdir(BASE_DIR)

    print("Running from:", os.getcwd())

    # Open browser in separate thread
    threading.Thread(target=open_browser).start()

    # Start backend
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)