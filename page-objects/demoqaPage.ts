import { Page, expect, Locator } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DemoQAPage extends HelperBase{
    
    constructor(page: Page){
        super(page)
    }
   
    async submitFormComplete(name:string, email: string, message: string){
        const form = this.page.locator('#et_pb_contact_form_0')
        await form.getByPlaceholder('Name').fill(name)
        await form.getByPlaceholder('Email Address').fill(email)
        await form.getByPlaceholder('Message').fill(message)

        const result = await this.getResult()
        await form.locator("input[name='et_pb_contact_captcha_0']").fill(result)
        await form.locator("button[type='submit']").click()

        // Wait for the message to appear
        await this.page.waitForSelector('.et-pb-contact-message p', { timeout: 6000 });

        // Validate the message "Thanks for contacting us"
        const messageElement = await form.locator('.et-pb-contact-message p').first();
        const messageText = await messageElement.textContent();
        expect(messageText).toContain('Thanks for contacting us');
    }

    async verifyToggleMessage(){
        await this.page.locator('#A_toggle').click();
        await this.page.waitForSelector('div.et_pb_toggle_content');
        // Find the toggle message element
        const toggleMessageElement = await this.page.locator('div.et_pb_toggle_content');
        // Get the text content of the toggle message
        const toggleMessageText = await toggleMessageElement.textContent();
        // Validate the toggle message
        expect(toggleMessageText).toContain('Inside of toggle');
    }
    
    async verifyContentMenuHidingOption() {
        // Locate the toggle label element
        const toggleLabel = await this.page.locator('.lwptoc_toggle_label').first();
    
        // Click on the toggle label to hide the content menu
        await toggleLabel.click();
    
        // Wait for the toggle label text to change
        await this.page.waitForFunction(() => {
            const label = document.querySelector('.lwptoc_toggle_label');
            return label && label.textContent && label.textContent.trim() === 'show';
        });
        
        // Validate that the toggle label now says "show"
        const toggleLabelText = await toggleLabel.textContent();
        expect(toggleLabelText).toContain('show');
    }
    

    async getResult(): Promise<string> {
        return new Promise<string>((resolve) => {
            setTimeout(async () => {
                // Extract the text content of the captcha question 
                const captchaQuestion = (await this.page.locator('#et_pb_contact_form_0 > div.et_pb_contact > form > div > div > p > span').textContent()) || '';
                
                // Trim any leading or trailing white spaces
                const trimmedCaptchaQuestion = captchaQuestion.trim();
                
                // Parse and evaluate the operation (assuming the operation is a simple arithmetic expression)
                const result = eval(trimmedCaptchaQuestion); // Note: Using eval here, ensure the input is safe
                
                // Resolve the Promise with the result
                resolve(result.toString()); // Convert the result to a string before resolving
            }, 1000); 
        });
    }
}