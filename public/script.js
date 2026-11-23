// Petit script commun : langue, liens e-mail, barre du haut, apparition des blocs.
(function () {
  var racine = document.documentElement;

  // Langue : anglais par defaut. ?lang=fr dans l'adresse (liens depuis a3pc.fr) ou choix memorise du visiteur pour le francais.
  function lireChoix() { try { return localStorage.getItem('langue'); } catch (e) { return null; } }
  function appliquer(langue) {
    racine.lang = langue;
    document.querySelectorAll('.choix-langue button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.langue === langue ? 'true' : 'false');
    });
  }
  var parametre = new URLSearchParams(location.search).get('lang');
  var depart = parametre || lireChoix() || 'en';
  appliquer(depart === 'fr' ? 'fr' : 'en');
  document.querySelectorAll('.choix-langue button').forEach(function (b) {
    b.addEventListener('click', function () {
      appliquer(b.dataset.langue);
      try { localStorage.setItem('langue', b.dataset.langue); } catch (e) {}
    });
  });

  // Liens e-mail : l'adresse est ecrite a l'envers dans la page (limite les robots qui collectent les adresses).
  document.querySelectorAll('.courriel').forEach(function (lien) {
    var adresse = lien.dataset.courriel.split('').reverse().join('');
    lien.href = 'mailto:' + adresse + '?subject=' + encodeURIComponent(lien.dataset.sujet);
  });

  // Barre du haut opaque des que l'on fait defiler la page.
  var barre = document.getElementById('barre');
  // Sur une page sans grande photo d'en-tete (mentions legales), la barre est toujours opaque.
  var sansPhoto = !document.querySelector('.heros');
  function majBarre() { barre.classList.toggle('pleine', sansPhoto || window.scrollY > 40); }
  window.addEventListener('scroll', majBarre, { passive: true });
  majBarre();

  // Apparition des blocs au defilement.
  if ('IntersectionObserver' in window) {
    racine.classList.add('js');
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.apparait').forEach(function (el) { obs.observe(el); });
  }

  // ---- Cookies : question prealable. Google Tag Manager n'est charge qu'apres « Accepter ». ----
  // Le choix est garde dans le navigateur (localStorage, pas de cookie) ; le lien « Cookies » du pied de page permet d'en changer.
  var CLE_COOKIES = 'nm-consentement';
  var bandeau = document.getElementById('bandeau-cookies');
  var idGtm = document.body.dataset.gtm;
  var gtmCharge = false;
  function lireConsentement() { try { return localStorage.getItem(CLE_COOKIES); } catch (e) { return null; } }
  function chargerGtm() {
    if (gtmCharge || !idGtm) return;
    gtmCharge = true;
    // Code officiel de Google Tag Manager (le signal gtm.start est necessaire aux declencheurs « toutes les pages »).
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + idGtm;
    document.head.appendChild(s);
  }
  // Au refus : efface les cookies Google deja deposes (_ga, _ga_XXXX, _gid, _gcl_...).
  function effacerCookiesGoogle() {
    var domaines = [null, location.hostname, '.' + location.hostname.replace(/^www\./, '')];
    document.cookie.split(';').forEach(function (c) {
      var nom = c.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat|_gcl)/.test(nom)) return;
      domaines.forEach(function (d) {
        document.cookie = nom + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }
  function choisir(valeur) {
    try { localStorage.setItem(CLE_COOKIES, valeur); } catch (e) {}
    bandeau.hidden = true;
    if (valeur === 'accepte') chargerGtm();
    else {
      effacerCookiesGoogle();
      // Si Google etait deja charge sur cette page, on recharge pour l'arreter tout de suite.
      if (gtmCharge) location.reload();
    }
  }
  document.querySelectorAll('[data-choix-cookies]').forEach(function (b) {
    b.addEventListener('click', function () { choisir(b.dataset.choixCookies); });
  });
  document.querySelectorAll('[data-ouvrir-cookies]').forEach(function (b) {
    b.addEventListener('click', function () { bandeau.hidden = false; });
  });
  var choixActuel = lireConsentement();
  if (choixActuel === 'accepte') chargerGtm();
  else if (choixActuel !== 'refuse') bandeau.hidden = false;

  // ---- Documents d'archives en grand : clic sur une image marquee data-agrandir. ----
  var visionneuse = document.getElementById('visionneuse');
  var imageGrande = document.getElementById('visionneuse-image');
  if (visionneuse && typeof visionneuse.showModal === 'function') {
    document.querySelectorAll('[data-agrandir]').forEach(function (declencheur) {
      declencheur.addEventListener('click', function (e) {
        e.preventDefault();
        var img = declencheur.querySelector('img') || declencheur;
        imageGrande.src = img.currentSrc || img.src;
        imageGrande.alt = img.alt;
        visionneuse.showModal();
        visionneuse.scrollTop = 0;
      });
    });
    visionneuse.querySelector('[data-fermer-visionneuse]').addEventListener('click', function () { visionneuse.close(); });
    // Clic sur le fond sombre (hors de l'image) : fermer.
    visionneuse.addEventListener('click', function (e) { if (e.target === visionneuse) visionneuse.close(); });
  }
})();
