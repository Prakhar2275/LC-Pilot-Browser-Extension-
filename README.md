# 🚀 LC Buddy

### 🧠 Open Source Algorithm Insight Extension for LeetCode

LC Buddy is a browser extension that enhances the coding experience on LeetCode by providing **real-time algorithm insights, time complexity estimation, and optimization hints** directly inside the problem interface,this also  provides you with the optimal approach to reach to the solution without hopping on to the solution directly that help improving your Problem Solving Skills.

The extension analyzes the code written by the user and provides feedback about algorithmic efficiency, helping developers understand how optimal their solution is.

---

# ✨ Features

### ⏱️ Time Complexity Estimation

Analyzes the code written in the editor and estimates the time complexity of the solution.

Example output:

Your Complexity: `O(n²)`
Optimal Complexity: `O(n log n)`

---

### 💾 Space Complexity Analysis

Provides an estimate of the memory usage patterns of the implemented solution.

---


### 💡 Optimal Approach Suggestions

LC Buddy compares the detected complexity with commonly known optimal approaches and suggests improvements.

Example:

Detected Pattern: Sliding Window
Suggestion: Reduce nested iteration using a two-pointer technique.

---

### 🧩 Integrated Sidebar Interface

LC Buddy injects a sidebar panel into the LeetCode interface where analysis results and insights are displayed without disrupting the coding workflow.

---

# 🛠 Tech Stack

## ⚛️ Frontend (Extension)

* JavaScript
* React
* Chrome Extension APIs
* DOM Manipulation
* Monaco Editor Integration

---

## ⚡ Backend

Built using **FastAPI**

Responsibilities:

* Code analysis
* Pattern detection
* Complexity estimation
* Hint generation
* API endpoints for extension communication

---

## 🗄️ Database

SQLite

Used for storing:

* analysis history
* complexity results
* problem metadata
* user insights

---

# 🏗 Architecture

```
User writes code on LeetCode
        ↓
Extension extracts code from the editor
        ↓
Code sent to FastAPI backend
        ↓
Backend analyzes algorithm structure
        ↓
Time complexity + insights generated
        ↓
Results displayed in extension sidebar
```

---

# 📂 Project Structure

```
LC-buddy/

backend/
    app/
        routes/
        services/
        models/
        schemas/
        database/
        main.py

extension/
    manifest.json
    content.js
    background.js

ui/
    sidebar/
    popup/
```

---

# ⚙️ Installation

## 📥 Clone Repository

```
git clone https://github.com/yourusername/lc-buddy
```

---

## 🧩 Backend Setup

```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 🌐 Load Chrome Extension

1️⃣ Open Chrome
2️⃣ Navigate to

```
chrome://extensions
```

3️⃣ Enable **Developer Mode**
4️⃣ Click **Load Unpacked**
5️⃣ Select the extension folder

---

# 🛣 Roadmap

* 📊 Real-time code complexity visualization
* 🤖 AI-powered algorithm hints
* 🏆 Contest mode insights
* ⚡ Solution comparison engine
* 📈 Performance benchmarking

---

# 🤝 Contributing

LC Buddy is an open-source project and contributions are welcome.

Steps to contribute:

1️⃣ Fork the repository
2️⃣ Create a feature branch
3️⃣ Commit your changes
4️⃣ Open a pull request

---

# 📜 License

MIT License

---

# 🎯 Vision

LC Buddy aims to help developers understand not only **how to solve problems**, but also **how to solve them efficiently** by providing algorithmic insights during the coding process.
