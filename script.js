/* ==========================================================================
   AI GROWTH HUB - CORE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOBILE MENU TOGGLE
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            // Karena di CSS kita set display: none untuk mobile, 
            // kita gunakan toggle style sederhana.
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(11, 15, 25, 0.95)';
                navLinks.style.padding = '20px 0';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.borderBottom = '1px solid var(--glass-border)';
                mobileBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            }
        });
    }

    // 2. DYNAMIC AI TOOLS DIRECTORY
    // Ini memudahkan kamu menambah tools di masa depan cukup dengan mengubah teks di bawah ini.
    const toolsData = [
        {
            name: "ChatGPT 4o",
            desc: "Model bahasa tingkat lanjut dari OpenAI untuk penulisan, coding, dan analisis data mendalam.",
            icon: "fa-robot",
            tags: ["Text", "Freemium"],
            link: "#"
        },
        {
            name: "Midjourney v6",
            desc: "Generator gambar AI dengan kualitas fotorealistik terbaik dan interpretasi prompt yang luar biasa.",
            icon: "fa-image",
            tags: ["Image", "Paid"],
            link: "#"
        },
        {
            name: "Claude 3.5 Sonnet",
            desc: "AI tangguh dari Anthropic dengan kapasitas reasoning tinggi dan gaya penulisan yang natural.",
            icon: "fa-brain",
            tags: ["Text", "Freemium"],
            link: "#"
        },
        {
            name: "Sora",
            desc: "Model AI pembuat video yang mampu menghasilkan adegan kompleks hingga 1 menit dari teks.",
            icon: "fa-video",
            tags: ["Video", "Paid"],
            link: "#"
        },
        {
            name: "Perplexity AI",
            desc: "Mesin pencari berbasis AI yang memberikan jawaban akurat disertai sumber referensi langsung.",
            icon: "fa-magnifying-glass",
            tags: ["Research", "Freemium"],
            link: "#"
        },
        {
            name: "CapCut AutoCut",
            desc: "Fitur AI dari CapCut untuk memotong dan mengedit video pendek secara otomatis untuk TikTok/Reels.",
            icon: "fa-scissors",
            tags: ["Video", "Free"],
            link: "#"
        }
    ];

    const toolsContainer = document.getElementById('tools-container');
    if (toolsContainer) {
        toolsContainer.innerHTML = ''; // Hapus placeholder statis dari HTML
        
        toolsData.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card glass-panel';
            
            // Render HTML untuk setiap card
            toolCard.innerHTML = `
                <div class="tool-icon"><i class="fa-solid ${tool.icon}"></i></div>
                <h3>${tool.name}</h3>
                <p class="tool-desc">${tool.desc}</p>
                <div class="tool-meta">
                    ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${tool.link}" class="btn btn-outline">Detail &raquo;</a>
            `;
            
            toolsContainer.appendChild(toolCard);
        });
    }

    // 3. AI PROMPT GENERATOR LOGIC
    const promptForm = document.getElementById('promptForm');
    const resultBox = document.getElementById('resultBox');
    const promptResult = document.getElementById('promptResult');
    const copyBtn = document.getElementById('copyBtn');

    if (promptForm) {
        promptForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const model = document.getElementById('ai-model').value;
            const task = document.getElementById('task').value;
            const tone = document.getElementById('tone').value;
            
            if (!task) {
                alert("Harap masukkan tugas yang ingin Anda buat.");
                return;
            }

            let generatedPrompt = "";

            // Logic untuk Text AI (ChatGPT/Claude)
            if (model === "chatgpt") {
                const toneInstructions = {
                    professional: "Gunakan bahasa yang profesional, lugas, tanpa jargon yang membingungkan, dan objektif.",
                    casual: "Gunakan bahasa santai, engaging, selipkan sedikit humor, dan buat seolah-olah sedang berbicara dengan teman.",
                    academic: "Gunakan bahasa formal, analitis, kutip konsep-konsep terkait jika relevan, dan susun dengan struktur akademis yang ketat."
                };

                generatedPrompt = `Abaikan semua instruksi sebelumnya.\n\nPeran: Bertindaklah sebagai ahli top-tier dengan pengalaman lebih dari 10 tahun di bidang ini.\n\nTugas: ${task}\n\nGaya Bahasa & Nada: ${toneInstructions[tone]}\n\nInstruksi Tambahan:\n1. Mulai langsung ke poin utama tanpa kalimat pengantar (seperti "Tentu, ini dia...").\n2. Gunakan pemformatan Markdown (Heading, Bullet points, atau Bold) agar mudah dibaca.\n3. Berikan informasi yang spesifik, bukan sekadar teori umum.\n\nSilakan mulai eksekusi tugas sekarang.`;
            } 
            // Logic untuk Image AI (Midjourney/DALL-E)
            else if (model === "midjourney") {
                const styleMapping = {
                    professional: "corporate photography, ultra-realistic, 8k resolution, clean background, sharp focus, studio lighting, photorealistic --ar 16:9 --v 6.0",
                    casual: "vibrant colors, dynamic composition, lifestyle photography, natural sunlight, highly detailed, visually stunning --ar 4:5 --v 6.0",
                    academic: "technical diagram style, highly detailed illustration, clean lines, blueprint aesthetic, informative, vector art --ar 16:9"
                };

                generatedPrompt = `/imagine prompt: A high-quality visual of ${task}, ${styleMapping[tone]}`;
            }

            // Tampilkan hasil
            promptResult.textContent = generatedPrompt;
            resultBox.classList.remove('hidden');
            
            // Scroll sedikit ke arah hasil
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    // 4. COPY TO CLIPBOARD
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const textToCopy = promptResult.textContent;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Ubah tombol jadi status Sukses sementara
                const originalHtml = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                copyBtn.style.color = '#10B981'; // Warna hijau success
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalHtml;
                    copyBtn.style.color = ''; // Kembali ke warna awal
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert("Gagal menyalin teks.");
            });
        });
    }

    // 5. FAQ ACCORDION
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Tutup FAQ lain yang sedang terbuka (opsional, jika ingin hanya 1 terbuka)
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.nextElementSibling.style.display = 'none';
                    q.querySelector('i').className = 'fa-solid fa-chevron-down';
                }
            });

            // Toggle FAQ yang diklik
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.className = 'fa-solid fa-chevron-down';
            } else {
                answer.style.display = 'block';
                icon.className = 'fa-solid fa-chevron-up';
            }
        });
    });

    // 6. SMOOTH SCROLLING UNTUK NAVBAR LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Tutup mobile menu jika sedang terbuka
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                    mobileBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }

                // Scroll dengan offset untuk navbar fixed
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
