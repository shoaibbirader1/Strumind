#!/usr/bin/env python3
"""
StruMind Demo Recording Script
Records a complete walkthrough of the StruMind application
"""

import time
import cv2
import numpy as np
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
import threading
import subprocess
import os

class StruMindDemoRecorder:
    def __init__(self):
        self.driver = None
        self.recording = False
        self.video_writer = None
        
    def setup_driver(self):
        """Setup Chrome driver with appropriate options"""
        chrome_options = Options()
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')
        chrome_options.add_argument('--start-maximized')
        chrome_options.add_argument('--headless')  # Run in headless mode
        
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=chrome_options)
        self.driver.set_window_size(1920, 1080)
        
    def start_screen_recording(self):
        """Start screen recording using ffmpeg"""
        cmd = [
            'ffmpeg', '-y',
            '-f', 'x11grab',
            '-s', '1920x1080',
            '-r', '30',
            '-i', ':0.0',
            '-c:v', 'libx264',
            '-preset', 'fast',
            '-crf', '23',
            'strumind_demo.mp4'
        ]
        
        try:
            self.recording_process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            print("🎬 Screen recording started...")
            return True
        except Exception as e:
            print(f"❌ Failed to start screen recording: {e}")
            return False
    
    def stop_screen_recording(self):
        """Stop screen recording"""
        if hasattr(self, 'recording_process'):
            self.recording_process.terminate()
            self.recording_process.wait()
            print("🎬 Screen recording stopped")
    
    def wait_and_click(self, selector, timeout=10, by=By.CSS_SELECTOR):
        """Wait for element and click it"""
        try:
            element = WebDriverWait(self.driver, timeout).until(
                EC.element_to_be_clickable((by, selector))
            )
            time.sleep(0.5)  # Small delay for visual effect
            element.click()
            return True
        except Exception as e:
            print(f"❌ Failed to click {selector}: {e}")
            return False
    
    def wait_and_type(self, selector, text, timeout=10, by=By.CSS_SELECTOR):
        """Wait for element and type text"""
        try:
            element = WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((by, selector))
            )
            element.clear()
            time.sleep(0.3)
            element.send_keys(text)
            return True
        except Exception as e:
            print(f"❌ Failed to type in {selector}: {e}")
            return False
    
    def record_demo(self):
        """Record the complete StruMind demo"""
        try:
            print("🚀 Starting StruMind Demo Recording...")
            
            # Start screen recording
            if not self.start_screen_recording():
                print("❌ Could not start screen recording, continuing without it...")
            
            # Setup browser
            self.setup_driver()
            
            # Step 1: Navigate to landing page
            print("1. 🏠 Navigating to landing page...")
            self.driver.get('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev')
            time.sleep(3)
            
            # Step 2: Register new user
            print("2. 📝 Testing user registration...")
            self.wait_and_click('a[href="/auth/signup"]', by=By.CSS_SELECTOR)
            time.sleep(2)
            
            timestamp = int(time.time())
            test_email = f"demo.user.{timestamp}@strumind.com"
            
            self.wait_and_type('input[type="text"]', 'Demo User')
            time.sleep(0.5)
            self.wait_and_type('input[type="email"]', test_email)
            time.sleep(0.5)
            self.wait_and_type('input[type="password"]', 'SecurePassword123!')
            time.sleep(0.5)
            
            self.wait_and_click('button[type="submit"]')
            time.sleep(4)
            
            # Step 3: Navigate to dashboard
            print("3. 📊 Accessing dashboard...")
            try:
                WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Dashboard') or contains(text(), 'Projects')]"))
                )
                time.sleep(2)
            except:
                print("Dashboard not found, trying direct navigation...")
                self.driver.get('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev/dashboard')
                time.sleep(3)
            
            # Step 4: Create new project
            print("4. 🏗️ Creating new project...")
            self.wait_and_click('a[href*="new"]', by=By.CSS_SELECTOR)
            time.sleep(2)
            
            # Fill project form
            self.wait_and_type('input[placeholder*="name"], input[name="name"]', 'Demo Skyscraper Project')
            time.sleep(0.5)
            self.wait_and_type('textarea', 'A 50-story mixed-use skyscraper with steel and concrete composite structure featuring advanced seismic design for urban environment.')
            time.sleep(0.5)
            
            # Try to select project type
            try:
                select_element = self.driver.find_element(By.TAG_NAME, 'select')
                select = Select(select_element)
                select.select_by_value('commercial')
                time.sleep(0.5)
            except:
                print("Select element not found, continuing...")
            
            self.wait_and_type('input[placeholder*="location"], input[name="location"]', 'San Francisco, CA')
            time.sleep(0.5)
            self.wait_and_type('input[placeholder*="client"], input[name="client"]', 'Future City Developments')
            time.sleep(0.5)
            
            self.wait_and_click('button[type="submit"]')
            time.sleep(4)
            
            # Step 5: Explore project tabs
            print("5. 🔍 Exploring project features...")
            
            # Overview tab
            self.wait_and_click('button[role="tab"]:has-text("Overview"), [role="tab"]:has-text("Overview")', by=By.CSS_SELECTOR)
            time.sleep(2)
            
            # Modeling tab
            self.wait_and_click('button[role="tab"]:has-text("Modeling"), [role="tab"]:has-text("Modeling")', by=By.CSS_SELECTOR)
            time.sleep(3)
            
            # Analysis tab
            self.wait_and_click('button[role="tab"]:has-text("Analysis"), [role="tab"]:has-text("Analysis")', by=By.CSS_SELECTOR)
            time.sleep(3)
            
            # Design tab
            self.wait_and_click('button[role="tab"]:has-text("Design"), [role="tab"]:has-text("Design")', by=By.CSS_SELECTOR)
            time.sleep(3)
            
            # Reports tab
            self.wait_and_click('button[role="tab"]:has-text("Reports"), [role="tab"]:has-text("Reports")', by=By.CSS_SELECTOR)
            time.sleep(3)
            
            # Step 6: Return to dashboard
            print("6. 🧭 Returning to dashboard...")
            self.driver.get('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev/dashboard')
            time.sleep(3)
            
            # Step 7: Create another project
            print("7. 🏢 Creating second project...")
            self.wait_and_click('a[href*="new"]', by=By.CSS_SELECTOR)
            time.sleep(2)
            
            self.wait_and_type('input[placeholder*="name"], input[name="name"]', 'Bridge Infrastructure Project')
            time.sleep(0.5)
            self.wait_and_type('textarea', 'A cable-stayed bridge spanning 2km with advanced wind resistance design and seismic isolation systems.')
            time.sleep(0.5)
            
            try:
                select_element = self.driver.find_element(By.TAG_NAME, 'select')
                select = Select(select_element)
                select.select_by_value('infrastructure')
                time.sleep(0.5)
            except:
                pass
            
            self.wait_and_type('input[placeholder*="location"], input[name="location"]', 'Golden Gate, CA')
            time.sleep(0.5)
            self.wait_and_type('input[placeholder*="client"], input[name="client"]', 'State Transportation Authority')
            time.sleep(0.5)
            
            self.wait_and_click('button[type="submit"]')
            time.sleep(4)
            
            # Step 8: Final dashboard view
            print("8. 📈 Final dashboard overview...")
            self.driver.get('https://work-2-ybyztwqptjnnqisy.prod-runtime.all-hands.dev/dashboard')
            time.sleep(5)
            
            print("✅ Demo recording completed successfully!")
            
        except Exception as e:
            print(f"❌ Error during demo recording: {e}")
        finally:
            if self.driver:
                self.driver.quit()
            self.stop_screen_recording()
    
    def run(self):
        """Run the demo recording"""
        self.record_demo()

if __name__ == "__main__":
    recorder = StruMindDemoRecorder()
    recorder.run()