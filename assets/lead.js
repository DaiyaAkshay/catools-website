// Shared download flow for catool.co.in.
//
// Any element with data-download="catool" | "docward" | "tallydrop" opens the download form
// (_layout/lead-modal.html). After the form is sent to /api/lead the file downloads. A visitor who
// has filled the form once isn't asked again on this browser for 180 days.
// Links keep a real href to the file, so downloads still work if this script doesn't load.
//
// Optional fill-ins, updated with the latest release:
//   <span data-dl-version="catool"></span>                    → "v0.9.11"
//   <span data-dl-size="catool"></span>                       → "72 MB"
//   <span data-dl-text="catool" data-format="Download CAtool {version}"></span>
(function () {
  'use strict';

  var APPS = {
    catool: {
      name: 'CAtool',
      source: 'download', // lead records before 2026-09 used this value; kept for continuity
      fallback: 'https://github.com/DaiyaAkshay/catool-releases/releases/latest/download/CAtool-Setup.exe',
      github: { repo: 'DaiyaAkshay/catool-releases', asset: /^CAtool-Setup-\d.*\.exe$/i },
    },
    docward: {
      name: 'Docward',
      source: 'docward',
      fallback: 'https://github.com/DaiyaAkshay/docward-releases/releases/latest/download/Docward-Setup.exe',
      github: { repo: 'DaiyaAkshay/docward-releases', asset: /^Docward-Setup\.exe$/i },
    },
    tallydrop: {
      name: 'TallyDrop',
      source: 'tallydrop',
      fallback: '/tallydrop/TallyDrop.exe',
      versionJson: '/tallydrop/version.json',
    },
  };
  var REMEMBER_KEY = 'catool_lead_at';
  var REMEMBER_DAYS = 180;

  var releases = {}; // app key -> Promise<{ url, version, sizeMb }>

  function resolve(key) {
    if (releases[key]) return releases[key];
    var app = APPS[key];
    var result = { url: app.fallback, version: '', sizeMb: null };
    var p;
    if (app.versionJson) {
      p = fetch(app.versionJson, { cache: 'no-cache' })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (v) {
          if (v && v.download) result.url = v.download;
          if (v && v.latest) result.version = v.latest;
          return result;
        });
    } else {
      p = fetch('https://api.github.com/repos/' + app.github.repo + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          if (!d) return result;
          var assets = d.assets || [];
          var exe = assets.find(function (a) { return app.github.asset.test(a.name); })
            || assets.find(function (a) { return /\.exe$/i.test(a.name); });
          if (exe) {
            result.url = exe.browser_download_url;
            result.sizeMb = Math.round(exe.size / 1048576);
          }
          result.version = d.tag_name || '';
          return result;
        });
    }
    releases[key] = p.catch(function () { return result; });
    return releases[key];
  }

  function fillIns(key, rel) {
    document.querySelectorAll('[data-dl-version="' + key + '"]').forEach(function (el) {
      if (rel.version) el.textContent = rel.version;
    });
    document.querySelectorAll('[data-dl-size="' + key + '"]').forEach(function (el) {
      if (rel.sizeMb) el.textContent = rel.sizeMb + ' MB';
    });
    document.querySelectorAll('[data-dl-text="' + key + '"]').forEach(function (el) {
      if (rel.version) el.textContent = (el.getAttribute('data-format') || '').replace('{version}', rel.version);
    });
  }

  function remembered() {
    try {
      var t = Number(localStorage.getItem(REMEMBER_KEY) || 0);
      return t && Date.now() - t < REMEMBER_DAYS * 86400000;
    } catch (e) { return false; }
  }

  function remember() {
    try { localStorage.setItem(REMEMBER_KEY, String(Date.now())); } catch (e) { /* private mode */ }
  }

  function startDownload(key) {
    resolve(key).then(function (rel) {
      var a = document.createElement('a');
      a.href = rel.url;
      if (rel.url.charAt(0) === '/') a.download = rel.url.split('/').pop();
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  }

  var backdrop, form, errEl, current;

  function openForm(key) {
    current = key;
    var name = APPS[key].name;
    document.getElementById('lead-h').textContent = 'Almost there — where should we send ' + name + ' updates?';
    document.getElementById('lead-submit-text').textContent = 'Download ' + name;
    errEl.hidden = true;
    backdrop.hidden = false;
    document.getElementById('lead-name').focus();
  }

  function closeForm() { backdrop.hidden = true; }

  function init() {
    backdrop = document.getElementById('lead-backdrop');
    form = document.getElementById('lead-form');
    errEl = document.getElementById('lead-err');
    if (!backdrop || !form) return;

    var keys = {};
    document.querySelectorAll('[data-download]').forEach(function (el) {
      var key = el.getAttribute('data-download');
      if (!APPS[key]) return;
      keys[key] = true;
      el.addEventListener('click', function (e) {
        e.preventDefault();
        if (remembered()) startDownload(key);
        else openForm(key);
      });
    });
    Object.keys(keys).forEach(function (key) { resolve(key).then(function (rel) { fillIns(key, rel); }); });

    document.getElementById('lead-close').addEventListener('click', closeForm);
    backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeForm(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !backdrop.hidden) closeForm(); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      errEl.hidden = true;
      var name = document.getElementById('lead-name').value.trim();
      var email = document.getElementById('lead-email').value.trim();
      var phone = document.getElementById('lead-phone').value.trim();
      var consent = document.getElementById('lead-consent').checked;
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { errEl.textContent = 'Please enter a valid email.'; errEl.hidden = false; return; }
      if (phone.replace(/\D/g, '').length < 10) { errEl.textContent = 'Please enter a valid 10-digit mobile number.'; errEl.hidden = false; return; }

      var key = current;
      var submit = document.getElementById('lead-submit');
      submit.disabled = true;
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ name: name, email: email, phone: phone, consent: consent, source: APPS[key].source }),
      })
        .then(function (r) { return r.json().catch(function () { return { ok: true }; }); })
        .then(function (j) {
          if (j && j.ok === false) { errEl.textContent = j.error || 'Something went wrong — please try again.'; errEl.hidden = false; return; }
          remember();
          closeForm();
          startDownload(key);
        })
        .catch(function () {
          // Network or API down: don't trap the visitor, let the download proceed.
          closeForm();
          startDownload(key);
        })
        .finally(function () { submit.disabled = false; });
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
