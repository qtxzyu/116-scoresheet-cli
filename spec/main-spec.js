let sinon = require("sinon");
let main = require("../lib/main");
//let buildMainMenuString = require("../lib/buildMainMenuString.js");


describe('main()', () => {

    it('should display main menu once started', () => {
        spyOn(console, 'log');
		let num = undefined;
        main(num);
        expect(console.log).toHaveBeenCalledWith(`1. 添加学生
2. 生成成绩单
3. 退出
请输入你的选择（1～3）:`);
    });
});

describe('getChildMenuString()', () => {
	
	it('should display the menu of getstudentInfo', () => {
		let num = '1';
		//sinon.spy(console, 'log');
		spyOn(console, 'log');
		main(num);
		// expect(console.log.args.join()).toBe(`请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：`);
		expect(console.log).toHaveBeenCalledWith(`请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：`);
	});
	
	it('should display the menu of getachievement report', () => {
		let num = '2';
		//sinon.spy(console, 'log');
		spyOn(console, 'log');
		main(num);
		expect(console.log).toHaveBeenCalledWith(`请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：`);
	});
});

describe("addStudentAchievement()", () => {
	it('input the right format of studentinfo', () => {
		let num = '1';
		let inputString = '马零,0,汉,1,数学:75,语文:95,英语:80,编程:80';
		let name = inputString.split(',')[0];
		spyOn(console, 'log');
		main(num, inputString);
		expect(console.log).toHaveBeenCalledWith('学生'+ name + '的成绩被添加');
	});
	it('input the wrong format of studentinfo', () => {
		let num = '1';
		let inputString = '张三,1,汉,数学:75,语文:95,英语:80,编程:80';
		let name = inputString.split(',')[0];
		spyOn(console, 'log');
		main(num, inputString);
		expect(console.log).toHaveBeenCalledWith('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...');
	});
});

describe("buildReport()", () => {
	it('input the right format to get the report', () => {
		let num = '2';
		let inputString = '1,2';
		let name = inputString.split(',')[0];
		spyOn(console, 'log');
		main(num, inputString);
		// expect(console.log).toHaveBeenCalledWith('成绩单\n' + 
    // '姓名|数学|语文|英语|编程|平均分|总分 \n' + '========================\n' + '张三|75|95|80|80|82.5|330\n' + 
    // '李四|85|80|70|90|81.25|325\n' + '========================\n' + '全班总分平均数：327.5\n' + 
     // '全班总分中位数：327.5');
	 expect(console.log).toHaveBeenCalledWith('成绩单\n'+
    '姓名|数学|语文|英语|编程|平均分|总分\n'+
    '========================\n'+
    '张三|75|95|80|80|82.5|330\n'+
    '李四|85|80|70|90|81.25|325\n'+
    '========================\n'+
    '全班总分平均数：327.5\n'+
    '全班总分中位数：327.5');
	 
	});
	it('input the wrong format', () => {
		let num = '2';
		let inputString = 'hhh:hhh';
		let name = inputString.split(',')[0];
		spyOn(console, 'log');
		main(num, inputString);
		expect(console.log).toHaveBeenCalledWith(    '请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：');
	});
});
