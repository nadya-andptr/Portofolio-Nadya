/* ==========================================
   FILE INI SATU-SATUNYA YANG PERLU KAMU EDIT
   ========================================== */

// Nama situs/portofolio — tampil di navbar & hero
const SITE_NAME = "Nadya's Portfolio";

const ME = {
  name: "Nadya Ananda Putri",
  title: "Ilustrator & Pecinta Cerita Fantasi",
  avatar: "profile.jpeg",

  // Kutipan singkat yang tampil besar di hero (boleh dikosongkan: "")
quote: "Star-gazing Aster,\nwould I were the skies,\nTo gaze upon thee with a thousand eyes.",

  bio: [
    "Halo! Aku seorang ilustrator yang suka menggambar karakter fiksi.",
    "Sejak SMP aku mulai iseng menggambar, dan sekarang bisa membuat karakter buatanku sendiri — walau banyak yang masih WIP, hehe."
  ],

  skills: ["Digital painting", "Character design", "Sketsa tradisional", "Fan art"],

  // level = persen bar (0-100), logo = alamat gambar logo app
  // contoh: logo: "gambar/ibis.png"
  tools: [
    { name: "Ibis Paint",        level: 80, logo: "" },
    { name: "MediBang",          level: 40, logo: "" },
    { name: "Clip Studio Paint", level: 20, logo: "" }
  ],

  contact: [
    ["Instagram", "https://instagram.com/xzach_404"],
    ["Email", "mailto:nadyaanandaaputrii@email.com"]
  ]
};

// src = alamat gambar, contoh: "gambar/karya1.jpg"
// desc = keterangan singkat yang tampil di bawah judul karya
// Kalau src dikosongkan, tampil warna placeholder (hue = 0-360)
const ARTWORKS = [
  { title: "Gambar 1", desc: "Hidoop JOWOWI.", src: "", hue: 220 },
  { title: "Gambar 2", desc: "shsrarsar saudara saudara, utang!.", src: "", hue: 260 },
  { title: "Gambar 3", desc: "YNTYKTS", src: "", hue: 200 },
  { title: "Gambar 4", desc: "Ya ya OTW", src: "", hue: 45  },
  { title: "Gambar 5", desc: "19 lapangan judol", src: "", hue: 300 },
  { title: "Gambar 6", desc: "How much sorrow can I take?", src: "", hue: 210 }
];
