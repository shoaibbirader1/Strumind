const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function capture5StoryBuildingDemo() {
    console.log('📸 Capturing 5-Story Building Design Demo...');
    
    const browser = await chromium.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-web-security',
            '--allow-running-insecure-content'
        ]
    });

    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });

    const page = await context.newPage();

    try {
        console.log('Step 1: Loading StruMind Application...');
        await page.goto('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev');
        await page.waitForTimeout(3000);
        await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/01_landing_page.png', fullPage: true });

        console.log('Step 2: Going to signup page...');
        try {
            await page.click('text=Get Started', { timeout: 5000 });
            await page.waitForTimeout(2000);
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/02_signup_page.png', fullPage: true });
        } catch (error) {
            console.log('Get Started button not found, trying direct navigation...');
            await page.goto('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev/auth/signup');
            await page.waitForTimeout(2000);
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/02_signup_page.png', fullPage: true });
        }

        console.log('Step 3: Registering structural engineer user...');
        try {
            await page.fill('input[name="name"]', 'Dr. Sarah Chen - Structural Engineer');
            await page.fill('input[name="email"]', 'sarah.chen@structuraleng.com');
            await page.fill('input[name="password"]', 'SecurePass123!');
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/03_signup_filled.png', fullPage: true });
            
            await page.click('button[type="submit"]');
            await page.waitForTimeout(3000);
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/04_after_signup.png', fullPage: true });
        } catch (error) {
            console.log('Signup form not available, continuing...');
        }

        console.log('Step 4: Accessing dashboard...');
        try {
            await page.goto('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev/dashboard');
            await page.waitForTimeout(3000);
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/05_dashboard.png', fullPage: true });
        } catch (error) {
            console.log('Dashboard not accessible, continuing...');
        }

        console.log('Step 5: Creating 5-story building project...');
        try {
            await page.click('text=Create New Project', { timeout: 5000 });
            await page.waitForTimeout(2000);
            
            // Fill in detailed building information
            await page.fill('input[name="name"]', 'Metropolitan Office Tower - 5 Stories');
            await page.fill('textarea[name="description"]', 'Modern 5-story commercial office building with steel frame structure. Features:\n- Ground floor: Retail and lobby (4.5m height)\n- Floors 2-4: Office spaces (3.5m height each)\n- Floor 5: Executive offices and conference rooms (4.0m height)\n- Total building height: ~20 meters\n- Seismic design per latest codes\n- Wind load analysis included');
            await page.selectOption('select[name="type"]', 'commercial');
            await page.fill('input[name="location"]', 'Downtown Seattle, WA');
            await page.fill('input[name="client"]', 'Metropolitan Development Corp');
            
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/06_project_form_filled.png', fullPage: true });
            
            await page.click('button[type="submit"]');
            await page.waitForTimeout(3000);
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/07_project_created.png', fullPage: true });
        } catch (error) {
            console.log('Project creation form not available, continuing...');
        }

        console.log('Step 6: Viewing project overview...');
        try {
            await page.waitForSelector('text=Overview', { timeout: 10000 });
            await page.waitForTimeout(2000);
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/08_project_overview.png', fullPage: true });
        } catch (error) {
            console.log('Project overview not available, continuing...');
        }

        console.log('Step 7: Opening 5-Story Building Modeling interface...');
        try {
            await page.click('text=Modeling', { timeout: 5000 });
            await page.waitForTimeout(3000);
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/09_modeling_interface.png', fullPage: true });
        } catch (error) {
            console.log('Modeling tab not available, continuing...');
        }

        console.log('Step 8: Opening Analysis interface with building-specific results...');
        try {
            await page.click('text=Analysis', { timeout: 5000 });
            await page.waitForTimeout(3000);
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/10_analysis_interface.png', fullPage: true });
        } catch (error) {
            console.log('Analysis tab not available, continuing...');
        }

        console.log('Step 9: Opening Design interface...');
        try {
            await page.click('text=Design', { timeout: 5000 });
            await page.waitForTimeout(3000);
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/11_design_interface.png', fullPage: true });
        } catch (error) {
            console.log('Design tab not available, continuing...');
        }

        console.log('Step 10: Opening Reports interface...');
        try {
            await page.click('text=Reports', { timeout: 5000 });
            await page.waitForTimeout(3000);
            await page.screenshot({ path: '/workspace/Strumind/building_demo_screenshots/12_reports_interface.png', fullPage: true });
        } catch (error) {
            console.log('Reports tab not available, continuing...');
        }

        console.log('✅ 5-Story Building Design Demo Screenshots Complete!');
        
    } catch (error) {
        console.error('❌ Error during capture:', error);
    } finally {
        await context.close();
        await browser.close();
    }
}

// Create screenshots directory if it doesn't exist
if (!fs.existsSync('/workspace/Strumind/building_demo_screenshots/')) {
    fs.mkdirSync('/workspace/Strumind/building_demo_screenshots/');
}

capture5StoryBuildingDemo().catch(console.error);