import os
from playwright.sync_api import sync_playwright

def run_verification(page):
    # Load the index.html file
    path = os.path.abspath("index.html")
    page.goto(f"file://{path}")
    page.wait_for_timeout(1000)

    # 1. Verify Hero and scroll down
    page.screenshot(path="/home/jules/verification/screenshots/hero.png")

    # Scroll to About
    page.locator("#about").scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/about.png")

    # Scroll to Services
    page.locator("#services").scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    page.screenshot(path="/home/jules/verification/screenshots/services.png")

    # 2. Toggle Language
    page.click("#lang-switch")
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/lang_en.png")

    # 3. Cookie Banner interaction
    # Wait for banner to appear (it has a 1s delay in JS)
    page.wait_for_timeout(1500)
    page.screenshot(path="/home/jules/verification/screenshots/cookie_banner.png")
    page.click("#cookie-accept-all")
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/cookie_accepted.png")

    # 4. Contact Form
    page.locator("#contact").scroll_into_view_if_needed()
    page.fill("#name", "Jules")
    page.fill("#surname", "Engineer")
    page.fill("#email", "jules@example.com")
    page.select_option("#sector", "office")
    page.fill("#message", "Hello, this is a test message.")
    page.click(".checkbox-container", force=True)
    page.wait_for_timeout(500)
    page.screenshot(path="/home/jules/verification/screenshots/contact_filled.png")

    # Take final full page screenshot
    page.screenshot(path="/home/jules/verification/screenshots/verification.png", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            record_video_dir="/home/jules/verification/videos",
            viewport={'width': 1280, 'height': 800}
        )
        page = context.new_page()
        try:
            run_verification(page)
        finally:
            context.close()
            browser.close()
