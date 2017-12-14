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
		let inputString = '姓名,学号,民族,班级,学科:成绩,学科:成绩,学科:成绩,学科:成绩';
		let name = inputString.split(',')[0];
		spyOn(console, 'log');
		main(num, inputString);
		expect(console.log).toHaveBeenCalledWith('学生'+ name + '的成绩被添加');
	});
	it('input the right format of studentinfo', () => {
		let num = '1';
		let inputString = '姓名,学号,民族,学科:成绩,学科:成绩,学科:成绩,学科:成绩';
		let name = inputString.split(',')[0];
		spyOn(console, 'log');
		main(num, inputString);
		expect(console.log).toHaveBeenCalledWith('请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...');
	});
});
