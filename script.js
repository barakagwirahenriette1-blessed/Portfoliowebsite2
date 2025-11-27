// script.js
document.addEventListener('DOMContentLoaded', () => {
  const genBtn = document.getElementById('generate-resume');
  const direct = document.getElementById('direct-resume');

  // If no generate button found (e.g., on index.html) do nothing
  if (!genBtn) return;

  genBtn.addEventListener('click', async () => {
    // Try to fetch resume.pdf in site root; if available, download it.
    try {
      const resp = await fetch('resume.pdf', { method: 'HEAD' });
      if (resp.ok) {
        // If HEAD request works, redirect to download via anchor
        const a = document.createElement('a');
        a.href = 'resume.pdf';
        a.download = 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        return;
      }
    } catch (e) {
      // fetch HEAD might fail on some hosts or file://; fallback to generator
    }

    // Fallback: create a simple text resume and prompt download
    const sampleResume = [
      "Henriette — Software Developer",
      "Email: you@example.com",
      "",
      "Summary:",
      "Experienced frontend & backend developer building responsive web apps.",
      "",
      "Skills: HTML, CSS, JavaScript, React, Node.js, Databases",
      "",
      "Experience:",
      "- Developer at XYZ (2023-2025)",
      "",
      "Education:",
      "- BSc Computer Science",
      "",
      "Portfolio: Replace with your real portfolio link"
    ].join("\n");

    const blob = new Blob([sampleResume], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Henriette-resume.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // If the direct link exists but you want a more clever UX, we could intercept clicks and check availability.
  // For now we leave the direct link as a simple file link to 'resume.pdf' (place resume.pdf in this folder).
});
