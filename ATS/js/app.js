let resumeText = "";

/* PDF Upload & Extraction */
document.getElementById("resumeFile").addEventListener("change", (e) => {
  const file = e.target.files[0];

  if (!file || file.type !== "application/pdf") {
    alert("Please upload a valid PDF file.");
    return;
  }

  document.getElementById("resumeStatus").textContent =
    "Extracting text from PDF...";

  const reader = new FileReader();
  reader.readAsArrayBuffer(file);

  reader.onload = async function () {
    const typedarray = new Uint8Array(this.result);
    const pdf = await pdfjsLib.getDocument(typedarray).promise;

    let extractedText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(" ");
      extractedText += pageText + " ";
    }

    resumeText = extractedText.toLowerCase();
    document.getElementById("resumeStatus").textContent =
      `Resume loaded successfully (${pdf.numPages} pages)`;
  };
});

/* ATS Analysis */
function analyzeResume() {
  const job = document.getElementById("jobText").value.toLowerCase();

  if (!resumeText || !job) {
    alert("Please upload a resume PDF and paste job description.");
    return;
  }

  let score = 0;
  let feedback = [];

  /* Keyword Match */
  const jobWords = [...new Set(job.match(/\b[a-z]{3,}\b/g))];
  const matched = jobWords.filter(w => resumeText.includes(w));
  const keywordScore = Math.min(40, Math.round((matched.length / jobWords.length) * 40));
  score += keywordScore;
  feedback.push(`Keyword match: ${keywordScore}/40`);

  /* Core Sections */
  const sections = ["experience", "education", "skills", "projects", "certifications"];
  let sectionScore = 0;
  sections.forEach(sec => {
    if (resumeText.includes(sec)) sectionScore += 5;
  });
  score += sectionScore;
  feedback.push(`Core sections found: ${sectionScore}/25`);

  /* Resume Length */
  const wordCount = resumeText.split(/\s+/).length;
  if (wordCount >= 300 && wordCount <= 900) {
    score += 10;
    feedback.push("Resume length is ATS-friendly");
  } else {
    feedback.push("Resume length may affect ATS parsing");
  }

  /* Formatting Red Flags */
  const redFlags = ["table", "icon", "image", "column", "graphic"];
  let penalty = 0;
  redFlags.forEach(flag => {
    if (resumeText.includes(flag)) penalty += 2;
  });
  score -= penalty;
  if (penalty > 0) feedback.push(`ATS formatting issues (-${penalty})`);

  /* Action Verbs */
  const actionVerbs = ["developed", "built", "designed", "implemented", "optimized", "led"];
  if (actionVerbs.filter(v => resumeText.includes(v)).length >= 3) {
    score += 5;
    feedback.push("Strong action verbs detected");
  } else {
    feedback.push("Add more action verbs");
  }

  score = Math.max(0, Math.min(100, score));

  /* UI */
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("scoreCircle").textContent = score + "%";

  const scoreText = document.getElementById("scoreText");
  scoreText.textContent =
    score >= 75 ? "Excellent ATS compatibility" :
    score >= 50 ? "Average ATS compatibility" :
    "Low ATS compatibility";

  const circle = document.getElementById("scoreCircle");
  circle.className =
    "score-circle " +
    (score >= 75 ? "border-emerald-500 text-emerald-400" :
     score >= 50 ? "border-yellow-400 text-yellow-400" :
     "border-red-500 text-red-400");

  const feedbackList = document.getElementById("feedback");
  feedbackList.innerHTML = "";
  feedback.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    feedbackList.appendChild(li);
  });
}