

module.exports = {
	//id,class等获取
	attr(page,obj,type){
		return new Promise(async success=>{
			let text = await page.evaluate((htmlDom,type)=>{
				return htmlDom.getAttribute(type);
			},obj,type);
			success(text);
		});
	},
	html(page,obj){
		return new Promise(async success=>{
			let text = await page.evaluate(htmlDom=>{
				return htmlDom.outerHTML;
			},obj);
			success(text);
		});
	},
	text(page,obj){
		return new Promise(async success=>{
			let text = await page.evaluate(htmlDom=>{
				return htmlDom.innerText;
			},obj);
			success(text);
		});
	}
};