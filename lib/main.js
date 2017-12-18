let readline = require('readline');
var readlineSync = require('readline-sync');
module.exports = main;
var studentsInfo = [];
class Student {
	constructor(input) {
		this.name = input[0];
		this.stuid = input[1];
		this.nation = input[2];
		this.classid = input[3];
		let score = {};
		let course1 = input[4];
		let course2 = input[6];
		let course3 = input[8];
		let course4 = input[10];
		score[course1] = input[5];
		score[course2] = input[7];
		score[course3] = input[9];
		score[course4] = input[11];
		this.score = score;
	}
}
function checkFormat(inputString) {
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
	if (checkFormat(inputString)) {
		let name = addStudentInfo(inputString).name;
		return '学生'+ name + '的成绩被添加';
	} else {
		return '请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...';
	}
}



function addStudentInfo(inputString) {
	let inputArray = [];
	inputString.split(",").map((item) => {
		inputArray = inputArray.concat(item.split(":"));
	});
	let student = new Student(inputArray)
	studentsInfo.push(student);
	return student;
}

function buildReport(inputString) {
	if(checkFormat2(inputString)) {
		addStudentInfo('张三,1,汉,1,数学:75,语文:95,英语:80,编程:80');
		addStudentInfo('李四,2,汉,1,数学:85,语文:80,英语:70,编程:90');
		return generateReport(inputString);
	} else {
		return printStudentSequencePrompt();
	}
}

function printStudentSequencePrompt() {
	return '请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：'
}

function generateReport(inputString) {
	let report = '成绩单\n';
    let str1 = '========================\n';
	let title = "姓名|";
	Object.keys(studentsInfo[0].score).forEach((item) => {
		title += item + "|";
	})
	title += "平均分|总分\n"
	report += title;
	report += str1;
	let totalMembers = getTotalMembers(inputString);
	let totalScores = getTotalScores(totalMembers);
	report += getContent(totalMembers, totalScores);
	report += str1;
	let avgTotalScore = getAvgScore(totalScores);
	report += "全班总分平均数：" + avgTotalScore + '\n';
	let mediaTotalScore = getMediaScore(totalScores);
	report += "全班总分中位数：" + mediaTotalScore;
	return report;
}
function getContent(totalMembers, totalScores) {
	let report = '';
	totalMembers.forEach((item, index) => {
		let counts = 0;
		let content = '';
		for (let key in item.score) {
			content += item.score[key] + '|';
			counts++
		}
		report += item.name + '|' + content + totalScores[index] / counts + '|' + totalScores[index] + '\n';
	});
	return report;
}
function getTotalScores(totalMembers) {
	let totalScores = [];
	totalMembers.forEach((item) => {
		let totalScore = 0;
		for (var key in item.score) {
			totalScore += Number(item.score[key]);
		}
		totalScores.push(totalScore);
	});
	return totalScores;
}
function getTotalMembers(inputString) {
	let studentNums = inputString.split(",");
	let members = [];
	studentNums.map((item) => {
		let member = studentsInfo.find((e) => e.stuid === item);
		if(member){
			members.push(member);
		}
	});
	return members;
}
function getAvgScore(totalScores) {
	let wholeScore = 0;
	totalScores.forEach((item) => {
		wholeScore += item;
	});
	return wholeScore / totalScores.length;
}
function getMediaScore(totalScores) {
	totalScores = totalScores.sort((a,b) => {
		return b - a;
	});
	let length = totalScores.length;
	let mediaTotalScore;
	if (length % 2 !== 0) {
		mediaTotalScore = totalScores[(length - 1) / 2];
	} else {
		mediaTotalScore = totalScores[length / 2] + totalScores[length / 2 - 1];
		mediaTotalScore /= 2;
	}
	return mediaTotalScore;
}


function checkFormat2(inputString) {
	let studentNums = inputString.split(",");
	let pattern = /^\d+$/;
	let result = true;
	result = studentNums.every((item) => {
		return pattern.test(item);
	});
	return result;
}

//这是用于单元测试的时候使用的main()
// function main(num, inputString) {
	// let studentsInfo = [];
	// if (num == undefined) {
		// console.log(buildMainMenuString());
	// } else {
		// if (inputString === undefined) {
			// console.log(getChildMenuString(num));
		// } else {
			// if (num === '1') {
				// console.log(addStudentAchievement(inputString));
			// }
			// if (num === '2') {
				// console.log(buildReport(inputString));
			// }
			
		// }
		
	// }
// }

//readline是异步的输入，无法实现输入的嵌套
/*function main() {
	console.log(buildMainMenuString());
	let rl = readline.createInterface(process.stdin, process.stdout);
	rl.setPrompt('>');
	rl.prompt();
	rl.on('line',function(line) {
		switch(line) {
			case '1','2':
			getChildMenuOutput(line);
			//console.log('hello,kitty');
			break;
			// case '2':
			// console.log('hello,kitty2');
			// getChildMenuOutput(line);
			// break;
			case '3':
			rl.close();
			default: console.log(buildMainMenuString());
			break;
		}
	rl.prompt();
	}).on('close',function() {
		console.log('exit');
		process.exit(0);
	});
}*/
function main() {
	let result;
	console.log(buildMainMenuString());
	readlineSync.promptLoop(function(input1) {	
		if (input1 === '1') {
			console.log(getChildMenuString(input1));
			readlineSync.promptLoop(function(input2) {
				console.log(addStudentAchievement(input2));
				result = checkFormat(input2);
				return result === true;
			});
			console.log(buildMainMenuString());
		} else if (input1 === '2') {
			console.log(getChildMenuString(input1));
			readlineSync.promptLoop(function(input2) {
				console.log(buildReport(input2));
				result = checkFormat2(input2);
				return result === true;
			});
			console.log(buildMainMenuString());
		} else if (input1 === '3') {
			return true;
		} else {
			console.log(buildMainMenuString());
		}
});
console.log('It\'s exited from loop.');
}

function test() {
// https://www.npmjs.com/package/readline-sync
readlineSync.promptLoop(function(input) {
  console.log('-- You said "' + input + '"');
  readlineSync.promptLoop(function(input) {
	  console.log('-- You also said "' + input + '"');
	  return input === '3';
  });
  return input === '3';
});
console.log('It\'s exited from loop.');
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
function buildMainMenuString() {
	let mainMenuString = `1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）:`
	return mainMenuString;
}


// main('2', 'hhh:hhh')
 //main();
 test();//留下一个问题中文乱码的问题
