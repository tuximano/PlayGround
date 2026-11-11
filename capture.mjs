import { mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'

const runtime = join(process.env.HOME, '.local/share/omgithub-playwright')
const require = createRequire(join(runtime, 'package.json'))
const { chromium } = require('playwright')
const config = JSON.parse(await (await import('node:fs/promises')).readFile(
  join(runtime, process.platform === 'darwin' ? 'metal.json' : 'linux.json'),
  'utf8',
))
if (process.platform === 'linux') {
  const { readFile } = await import('node:fs/promises')
  process.env.DISPLAY ||= `:${(await readFile(join(runtime, 'display'), 'utf8')).trim()}`
}

const url = process.env.CAPTURE_URL
const output = process.env.CAPTURE_DIR
if (!url || !output) throw new Error('Set CAPTURE_URL and CAPTURE_DIR.')
const target = new URL(url)
if (!['http:', 'https:'].includes(target.protocol)) throw new Error('CAPTURE_URL must be an HTTP(S) URL.')
mkdirSync(resolve(output), { recursive: true })

let browser
let exitCode = 0
const isTemporaryNavigationFailure = (error) => {
  const text = `${error?.name || ''} ${error?.message || ''}`
  return /timeout|net::|navigation|browser.*closed|target.*closed|connection.*closed/i.test(text)
}

try {
  try {
    browser = await chromium.launch({ ...config.browser.launchOptions, timeout: 30000 })
  } catch (error) {
    console.error('Browser launch failed:', error)
    exitCode = 75
    throw error
  }

  for (const [name, width, height] of [['desktop', 1280, 900], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
    const failures = []
    page.on('pageerror', (error) => failures.push(error.message))
    page.on('response', (response) => {
      if (response.status() >= 400 && new URL(response.url()).origin === target.origin) {
        failures.push(`HTTP ${response.status()}: ${response.url()}`)
      }
    })

    let response
    try {
      response = await page.goto(url, { waitUntil: 'load', timeout: 60000 })
    } catch (error) {
      if (isTemporaryNavigationFailure(error)) exitCode = 75
      throw error
    }
    if (!response?.ok()) {
      const status = response?.status()
      exitCode = !response || [408, 429, 500, 502, 503, 504].includes(status) ? 75 : 1
      throw new Error(`HTTP ${status ?? 'no response'} loading ${url}`)
    }

    // The document body can legitimately have no intrinsic height while the game
    // uses fixed-position layers. Wait for the app's own boot signal and menu.
    try {
      await page.waitForFunction(() => window.TG_BOXING?.booted === true, { timeout: 60000 })
      await page.waitForFunction(() => {
        const screen = document.querySelector('#ui-root > *')
        const style = screen && getComputedStyle(screen)
        return !!screen && style.visibility !== 'hidden' && style.display !== 'none'
      }, { timeout: 15000 })
      await page.evaluate(() => document.fonts.ready)
    } catch (error) {
      throw new Error(`TG BOXING did not render on ${name}: ${error.message}`)
    }

    if (failures.length) throw new Error(`Render errors on ${name}: ${failures.join('; ')}`)
    await page.waitForTimeout(900)
    await page.screenshot({ path: join(resolve(output), `final-${name}.png`), fullPage: false, timeout: 30000 })
    console.log(`Captured ${name} (${width}x${height}) from ${url}`)
    await page.close()
  }
} catch (error) {
  console.error(error)
  if (!exitCode) exitCode = 1
} finally {
  try {
    await browser?.close()
  } catch (error) {
    console.error('Browser close failed:', error)
    if (!exitCode) exitCode = 75
  }
}
process.exitCode = exitCode
