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
  function majBarre() { barre.classList.toggle('pleine', window.scrollY > 40); }
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
})();
