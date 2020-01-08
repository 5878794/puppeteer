
//a元素点击打开页面，并返回新的page对象

let fn = Symbol();

module.exports = {
	[fn](browser,obj,type){
		return new Promise(async success=>{
			let fn = async function(target){
				let newPage = await target.page();
				await newPage.waitForNavigation();

				success(newPage);
			};

			if(type){
				browser.once('targetcreated',fn);
			}else{
				browser.once('targetchanged',fn);
			}

			await obj.click();
		});
	},
	open(browser,obj){
		return this[fn](browser,obj,true);
	},
	go(browser,obj){
		return this[fn](browser,obj);
	}

};

