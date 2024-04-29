import {test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async({page}) =>{
    await page.goto('https://ultimateqa.com/complicated-page/')
})

test('Complete random stuff and Submit', async({page}) =>{
    const pm = new PageManager(page)
    await pm.onPracticeForm().submitFormComplete('Diego','test@test.com','message')
})

test('Verify toogle message', async({page}) =>{
    const pm = new PageManager(page)
    await pm.onPracticeForm().verifyToggleMessage()
})

test('Verify toogle message on menu', async({page}) =>{
    const pm = new PageManager(page)
    await pm.onPracticeForm().verifyContentMenuHidingOption()
})