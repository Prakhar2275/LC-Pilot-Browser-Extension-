// LC Pilot — content.js
// by Prakhar Chauhan " prakharchauhanportfolio.netlify.app"
;(function () {
  'use strict'
  if (document.getElementById('lc-buddy-root')) return

  // ── DOM EXTRACTION ──────────────────────────────────────────────────────

  function waitForElement(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector)
      if (el) return resolve(el)
      const observer = new MutationObserver(() => {
        const found = document.querySelector(selector)
        if (found) { observer.disconnect(); resolve(found) }
      })
      observer.observe(document.body, { childList: true, subtree: true })
      setTimeout(() => { observer.disconnect(); reject() }, timeout)
    })
  }

  async function extractProblemData() {
    try {
      // Title
      const titleEl =
        document.querySelector('[data-cy="question-title"]') ||
        document.querySelector('.text-title-large') ||
        document.querySelector('h4[class*="title"]')

      // exact selector from DOM inspector
      const descEl =
        document.querySelector('[data-track-load="description_content"]') ||
        document.querySelector('[class*="HTMLContent_html"]') ||
        document.querySelector('.elfjS')

      return {
        title: titleEl ? titleEl.innerText.trim() : 'Unknown Problem',
        description: descEl ? descEl.innerText.trim().slice(0, 3000) : ''
      }
    } catch { return { title: 'Unknown Problem', description: '' } }
  }

  function getMonacoCode() {
    try {
      if (window.monaco?.editor) {
        const models = window.monaco.editor.getModels()
        if (models?.length > 0) return models[0].getValue()
      }
    } catch {}

    // MDOM fallback  view-lines.monaco-mouse-cursor-text " from DOM inspector"
    try {
      const viewLines = document.querySelector('div.view-lines.monaco-mouse-cursor-text')
      if (viewLines) {
        return Array.from(viewLines.querySelectorAll('.view-line'))
          .map(l => l.innerText)
          .join('\n')
      }
    } catch {}

    return ''
  }

  // ── INJECT STYLES ───────────────────────────────────────────────────────

  const style = document.createElement('style')
  style.textContent = `
    #lc-buddy-root * { box-sizing: border-box; }

    #lc-buddy-fab {
      position: fixed;
      bottom: 28px;
      right: 28px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #ffa116;
      border: none;
      cursor: pointer;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(255,161,22,0.45);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      font-size: 22px;
      color: #fff;
    }
    #lc-buddy-fab:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 28px rgba(255,161,22,0.6);
    }
    #lc-buddy-fab:active { transform: scale(0.95); }

    #lc-buddy-badge {
      position: absolute;
      top: -3px;
      right: -3px;
      background: #00b8a3;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      font-family: -apple-system, sans-serif;
      min-width: 18px;
      height: 18px;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      border: 2px solid #1a1a1a;
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.2s, transform 0.2s;
    }
    #lc-buddy-badge.visible {
      opacity: 1;
      transform: scale(1);
    }

    #lc-buddy-panel {
      position: fixed;
      bottom: 92px;
      right: 28px;
      width: 360px;
      height: 560px;
      border-radius: 16px;
      overflow: hidden;
      z-index: 999998;
      border: 1px solid #3e3e3e;
      box-shadow: 0 16px 48px rgba(0,0,0,0.7);
      opacity: 0;
      transform: translateY(16px) scale(0.97);
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
      transform-origin: bottom right;
    }
    #lc-buddy-panel.open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    #lc-buddy-panel iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  `
  document.head.appendChild(style)

  // ── BUILD UI ─────────────────────────────────────────────────────────────

  const root = document.createElement('div')
  root.id = 'lc-buddy-root'

  // floating action button
  const fab = document.createElement('button')
  fab.id = 'lc-buddy-fab'
  fab.title = 'LC Buddy — your coding mentor'
  fab.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
    <span id="lc-buddy-badge">1</span>
  `

  // chat panel
  const panel = document.createElement('div')
  panel.id = 'lc-buddy-panel'

  const iframe = document.createElement('iframe')
  iframe.src = chrome.runtime.getURL('sidebar/index.html')
  iframe.allow = 'same-origin'
  panel.appendChild(iframe)

  root.appendChild(panel)
  root.appendChild(fab)
  document.body.appendChild(root)

  // ── TOGGLE LOGIC ─────────────────────────────────────────────────────────

  let isOpen = false
  const badge = document.getElementById('lc-buddy-badge')

  fab.addEventListener('click', () => {
    isOpen = !isOpen
    panel.classList.toggle('open', isOpen)
    // clear badge when opened - Prakhar Chauhan
    if (isOpen) {
      badge.classList.remove('visible')
      badge.textContent = '0'
    }
  })

  // close on outside click
  document.addEventListener('click', (e) => {
    if (isOpen && !root.contains(e.target)) {
      isOpen = false
      panel.classList.remove('open')
    }
  })

  // ── BRIDGE DATA TO IFRAME ────────────────────────────────────────────────

  let notifCount = 0

  function showBadge() {
    notifCount++
    badge.textContent = notifCount
    badge.classList.add('visible')
  }

  iframe.addEventListener('load', () => {
    // retry bridge until iframe window is ready "timing fix"
    let attempts = 0
    const tryBridge = () => {
      attempts++
      try {
        const win = iframe.contentWindow
        if (!win || !win.document || win.document.readyState !== 'complete') {
          if (attempts < 20) setTimeout(tryBridge, 200)
          return
        }
        win.__LC_BUDDY_PROBLEM__ = window.__LC_BUDDY_PROBLEM__
        win.__LC_BUDDY_CODE__ = getMonacoCode()
        setInterval(() => {
          try { iframe.contentWindow.__LC_BUDDY_CODE__ = getMonacoCode() } catch {}
        }, 2000)
      } catch (e) {
        if (attempts < 20) setTimeout(tryBridge, 200)
      }
    }
    setTimeout(tryBridge, 300)
  })

  // ── INIT ─────────────────────────────────────────────────────────────────

  async function init() {
    try {
      await waitForElement('[data-track-load="description_content"], [class*="HTMLContent_html"]')
    } catch {}
    const problem = await extractProblemData()
    window.__LC_BUDDY_PROBLEM__ = problem
    setTimeout(() => showBadge(), 2500)
  }

  // SPA navigation handling
  let lastUrl = location.href
  new MutationObserver(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href
      if (location.href.match(/https:\/\/leetcode\.com\/problems\/.+/)) {
        notifCount = 0
        setTimeout(init, 1500)
      }
    }
  }).observe(document, { subtree: true, childList: true })

  init()
})()
