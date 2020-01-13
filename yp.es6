let puppeteer = require('puppeteer'),
	Iconv = require('iconv').Iconv,
	openUrl = require('./lib/openUrl'),
	getHtmlDom = require('./lib/getHtmlDom'),
	aClick = require('./lib/aClick');


let page = {
	url:'http://app1.sfda.gov.cn/datasearchcnda/face3/dir.html?type=yp',
	browser:null,       //浏览器对象
	page:null,          //页面对象
	pageChangeInput:null,   //页面跳转输入框对象
	pageChangeBtn:null,     //页面跳转按钮
	async init(){
		//打开类别页面
		await this.openTypePage();
		console.log('打开类别列表页面');
		//打开列表页面
		await this.openListPage();
		console.log('打开数据列表页面');

		//获取列表页面数据信息
		let info = await this.getPageInfo();
		console.log(info);

		//跳转到数据页面1
		let data = await this.getPageData('2');
		// console.log(data)

	},
	//打开类别页面
	async openTypePage(){
		let {browser,page} = await openUrl(this.url);
		this.browser = browser;
		this.page = page;

	},
	//打开列表页面
	async openListPage(){
		await this.page.waitFor('.new_datafont1');

		let dom = await this.page.$$('.new_datafont1 a'),
			nowPage = null;

		for(let i=0,l=dom.length;i<l;i++){
			let text = await getHtmlDom.text(this.page,dom[i]);
			text = text.split('(')[0];

			if(text == '国产药品'){
				nowPage = await aClick.go(this.browser,dom[i]);
				break;
			}
		}

		this.page = nowPage;
	},
	//获取页面数据总数等信息
	async getPageInfo(){
		let input = await this.page.$('#goInt'),
			td = await input.getProperty('parentElement'),
			tr = await td.getProperty('parentElement'),
			tr1 = await tr.getProperty('firstChild'),
			info = await tr1.getProperty('innerText'),
			trEnd = await tr.getProperty('lastChild'),
			content = await this.page.$('#content'),
			btn = await trEnd.$('input');

		info = await info.jsonValue();

		this.pageChangeInput = input;
		this.pageChangeBtn = btn;
		this.contentDom = content;
		return info;
	},
	//跳转页面并获取ajax的数据
	async getPageData(number){
		// return new Promise(async success=>{
			this.page.on('response',async function(response){
				let body = await response.text();

				// body = new Iconv('UTF-8', 'UTF-8//IGNORE//TRANSLIT')
				// 			.convert(body)
				// 			.toString();


				console.log(body);
			});

			//输入框输入
			await this.pageChangeInput.type(number,{delay:500});
			//点击跳转按钮
			await this.pageChangeBtn.click();

			// await this.page.waitForNavigation();

			// setTimeout(async ()=>{
			// 	let html = await this.contentDom.getProperty('outerHTML');
			// 	html = await html.jsonValue();
			// 	// console.log(html)
			// },2000)


		// });
	}

};


page.init().then(rs=>{console.log('全部完成')}).catch(e=>{console.log(e)});

