// let buildMainMenuString = require("../lib/buildMainMenuString.js")

module.exports = main;
class Student {
	constructor(name, stuid, nation, classid, course1, score1, course2, score2, course3, score3, course4,score4) {
		this.name = name;
		this.stuid = stuid;
		this.nation = nation;
		this.classid = classid;
		this.course1 = course1;
		this.score1 = score1;
		this.course2 = course2;
		this.score2 = score2;
		this.course3 = course3;
		this.score3 = score3;
		this.course4 = course4;
		this.score4 = score4;
		
	}
}
function checkformat(inputString) {
	let inputArray = inputString.split(',');
	if(inputArray.length === 8) {
		inputArray = inputArray.slice(4);
		if (inputArray.length === 4) {
			let value = inputArray.find((item) => item.split(':').length !== 2);
			if(value === undefined) {
				return true;
			}
		}
	} 
	return false;
}
//定义一个数组用于存放student对象，然后再打印成绩的时候使用
function addStudentAchievement(inputString) {
	if (checkformat(inputString)) {
		let name = inputString.split(',')[0];
		return '学生'+ name + '的成绩被添加';
	} else {
		return '请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...';
	}
}
function main(num, inputString) {
	if (num == undefined) {
		console.log(buildMainMenuString());
	} else {
		if (inputString === undefined) {
			console.log(getChildMenuString(num));
		} else {
			console.log(addStudentAchievement(inputString));
		}
		
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
