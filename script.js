
// Навигация: бургер-меню (простое раскрытие)
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const opened = nav.style.display === 'flex';
    nav.style.display = opened ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '12px';
  });
}

// Год в футере
document.getElementById('year').textContent = new Date().getFullYear();

// Аудиоплейлист
const audio = document.getElementById('audio');
const list = document.getElementById('audioList');
if (audio && list) {
  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-src]');
    if (!btn) return;
    const src = btn.getAttribute('data-src');
    // Обновить источник
    const source = audio.querySelector('source');
    source.setAttribute('src', src);
    audio.load();
    audio.play().catch(()=>{});
    // Активный трек
    list.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
  // По умолчанию активен первый
  const first = list.querySelector('button[data-src]');
  if (first) first.classList.add('active');
}

// Плавный скролл для якорей
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// Отправка формы через Ajax (Formspree)
const form = document.getElementById('orderForm');
const statusEl = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.textContent = 'Отправка...';

    const action = form.getAttribute('action');
    const formData = new FormData(form);

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.reset();
        statusEl.textContent = 'Спасибо! Заявка отправлена. Я свяжусь с вами в ближайшее время.';
      } else {
        const data = await res.json().catch(()=>null);
        statusEl.textContent = data?.errors?.[0]?.message || 'Ошибка отправки. Попробуйте позже или напишите в мессенджер.';
      }
    } catch (err) {
      statusEl.textContent = 'Сеть недоступна. Проверьте подключение и попробуйте снова.';
    }
  });
}
