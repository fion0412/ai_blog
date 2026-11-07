(() => {
  const sidebar = document.getElementById('sidebar');
  const menuButton = document.getElementById('menuButton');
  const backdrop = document.getElementById('sidebarBackdrop');
  const closeButton = document.getElementById('sidebarClose');
  const sideNav = document.getElementById('sideNav');

  function syncMenu() {
    const open = sidebar.classList.contains('open') && window.innerWidth <= 980;
    backdrop.hidden = !open;
    document.body.classList.toggle('sidebar-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '关闭分类菜单' : '打开分类菜单');
  }

  function closeMenu(restoreFocus = false) {
    sidebar.classList.remove('open');
    syncMenu();
    if (restoreFocus) menuButton.focus();
  }

  // app.js owns the menu toggle and navigation; these handlers keep the
  // backdrop and scroll state in step with that existing behaviour.
  menuButton.addEventListener('click', syncMenu);
  sideNav.addEventListener('click', syncMenu);
  backdrop.addEventListener('click', () => closeMenu());
  closeButton.addEventListener('click', () => closeMenu(true));
  sidebar.querySelector('.brand').addEventListener('click', () => closeMenu());
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && sidebar.classList.contains('open')) closeMenu(true);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMenu();
  });
  syncMenu();

  // There is no newsletter backend. Send an explicit request instead of
  // displaying the old demo-only success message.
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const email = document.getElementById('emailInput').value.trim();
    if (!email || !newsletterForm.reportValidity()) return;
    const message = `你好，我想订阅 Smartech AI Academy 的精选工具资讯。我的邮箱是 ${email}。请告诉我订阅方式。`;
    const url = `https://wa.me/85292989958?text=${encodeURIComponent(message)}`;
    document.getElementById('newsletterMessage').textContent = '已打开 WhatsApp；请发送预填消息完成订阅申请。';
    const popup = window.open(url, '_blank');
    if (popup) popup.opener = null;
    else window.location.href = url;
  }, {capture: true});
})();
