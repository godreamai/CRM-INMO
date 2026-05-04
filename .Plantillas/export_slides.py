"""
Exporta los slides de gdai-carousel.html como PNGs 1080x1080.
Uso: python export_slides.py
"""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

HTML_FILE = Path(__file__).parent / "gdai-carousel.html"
OUT_DIR   = Path(__file__).parent / "10-dias-sprint-real"

OUT_DIR.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 2200, "height": 1200})

    page.goto(f"file:///{HTML_FILE.as_posix()}")

    # Quitar el zoom de preview vía JS (más confiable que CSS injection)
    page.evaluate("""
        document.querySelectorAll('style').forEach(s => {
            s.textContent = s.textContent.replace(/zoom\\s*:\\s*[\\d.]+/g, 'zoom: 1');
        });
        document.body.style.zoom = '1';
    """)

    # Esperar que carguen las fuentes de Google
    page.wait_for_timeout(2500)

    slides = page.locator(".slide")
    total  = slides.count()
    print(f"Slides encontrados: {total}")

    for i in range(total):
        out_path = OUT_DIR / f"gdai-slide-{i+1:02d}.png"
        slides.nth(i).screenshot(path=str(out_path))
        print(f"  OK  slide {i+1:02d} - {out_path.name}")

    browser.close()

print(f"\nListo. {total} PNGs guardados en: {OUT_DIR}")
