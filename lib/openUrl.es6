
let puppeteer = require('puppeteer');

module.exports = function(url){
	return new Promise(success=>{
		puppeteer.launch({
			headless:true,
			devtools:false,
			ignoreHTTPSErrors:true,
			defaultViewport:{
				width:1920,
				height:1020
			}
		}).then(async browser => {
			const page = await browser.newPage();

			await Promise.all([
				page.waitForNavigation(), // The promise resolves after navigation has finished
				page.goto(url) // 点击该链接将间接导致导航(跳转)
			]);

			success({browser,page});
		}).catch(e=>{console.log(e)});

	});
};