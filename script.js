// =========================================
// SÖTÉT/VILÁGOS MÓD LOGIKA
// =========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
htmlElement.setAttribute('data-bs-theme', savedTheme);
updateIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// =========================================
// SKILLS ANIMÁCIÓ ÉS ADATOK LOGIKÁJA
// =========================================

// Itt vannak a technikai készségeidhez tartozó részletes szövegek
const skillData = {
    'html': {
        title: 'HTML5',
        icon: 'fab fa-html5',
        bgColor: '#0d6efd',
        desc: 'Magabiztosan kezelem, ez adja a webes projektjeim stabil alapját. Képes vagyok átlátható, jól strukturált és szemantikus felépítést készíteni bármilyen weboldalhoz.'
    },
    'css': {
        title: 'CSS3',
        icon: 'fab fa-css3-alt',
        bgColor: '#0d6efd',
        desc: 'Általánosságban magabiztosan használom a stíluslapokat. Bár egy-egy komplexebb elrendezés okozhat kihívást, a felmerülő vizuális problémákat hatékonyan és kitartóan meg tudom oldani.'
    },
    'js': {
        title: 'JavaScript',
        icon: 'fab fa-js',
        bgColor: '#ffc107',
        textColor: '#000',
        desc: 'Az előző tanévben kezdtem el aktívan tanulni. Az alapokat értem és használom, de a komplexebb logikai feladatoknál még támaszkodom külső segítségre. Folyamatosan fejlesztem magam ezen a téren.'
    },
    'bootstrap': {
        title: 'Bootstrap 5',
        icon: 'fab fa-bootstrap',
        bgColor: '#7952b3',
        desc: 'Bár nem minden projektnél alkalmazom, amikor szükség van rá (mint például ennél a portfóliónál is), magabiztosan és gyorsan tudok vele reszponzív, mobilbarát felületeket építeni.'
    },
    'python': {
        title: 'Python',
        icon: 'fab fa-python',
        bgColor: '#198754',
        desc: 'A középiskolás tanulmányaim során (10. osztályban) sajátítottam el az alapjait, egészen a fájlkezelésig jutottunk. Ismerem az alapvető szintaktikát és a programozási logikát.'
    },
    'csharp': {
        title: 'C#',
        icon: 'fas fa-code',
        bgColor: '#239120',
        desc: 'Jelenleg is aktívan tanulom és kifejezetten szeretem. Otthonosan mozgok az objektumorientált programozásban (osztályok), a fájlkezelésben, a LINQ lekérdezésekben és a hibakezelés (try-catch) alkalmazásában.'
    },
    'mysql': {
        title: 'MySQL',
        icon: 'fas fa-database',
        bgColor: '#0dcaf0',
        textColor: '#000',
        desc: 'Hasonlóan magabiztos szinten állok vele, mint a CSS-sel. Értem az adatbázisok felépítését és képes vagyok a szükséges lekérdezések elkészítésére a projektjeimhez.'
    },
    'php': {
        title: 'PHP',
        icon: 'fab fa-php',
        bgColor: '#212529',
        desc: 'Bár a nyelv elsajátítását még idén fogom elkezdeni a tanulmányaim során, a TATAMI MASTER komplex backend logikáját mesterséges intelligencia (AI) asszisztensek célzott használatával már sikeresen felépítettem. Ez a folyamat nagyszerűen fejlesztette a problémamegoldó és prompt-engineering készségemet.'
    },
    'git': {
        title: 'Git / GitHub',
        icon: 'fab fa-git-alt',
        bgColor: '#212529',
        desc: 'Toronymagasan az egyik legbiztosabb pont a tudástáramban. Napi szinten használom a verziókövetést és a GitHubot, a projektek menedzselése és biztonságos mentése rutinfeladat számomra.'
    },
    'api': {
        title: 'API Integrációk',
        icon: 'fas fa-network-wired',
        bgColor: '#212529',
        desc: 'A külső szolgáltatások, például a Spotify API bekötését és a biztonságos hálózati kommunikációt AI eszközök lépésről lépésre történő iránymutatásával valósítottam meg. Megtanultam, hogyan használjam az AI-t a saját tudásomon túlmutató, komplex feladatok sikeres megoldására.'
    },
    'video': {
        title: 'Videószerkesztés',
        icon: 'fas fa-video',
        bgColor: '#6c757d',
        desc: 'Egy korábbi, 2020-ban indított játékos YouTube csatornám építése során szereztem stabil, gyakorlati alaptudást a Sony Vegas Pro 18 szoftver használatában.'
    },
    'photoshop': {
        title: 'Adobe Photoshop',
        icon: 'fas fa-palette',
        bgColor: '#6c757d',
        desc: 'A videószerkesztéshez hasonlóan, hobbi projekteken keresztül tanultam meg a használatát. Alapvető képszerkesztési és grafikai feladatokat gond nélkül megoldok benne.'
    }
};

const skillsGrid = document.getElementById('skills-grid');
const skillDetailCard = document.getElementById('skill-detail-card');
const closeSkillBtn = document.getElementById('close-skill-btn');
const skillBadges = document.querySelectorAll('.interactive-skill');

// DOM elemek a kártyán belül
const detailIconBg = document.getElementById('detail-icon-bg');
const detailIcon = document.getElementById('detail-icon');
const detailTitle = document.getElementById('detail-title');
const detailDesc = document.getElementById('detail-desc');

// Kattintás egy Badge-re
skillBadges.forEach(badge => {
    badge.addEventListener('click', function () {
        const skillKey = this.getAttribute('data-skill');
        const data = skillData[skillKey];

        // 1. Kártya tartalmának frissítése
        detailTitle.textContent = data.title;
        detailDesc.textContent = data.desc;

        // Ikon és színek beállítása
        detailIcon.className = `${data.icon} fa-3x`;
        detailIconBg.style.backgroundColor = data.bgColor;

        // Ha van egyedi szövegszín megadva (pl. sárga háttérhez fekete ikon), alkalmazzuk
        if (data.textColor) {
            detailIcon.style.color = data.textColor;
        } else {
            detailIcon.style.color = '#ffffff'; // Alapértelmezett fehér
        }

        // 2. Animációk: Grid eltüntetése, Kártya megjelenítése
        skillsGrid.classList.add('hidden-skill');

        // Kis késleltetés a simább effektért
        setTimeout(() => {
            skillDetailCard.classList.remove('hidden-skill');
            // Hogy a kártya relatívan jelenjen meg és ne csússzon el a magasság
            skillDetailCard.style.position = 'relative';
            skillsGrid.style.position = 'absolute';
        }, 300);
    });
});

// Kattintás az X (bezáró) gombra
closeSkillBtn.addEventListener('click', () => {
    // 1. Kártya eltüntetése
    skillDetailCard.classList.add('hidden-skill');

    // 2. Grid megjelenítése
    setTimeout(() => {
        skillsGrid.classList.remove('hidden-skill');
        skillsGrid.style.position = 'relative';
        skillDetailCard.style.position = 'absolute';
    }, 300);
});