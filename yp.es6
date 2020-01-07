let puppeteer = require('puppeteer'),
	openUrl = require('./lib/openUrl'),
	getHtmlDom = require('./lib/getHtmlDom'),
	aClick = require('./lib/aClick');


(async function(){
	let {browser,page} = await openUrl('http://app1.sfda.gov.cn/datasearchcnda/face3/dir.html?type=yp');
	let listPage = null;



	let dom = await page.$$('.new_datafont1 a');
	for(let i=0,l=dom.length;i<l;i++){
		let text = await getHtmlDom.text(page,dom[i]);
		text = text.split('(')[0];

		if(text == '国产药品'){
			listPage = await aClick.go(browser,dom[i]);
			break;
		}
	}


	console.log(await listPage.content());



})();