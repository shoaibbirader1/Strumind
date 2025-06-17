const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function record5StoryBuildingDesign() {
    console.log('🎬 Starting 5-Story Building Design Recording...');
    
    const browser = await chromium.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-web-security',
            '--allow-running-insecure-content',
            '--disable-features=VizDisplayCompositor'
        ]
    });

    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        recordVideo: {
            dir: '/workspace/Strumind/videos/',
            size: { width: 1920, height: 1080 }
        }
    });

    const page = await context.newPage();

    try {
        console.log('📹 Recording started...');

        // Step 1: Navigate to the application
        console.log('Step 1: Loading StruMind Application...');
        await page.goto('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev');
        await page.waitForTimeout(3000);

        // Step 2: Navigate to signup
        console.log('Step 2: Going to signup page...');
        await page.click('text=Get Started');
        await page.waitForTimeout(2000);

        // Step 3: Register a new user for building design
        console.log('Step 3: Registering structural engineer user...');
        await page.fill('input[name="name"]', 'Dr. Sarah Chen');
        await page.fill('input[name="email"]', 'sarah.chen@structuraleng.com');
        await page.fill('input[name="password"]', 'SecurePass123!');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(3000);

        // Step 4: Navigate to dashboard
        console.log('Step 4: Accessing dashboard...');
        await page.waitForSelector('text=Dashboard', { timeout: 10000 });
        await page.waitForTimeout(2000);

        // Step 5: Create new 5-story building project
        console.log('Step 5: Creating 5-story building project...');
        await page.click('text=Create New Project');
        await page.waitForTimeout(2000);

        // Fill in detailed building information
        await page.fill('input[name="name"]', 'Metropolitan Office Tower - 5 Stories');
        await page.fill('textarea[name="description"]', 'Modern 5-story commercial office building with steel frame structure. Features: \n- Ground floor: Retail and lobby (4.5m height)\n- Floors 2-4: Office spaces (3.5m height each)\n- Floor 5: Executive offices and conference rooms (4.0m height)\n- Total building height: ~20 meters\n- Seismic design per latest codes\n- Wind load analysis included');
        
        // Select Commercial project type
        await page.selectOption('select[name="type"]', 'commercial');
        
        await page.fill('input[name="location"]', 'Downtown Seattle, WA');
        await page.fill('input[name="client"]', 'Metropolitan Development Corp');
        
        await page.waitForTimeout(2000);
        
        console.log('Step 6: Submitting project details...');
        await page.click('button[type="submit"]');
        await page.waitForTimeout(3000);

        // Step 7: Navigate to project overview
        console.log('Step 7: Viewing project overview...');
        await page.waitForSelector('text=Overview', { timeout: 10000 });
        await page.waitForTimeout(2000);

        // Step 8: Navigate to Modeling tab
        console.log('Step 8: Opening Modeling interface...');
        try {
            await page.click('text=Modeling', { timeout: 5000 });
            await page.waitForTimeout(3000);
        } catch (error) {
            console.log('Modeling tab not immediately available, continuing...');
        }

        // Step 9: Navigate to Analysis tab
        console.log('Step 9: Opening Analysis interface...');
        try {
            await page.click('text=Analysis', { timeout: 5000 });
            await page.waitForTimeout(3000);
        } catch (error) {
            console.log('Analysis tab not immediately available, continuing...');
        }

        // Step 10: Navigate to Design tab
        console.log('Step 10: Opening Design interface...');
        try {
            await page.click('text=Design', { timeout: 5000 });
            await page.waitForTimeout(3000);
        } catch (error) {
            console.log('Design tab not immediately available, continuing...');
        }

        // Step 11: Navigate to Reports tab
        console.log('Step 11: Opening Reports interface...');
        try {
            await page.click('text=Reports', { timeout: 5000 });
            await page.waitForTimeout(3000);
        } catch (error) {
            console.log('Reports tab not immediately available, continuing...');
        }

        // Step 12: Return to Overview and demonstrate project management
        console.log('Step 12: Returning to project overview...');
        await page.click('text=Overview');
        await page.waitForTimeout(2000);

        // Step 13: Show project details and capabilities
        console.log('Step 13: Demonstrating project capabilities...');
        await page.waitForTimeout(3000);

        // Step 14: Navigate back to dashboard to show project in list
        console.log('Step 14: Returning to dashboard...');
        await page.click('text=Dashboard');
        await page.waitForTimeout(3000);

        // Step 15: Final demonstration of the created building project
        console.log('Step 15: Final project demonstration...');
        await page.waitForTimeout(3000);

        console.log('✅ 5-Story Building Design Recording Complete!');
        
    } catch (error) {
        console.error('❌ Error during recording:', error);
    } finally {
        await context.close();
        await browser.close();
        
        // Move and rename the video file
        const videoDir = '/workspace/Strumind/videos/';
        const files = fs.readdirSync(videoDir);
        const videoFile = files.find(file => file.endsWith('.webm'));
        
        if (videoFile) {
            const oldPath = path.join(videoDir, videoFile);
            const newPath = '/workspace/Strumind/5_story_building_design_demo.webm';
            fs.renameSync(oldPath, newPath);
            console.log(`📹 Video saved as: 5_story_building_design_demo.webm`);
        }
    }
}

// Create videos directory if it doesn't exist
if (!fs.existsSync('/workspace/Strumind/videos/')) {
    fs.mkdirSync('/workspace/Strumind/videos/');
}

record5StoryBuildingDesign().catch(console.error);