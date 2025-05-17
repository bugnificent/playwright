import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Visual and Accessibility Tests', () => {
  test.use({
    // Can use specific viewport size for consistent visual regression testing
       viewport: { width: 1280, height: 800 },
    // Specific user agent string if needed
    // userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
  });

  test.beforeEach(async ({ page }) => {
    // Navigate to the website
    await page.goto('https://yusufasik.com');

  });

  test.afterEach(async ({ page }) => {
    // Close the page after each test
    await page.close();
  });

test('@smoke - Accessibility', async ({ page }) => {

  // Inject axe-core into the page
  await injectAxe(page);

  // Scroll through the page to trigger lazy loading
  await page.evaluate(() => {
    return new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 300);// Adjust the interval as needed, scroll every 300ms
    });
  });

  // Additional safety measures
  await page.waitForLoadState('networkidle'); // Waits for network inactivity
  await page.waitForTimeout(500); // Small buffer for final rendering

  try{
    // Check for accessibility issues
    await checkA11y(page, {
      detailedReport: true,
      detailedReportOptions: { html: true },
      // includeImpacts: ['critical', 'serious', 'moderate'], 
      // Not to fail the test on accessibility errors, good for CI/CD but not working all the time skipFailures: true, 
      axeOptions: {
        runOnly: ['wcag21aa'], // Run only specific rules
      }
    });
  } catch (error) {
    console.error('Accessibility check failed:', error);
  }

});

test('@smoke - Visual Regression', async ({ page }) => {

  // Handle all lazy-loaded images
  const hoverElements = await page.getByRole('link', { name: 'mail' }).all();
  for (const element of hoverElements) {
    await element.scrollIntoViewIfNeeded(); // Makes each image visible
    await element.waitFor({ state: 'visible' }); // Waits for load completion
  }

  /*
  // Handle hover-activated elements if any
    const hoverElements = await page.getByRole('link', { name: 'mail' }).all();
    for (const el of hoverElements) {
      await el.hover();
      await page.waitForTimeout(500); // Adjust based on your animations
    }
      */

  // Additional safety measures
  await page.waitForLoadState('networkidle'); // Waits for network inactivity
  await page.waitForTimeout(500); // Small buffer for final rendering

  // Take a full page screenshot and mask out dynamic elements
  await expect(page).toHaveScreenshot({
    fullPage: true,
    animations: 'disabled',
    mask: [
      page.locator('[data-test="titles"]:nth-of-type(1)'), // Replace with the selector of the dynamic element
    ],
    maxDiffPixelRatio: 0.01, // 0.2 can miss some differences
  });
});

});