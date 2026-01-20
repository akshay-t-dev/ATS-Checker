# ATS-Checker

ATS-CHECKER

A browser-based ATS (Applicant Tracking System) Resume Score Checker that analyzes how well a resume matches a job description using realistic, rule-based heuristics.

This project allows users to upload a resume PDF, extract its text in the browser, and compare it against a job description to generate an ATS compatibility score.

🚀 Features

📄 Upload resume as PDF

🔍 Extract text using PDF.js

🧠 Rule-based ATS scoring (no fake AI claims)

📊 ATS score (0–100)

🧩 Keyword matching against Job Description

📑 Checks for core resume sections

⚠️ Detects ATS-unfriendly formatting hints

💬 Action-verb analysis

🎨 Clean, dark UI using pure CSS

🌐 Runs entirely in the browser (no backend)

🛠️ Tech Stack

HTML5

CSS3 (Pure CSS – no Tailwind / no frameworks)

JavaScript (Vanilla JS)

PDF.js (for PDF text extraction)

📌 How It Works (Scoring Logic)

The ATS score is calculated using multiple weighted factors:

Factor Weight Keyword match with Job Description 40% Presence of core sections (Experience, Skills, etc.) 25% Resume length check 10% Action verbs usage 5% ATS-unfriendly formatting penalties −10%

Final score is normalized to 0–100.

⚠️ Limitations (Important)

❌ Scanned/image-only PDFs are not supported

❌ Does not use real proprietary ATS algorithms

⚠️ Complex layouts may result in imperfect text order

🧠 This is a simulation, not a replacement for real ATS software

These limitations reflect real ATS behavior.

🔮 Possible Enhancements

OCR support for scanned PDFs (Tesseract.js)

Keyword highlighting inside resume

Resume improvement suggestions

Role-specific ATS scoring profiles

Export ATS report as PDF

Backend scoring (Node / Python)

React / Next.js frontend

📜 License

This project is licensed under the MIT License. You are free to use, modify, and distribute it.

🙌 Acknowledgements

PDF.js by Mozilla

📬 Feedback

If you find a bug or want to improve the project, feel free to open an issue or submit a pull request.
