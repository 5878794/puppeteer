
let puppeteer = require('puppeteer');


module.exports = function(url){
	return new Promise(success=>{
		puppeteer.launch().then(async browser => {
			const page = await browser.newPage();
			await page.goto(url);

			await page.waitForNavigation();   //等待页面加载完成

			success({browser,page});
		});
	});
};