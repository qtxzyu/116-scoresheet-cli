// let buildMainMenuString = require("../lib/buildMainMenuString.js")
module.exports = main;
// class Student() {
	// constructor(name, stuid, nation, classid) {
		// this.name = name;
		// this.stuid = stuid;
		// this.nation = nation;
		// this.classid = classid;
	// }
// }
function main(num) {
	if (num == undefined) {
		console.log(buildMainMenuString());
	} else {
		console.log(getChildMenuString(num));
	}
}

function buildMainMenuString() {
	let mainMenuString = `1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）:`
	return mainMenuString;
}

function getChildMenuString(num) {
	let childMenuString;
	if (num == '1') {
		childMenuString = `请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：`
	}
	if (num == '2') {
		childMenuString = `请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`
	}
	return childMenuString;
}
