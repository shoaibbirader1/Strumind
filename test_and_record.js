const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function recordStruMindDemo() {
  console.log('🎬 Starting StruMind Demo Recording...');
  
  // Launch browser with video recording
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const context = await browser.newContext({
    recordVideo: {
      dir: './recordings/',
      size: { width: 1920, height: 1080 }
    },
    viewport: { width: 1920, height: 1080 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log('📱 Starting demo workflow...');
    
    // Step 1: Navigate to landing page
    console.log('1. 🏠 Navigating to landing page...');
    await page.goto('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev');
    await page.waitForTimeout(3000);
    
    // Step 2: Register new user
    console.log('2. 📝 Testing user registration...');
    await page.click('text=Sign Up');
    await page.waitForTimeout(2000);
    
    const timestamp = Date.now();
    const testEmail = `demo.user.${timestamp}@strumind.com`;
    
    await page.fill('input[type="text"]', 'Demo User');
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="password"]', 'SecurePassword123!');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
    
    // Step 3: Navigate to dashboard
    console.log('3. 📊 Accessing dashboard...');
    await page.waitForSelector('text=Dashboard', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // Step 4: Create new project
    console.log('4. 🏗️ Creating new project...');
    await page.click('text=New Project');
    await page.waitForTimeout(2000);
    
    await page.fill('input[placeholder*="name"]', 'Demo Skyscraper Project');
    await page.fill('textarea', 'A 50-story mixed-use skyscraper with steel and concrete composite structure featuring advanced seismic design for urban environment.');
    await page.selectOption('select', 'commercial');
    await page.fill('input[placeholder*="location"]', 'San Francisco, CA');
    await page.fill('input[placeholder*="client"]', 'Future City Developments');
    
    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);
    
    // Step 5: Explore project tabs
    console.log('5. 🔍 Exploring project features...');
    
    // Overview tab
    await page.click('text=Overview');
    await page.waitForTimeout(2000);
    
    // Modeling tab
    await page.click('text=Modeling');
    await page.waitForTimeout(3000);
    
    // Try to interact with 3D viewer
    try {
      await page.click('text=Launch Model Editor');
      await page.waitForTimeout(2000);
    } catch (e) {
      console.log('Model editor not fully implemented yet');
    }
    
    // Analysis tab
    await page.click('text=Analysis');
    await page.waitForTimeout(3000);
    
    // Design tab
    await page.click('text=Design');
    await page.waitForTimeout(3000);
    
    // Reports tab
    await page.click('text=Reports');
    await page.waitForTimeout(3000);
    
    // Step 6: Test navigation
    console.log('6. 🧭 Testing navigation...');
    await page.click('text=Back');
    await page.waitForTimeout(2000);
    
    // Return to dashboard
    await page.goto('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev/dashboard');
    await page.waitForTimeout(3000);
    
    // Step 7: Create another project to show multiple projects
    console.log('7. 🏢 Creating second project...');
    await page.click('text=New Project');
    await page.waitForTimeout(2000);
    
    await page.fill('input[placeholder*="name"]', 'Bridge Infrastructure Project');
    await page.fill('textarea', 'A cable-stayed bridge spanning 2km with advanced wind resistance design and seismic isolation systems.');
    await page.selectOption('select', 'infrastructure');
    await page.fill('input[placeholder*="location"]', 'Golden Gate, CA');
    await page.fill('input[placeholder*="client"]', 'State Transportation Authority');
    
    await page.click('button[type="submit"]');
    await page.waitForTimeout(4000);
    
    // Step 8: Final dashboard view
    console.log('8. 📈 Final dashboard overview...');
    await page.goto('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev/dashboard');
    await page.waitForTimeout(5000);
    
    console.log('✅ Demo recording completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during demo recording:', error);
  } finally {
    await context.close();
    await browser.close();
    
    // Move and rename the video file
    const recordingsDir = './recordings';
    if (fs.existsSync(recordingsDir)) {
      const files = fs.readdirSync(recordingsDir);
      const videoFile = files.find(file => file.endsWith('.webm'));
      
      if (videoFile) {
        const oldPath = path.join(recordingsDir, videoFile);
        const newPath = './strumind_demo_complete.webm';
        fs.renameSync(oldPath, newPath);
        console.log(`🎥 Video saved as: ${newPath}`);
      }
    }
  }
}

// Run the demo
recordStruMindDemo().catch(console.error);