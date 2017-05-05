#require success.js

//存储数据需要的结构
var quantity=4;
function sample(answer, score) 
{
    this.answer=answer;
	this.score=score;
    this.p=0;
	
	this.probabilistic=function()
	{this.p=this.score/quantity;}
}

function question()
{
	this.forecast=[];
	this.maxOption=[];
	
	this.updata=function(answer,probability)
	{this.forecast[answer]=probability;}
	
	this.getmaxOption=function()
	{
		var maxval=Math.max.apply(null,this.forecast);
		var maxOption=[];
		function pushOption(option)
		{
			if(this.forecast[option]==maxval)
				maxOption.push(option);
		}
		pushOption("A");
		pushOption("B");
		pushOption("C");
		pushOption("D");
		this.maxOption=maxOption;
	}

    this.delete=function (option)
    {delete this.forecast[option];} //只置undefine
}

function loss(predictionAnswer)
{
	var lossval=0;
    for(var sam in allsam)
    {
        var score=0;
        for(var i=0;i<quantity;i++)
        {
            if (sam.answer[i] == predictionAnswer[i])
                score++;
        }
        lossval+=Math.abs(sam.score-score);
    }
    return lossval;
}

function initObject(quantity) //创建预测对象
{
	var predictionResults=[];
	for(var i=0;i<quantity;i++)
	{predictionResults[i]=new question();}
	return predictionResults;
}

//初步处理数据
var allsam=[new sample(["A","B","C","D"],2),
			new sample(["A","A","A","A"],2),
			new sample(["A","B","B","D"],3),
			new sample(["B","B","B","D"],2)];
for(var i in allsam)
{i.probabilistic();}
var predictionResults=initObject(quantity); //以题目数量创建预测对象

//开始预测（概率计算部分）
function getProbability(sam,quesNO,option)
{
	if(sam.answer[quesNO]==option)
	{return sam.p;}
	else
	{return (1-sam.p)*(1/(4-1));}
}
function predictionOption(quesNO,option) //返回某题某选项正确的概率
{
	var compensate=1/4;
	var probability=getProbability(allsam[0],quesNO,option);
	for(var i=1;i<allsam.length;i++)
	{
		var exchangeProbability=getProbability(allsam[i],quesNO,option);
		probability=probability*exchangeProbability/components; //通过贝叶斯定理变形计算
	}
	return probability;
}
function predictionQuestion(quesNO) //计算某题所有选项正确的概率
{
	var ques=predictionResults[quesNO];
	ques.updata("A",predictionOption(quesNO,"A"));
	ques.updata("B",predictionOption(quesNO,"B"));
	ques.updata("C",predictionOption(quesNO,"C"));
	ques.updata("D",predictionOption(quesNO,"D"));
}
//对所有题目进行计算并得到最大概率的选项
for(var i=0;i<predictionResults.length;i++)
{
	predictionQuestion(i);
	predictionResults[i].getmaxOption();
}
//进行第一轮测试
var predictionAnswer=[]; //预测的答案
function stru()
{
	this.predictionAnswerArr=[];
	
	this.updata(predictionAnswer,lossval)
	{this.predictionAnswerArr[predictionAnswer]=lossval;}
	
	this.getminAnswer=function ()
	{
		var minval=Math.min.apply(null,this.predictionAnswerArr);
		for(var predictionAnswer in this.predictionAnswerArr)
		{ 
            if(this.predictionAnswerArr[predictionAnswer]==minval)
				return predictionAnswer; //用某个损失函数值最小的预测结果进行后续的离散优化
        }
	}
}
var combination=new stru();//所有组合的损失函数值暂存于此
function recursiveTest(quesNO)
{
	var ques=predictionResults[quesNO];
	//组合每道题的maxOption进行测试
	for(var o in ques.maxOption)
	{
		predictionAnswer[quesNO]=o;
		if(quesNO==quantity-1) //已经递归到达最深层，可以测试
		{
			var lossval=loss(predictionAnswer);
			if(lossval==0) //通过全部测试样例，看作找到结果
			{success(predictionAnswer);}
			else
			{combination.updata(predictionAnswer.copy(),lossval);}
		}
		else
		{recursiveTest(quesNO+1);}
	}
}
recursiveTest(0);
predictionAnswer=combination.getminAnswer(); //任取一个损失函数值最小的进行后续的离散优化
function deleteArgument(predictionResults,predictionAnswer)
{
    //由于该问题不同维度不存在组合影响loss值，所以进行下一次迭代不会再移动到曾经所在所在过的位置。故可以用此函数删除曾经的位置以减小搜索空间
    for(var i=0;i<quantity;i++)
    {predictionResults[i].delete(predictionAnswer[i]);}
}
deleteArgument(predictionAnswer);
//继续预测（归纳覆盖部分）
function discreteOptimization(predictionAnswer)
{
	//本问题loss实际自变量为predictionAnswer，有quantity个维度
	//计算每个维度变化的loss值移动大小，向误差减小最多的方向前进一步
	var prelossval=loss(predictionAnswer);
	var delta=[];
	for(var i=0;i<quantity;i++)
	{
		var newPA=predictionAnswer.copy();

	}
}