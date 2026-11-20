/* ==========================================
   Mengisi halaman dari data di data.js,
   plus membuat salju & bunga dekoratif
   (biasanya tidak perlu diubah)
   ========================================== */

// Cegah karakter khusus merusak HTML
function esc(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return String(text).replace(/[&<>"]/g, c => map[c]);
}

// Background gambar karya (atau warna placeholder)
function bgOf(art) {
  if (art.src) return `url("${art.src}")`;
  return `linear-gradient(140deg, hsl(${art.hue} 70% 82%), hsl(${(art.hue + 40) % 360} 55% 55%))`;
}

// Bunga forget-me-not kecil, dipakai di logo, judul bagian, dan dekorasi melayang
function flowerSVG() {
  return `
    <svg viewBox="0 0 40 40" width="100%" height="100%" fill="none">
      <g fill="currentColor" opacity=".92">
        <ellipse cx="20" cy="10" rx="6.2" ry="8.6"/>
        <ellipse cx="20" cy="10" rx="6.2" ry="8.6" transform="rotate(72 20 20)"/>
        <ellipse cx="20" cy="10" rx="6.2" ry="8.6" transform="rotate(144 20 20)"/>
        <ellipse cx="20" cy="10" rx="6.2" ry="8.6" transform="rotate(216 20 20)"/>
        <ellipse cx="20" cy="10" rx="6.2" ry="8.6" transform="rotate(288 20 20)"/>
      </g>
      <circle cx="20" cy="20" r="4.4" fill="#f2dd6b"/>
    </svg>`;
}


/* ---------- Isi teks & konten dari data.js ---------- */

function fillContent() {
  document.getElementById("navName").textContent = SITE_NAME;
  document.getElementById("footName").textContent = `${SITE_NAME} — dibuat dengan HTML, CSS, & JavaScript ❄`;

  // Hero
  document.getElementById("avatarBox").innerHTML = ME.avatar
    ? `<img src="${esc(ME.avatar)}" alt="Foto ${esc(ME.name)}">`
    : "Foto profil";
  document.getElementById("heroName").textContent = ME.name;
  document.getElementById("heroTitle").textContent = ME.title;

  const quoteEl = document.getElementById("heroQuote");
  if (ME.quote) { quoteEl.textContent = `"${ME.quote}"`; } else { quoteEl.remove(); }

  // Tentang
  document.getElementById("bioBody").innerHTML = ME.bio.map(t => `<p>${esc(t)}</p>`).join("");

  // Keahlian
  document.getElementById("skillTags").innerHTML =
    ME.skills.map(s => `<li>${esc(s)}</li>`).join("");

  document.getElementById("toolList").innerHTML = ME.tools.map(t => {
    const logo = t.logo ? `<img src="${esc(t.logo)}" alt="Logo ${esc(t.name)}">` : "Logo";
    return `
      <div class="tool">
        <div class="tool-logo">${logo}</div>
        <div class="tool-info">
          <div class="tool-head"><span>${esc(t.name)}</span><span>${t.level}%</span></div>
          <div class="bar"><i style="width:${t.level}%"></i></div>
        </div>
      </div>`;
  }).join("");

  
  // Galeri
  document.getElementById("galleryGrid").innerHTML = ARTWORKS.map((a, i) => `
    <div class="card">
       <button class="art" data-i="${i}" aria-label="Lihat ${esc(a.title)}">
       <div class="pic" style="background-image:${bgOf(a)}"></div>
       </button>
     <h3>${esc(a.title)}</h3>
     ${a.desc ? `<p>${esc(a.desc)}</p>` : ""}
    </div>`).join("");
 
  // Kontak
  document.getElementById("contactList").innerHTML = ME.contact.map(([label, url]) =>
    `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`).join("");

  // Bunga kecil di logo & tiap judul bagian
  document.querySelectorAll(".logo-flower, .h-flower").forEach(el => el.innerHTML = flowerSVG());
}



/* ---------- Salju yang jatuh pelan ---------- */

function makeSnow() {
  const layer = document.getElementById("snow");
  const glyphs = ["❅", "❆", "❄"];
  const bits = [];

  // Membagi posisi menjadi beberapa area agar merata
  function balancedPosition(index, total) {
    const area = 100 / total;
    const left = (index * area) + (Math.random() * area);

    return left.toFixed(1);
  }

  // Bintik salju halus
  for (let i = 0; i < 36; i++) {
    const left = balancedPosition(i, 36);
    const size = (Math.random() * 3 + 2).toFixed(1);
    const duration = (Math.random() * 10 + 12).toFixed(1);
    const delay = (Math.random() * -20).toFixed(1);
    const drift = (Math.random() * 60 - 30).toFixed(0);
    const opacity = (Math.random() * 0.4 + 0.4).toFixed(2);

    bits.push(`<span class="flake dot" style="
      left:${left}%; width:${size}px; height:${size}px;
      animation-duration:${duration}s; animation-delay:${delay}s;
      opacity:${opacity}; --drift:${drift}px;"></span>`);
  }

  // Kepingan salju besar (bunga salju)
  for (let i = 0; i < 14; i++) {
    const left = balancedPosition(i, 14);
    const size = (Math.random() * 14 + 18).toFixed(0);
    const duration = (Math.random() * 12 + 16).toFixed(1);
    const delay = (Math.random() * -24).toFixed(1);
    const drift = (Math.random() * 80 - 40).toFixed(0);
    const glyph = glyphs[i % glyphs.length];

    bits.push(`<span class="flake glyph" style="
      left:${left}%; font-size:${size}px;
      animation-duration:${duration}s; animation-delay:${delay}s;
      --drift:${drift}px;">${glyph}</span>`);
  }

  layer.innerHTML = bits.join("");
}





/* ---------- Bunga forget-me-not dekoratif yang melayang pelan ---------- */

function makeFlowers() {
  const layer = document.getElementById("flowers");
  const tones = ["t1", "t2", "t3"];
  const bits = [];

  // Jumlah bunga menyesuaikan ukuran layar
  const totalFlowers = window.innerWidth < 600 ? 5 : 8;

  for (let i = 0; i < totalFlowers; i++) {
    // Posisi bunga dibuat merata dari kiri ke kanan
    const area = 100 / totalFlowers;
    const left = (i * area) + (Math.random() * area * 0.5) + (area * 0.25);
    const top = (Math.random() * 96).toFixed(1);
    const size = (Math.random() * 36 + 48).toFixed(0);
    const duration = (Math.random() * 5 + 10).toFixed(1);
    const delay = (Math.random() * -10).toFixed(1);
    const tone = tones[i % tones.length];

    bits.push(`<span class="deco-flower ${tone}" style="
      left:${left.toFixed(1)}%; top:${top}%; width:${size}px; height:${size}px;
      animation-duration:${duration}s; animation-delay:${delay}s;">${flowerSVG()}</span>`);
  }

  layer.innerHTML = bits.join("");
}




/* ---------- Gambar besar (lightbox) ---------- */

function setupLightbox() {
  const lb = document.getElementById("lb");

  document.getElementById("galleryGrid").addEventListener("click", e => {
    const btn = e.target.closest(".art");
    if (!btn) return;

    const art = ARTWORKS[btn.dataset.i];
    document.getElementById("lbImg").style.backgroundImage = bgOf(art);
    document.getElementById("lbCap").textContent = art.title;
    lb.classList.add("on");
  });

  lb.onclick = () => lb.classList.remove("on");
  addEventListener("keydown", e => { if (e.key === "Escape") lb.classList.remove("on"); });
}

/* ---------- Forget-me-not cursor trail ---------- */

function makeCursorTrail() {
  const layer = document.getElementById("cursorTrail");

  let lastTime = 0;
  let lastX = 0;
  let lastY = 0;

  document.addEventListener("mousemove", e => {
    const now = Date.now();

    // Jarak minimal agar bunga tidak terlalu rapat
    const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);

    if (now - lastTime < 50 || distance < 15) return;

    lastTime = now;
    lastX = e.clientX;
    lastY = e.clientY;

    const flower = document.createElement("span");

    flower.className = "trail-flower";
    flower.innerHTML = flowerSVG();

    const size = Math.random() * 6 + 12;
    const offsetX = (Math.random() - 0.5) * 12;
    const offsetY = (Math.random() - 0.5) * 12;

    flower.style.left = `${e.clientX + offsetX}px`;
    flower.style.top = `${e.clientY + offsetY}px`;
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;

    // Variasi warna bunga
    const colors = ["#a1c2e8", "#d7abd0", "#789bd0"];
    flower.style.color = colors[Math.floor(Math.random() * colors.length)];

    layer.appendChild(flower);

    // Menghapus bunga setelah animasi selesai
    setTimeout(() => {
      flower.remove();
    }, 1500);
  });
}


/* ---------- Forget-me-not touch trail untuk HP ---------- */

function makeTouchTrail() {
  const layer = document.getElementById("cursorTrail");

  let lastTime = 0;
  let lastX = 0;
  let lastY = 0;

  document.addEventListener("touchmove", e => {
    const touch = e.touches[0];
    const now = Date.now();

    const distance = Math.hypot(
      touch.clientX - lastX,
      touch.clientY - lastY
    );

    if (now - lastTime < 50 || distance < 15) return;

    lastTime = now;
    lastX = touch.clientX;
    lastY = touch.clientY;

    const flower = document.createElement("span");

    flower.className = "trail-flower";
    flower.innerHTML = flowerSVG();

    const size = Math.random() * 6 + 12;
    const offsetX = (Math.random() - 0.5) * 12;
    const offsetY = (Math.random() - 0.5) * 12;

    flower.style.left = `${touch.clientX + offsetX}px`;
    flower.style.top = `${touch.clientY + offsetY}px`;
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;

    const colors = ["#a1c2e8", "#d7abd0", "#789bd0"];
    flower.style.color = colors[Math.floor(Math.random() * colors.length)];

    layer.appendChild(flower);

    setTimeout(() => {
      flower.remove();
    }, 1500);
  }, { passive: true });
}



/* ---------- Mulai ---------- */

fillContent();
makeSnow();
makeFlowers();
setupLightbox();
makeCursorTrail();
makeTouchTrail();
