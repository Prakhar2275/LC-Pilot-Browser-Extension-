// /*
//  * LC Pilot — background.js (Service Worker)


chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete') return

  const isLeetCodeProblem = tab.url && tab.url.match(/https:\/\/leetcode\.com\/problems\/.+/)
  if (!isLeetCodeProblem) return

  chrome.tabs.sendMessage(tabId, { type: 'INIT_SIDEBAR' }).catch(() => {
  })
})
