let readline = require('readline');
function getInputString() {
	rl = readline.createInterface(process.stdin, process.stdout);
	rl.setPrompt('>');
	rl.prompt();
	rl.on(buildMainMenuString(),function(line) {
		switch(line) {
			case '1':
			console.log(`请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：`);
			default:buildMainMenuString();
			break;
		}
	rl.prompt();
	}).on('close',function() {
		console.log('exit');
		process.exit(0);
	});
}

module.exports = getInputString();