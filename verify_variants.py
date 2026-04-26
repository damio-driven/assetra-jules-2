from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Take dark screenshot
        page.goto("http://localhost:3000/assetra-dark/index.html")
        page.screenshot(path="dark_variant_v2.png", full_page=True)

        # Take light screenshot
        page.goto("http://localhost:3000/assetra-light/index.html")
        page.screenshot(path="light_variant_v2.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run()
