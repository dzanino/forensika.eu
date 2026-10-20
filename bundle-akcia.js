/* bundle-akcia.js (forensika.eu) - prepína obsah webu podľa dátumu, aby ceny sedeli s App Store.
   Obdobia (slovenský čas):
     Halloween     29. 10. - 2. 11. 2026  len vzhľad banneru, ceny bežné (data-hw="on"/"off")
     Black Friday  23. 11. - 30. 11. 2026 akciové ceny (data-bf="on"/"off") a pás s cenami hore na stránke
   Bez JavaScriptu sa ukážu bežné ceny. Náhľad: na koniec adresy pridaj ?bf=1 alebo ?hw=1.
   Ak by sa akcia v App Store Connect zrušila, prepni BF_ZAPNUTE na false. */
(function () {
  var BF_ZAPNUTE = true;
  var BF = ['2026-11-23T00:00:00+01:00', '2026-12-01T00:00:00+01:00'];
  var HW = ['2026-10-29T00:00:00+01:00', '2026-11-03T00:00:00+01:00'];
  var ODKAZ = 'https://apps.apple.com/app-bundle/id6824160695';
  var PAS = {
    sk: 'Black Friday do 30. 11.: 4n6 Tools Pro 89,99 € (bežne 104,99 €) · Colorime3ka 14,99 € (bežne 17,99 €) · Fotograme3ka 3D 29,99 € (bežne 34,99 €) · všetky tri v bundli 119,99 €',
    en: 'Black Friday until Nov 30: 4n6 Tools Pro €89.99 (usually €104.99) · Colorime3ka €14.99 (usually €17.99) · Fotograme3ka 3D €29.99 (usually €34.99) · all three in a bundle €119.99',
    de: 'Black Friday bis 30. 11.: 4n6 Tools Pro 89,99 € (sonst 104,99 €) · Colorime3ka 14,99 € (sonst 17,99 €) · Fotograme3ka 3D 29,99 € (sonst 34,99 €) · alle drei im Bundle 119,99 €'
  };

  function v(r) { var t = Date.now(); return t >= Date.parse(r[0]) && t < Date.parse(r[1]); }
  var q = location.search;
  var bf = BF_ZAPNUTE && v(BF), hw = v(HW);
  if (/[?&]bf=1/.test(q)) { bf = true; hw = false; }
  if (/[?&]hw=1/.test(q)) { hw = true; bf = false; }
  if (/[?&]bf=0/.test(q)) bf = false;

  var el = document.querySelectorAll('[data-bf],[data-hw]');
  for (var i = 0; i < el.length; i++) {
    var b = el[i].getAttribute('data-bf'), h = el[i].getAttribute('data-hw');
    var skry = (b !== null && (b === 'on') !== bf) || (h !== null && (h === 'on') !== hw);
    el[i].hidden = skry; el[i].style.display = skry ? 'none' : '';
  }

  if (bf && !document.getElementById('bf-pas')) {
    var lang = (document.documentElement.lang || 'sk').slice(0, 2);
    var a = document.createElement('a');
    a.id = 'bf-pas';
    a.href = ODKAZ.indexOf('{{') === 0 ? '/#bundle' : ODKAZ;
    if (a.href.indexOf('apps.apple.com') > 0) { a.target = '_blank'; a.rel = 'noopener'; }
    a.textContent = PAS[lang] || PAS.en;
    a.style.cssText = 'display:block;position:relative;z-index:60;padding:10px 18px;text-align:center;font:600 14px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;' +
      'color:#0a1524;text-decoration:none;background:linear-gradient(100deg,#5fe0cf 0%,#6fb8f0 38%,#9c93f5 70%,#d6a8ee 100%)';
    document.body.insertBefore(a, document.body.firstChild);
  }
})();
