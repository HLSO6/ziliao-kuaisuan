// 定义运算类型
export type Operation = 'add' | 'subtract' | 'multiply' | 'divide';

// 定义数字位数
export type DigitLength = 1 | 2 | 3 | 4 | 'random';

// 训练配置接口
export interface TrainingConfig {
  operation: Operation;
  firstDigits: DigitLength;
  secondDigits: DigitLength;
  questionCount: number;
}

// 生成的题目接口
export interface GeneratedQuestion {
  id: string;
  operation: Operation;
  firstNumber: number;
  secondNumber: number;
  answer: number;
  displayQuestion: string;
}

// 数字范围映射
const DIGIT_RANGES = {
  1: { min: 1, max: 9 },
  2: { min: 10, max: 99 },
  3: { min: 100, max: 999 },
  4: { min: 1000, max: 9999 }
};

/**
 * 生成指定范围内的随机数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机数
 */
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 获取随机数字（根据位数）
 * @param digits 位数
 * @returns 随机数
 */
function getRandomNumberByDigits(digits: DigitLength): number {
  if (digits === 'random') {
    // 随机选择1-4位数
    const randomDigit = [1, 2, 3, 4][Math.floor(Math.random() * 4)] as DigitLength;
    const range = DIGIT_RANGES[randomDigit as keyof typeof DIGIT_RANGES];
    return getRandomNumber(range.min, range.max);
  } else {
    const range = DIGIT_RANGES[digits as keyof typeof DIGIT_RANGES];
    return getRandomNumber(range.min, range.max);
  }
}

/**
 * 生成除法题目（确保整除）
 * @param firstDigits 第一个数字的位数
 * @param secondDigits 第二个数字的位数
 * @returns 生成的题目
 */
function generateDivisionQuestion(firstDigits: DigitLength, secondDigits: DigitLength): GeneratedQuestion {
  let firstNum: number, secondNum: number, answer: number;
  
  // 循环直到找到符合条件的题目
  let attempts = 0;
  const maxAttempts = 100; // 防止无限循环
  
  // 初始化变量
  secondNum = getRandomNumberByDigits(secondDigits);
  answer = getRandomNumberByDigits(firstDigits);
  firstNum = secondNum * answer;
  
  while (attempts < maxAttempts) {
    // 先生成除数和商
    secondNum = getRandomNumberByDigits(secondDigits);
    answer = getRandomNumberByDigits(firstDigits);
    
    // 计算被除数
    firstNum = secondNum * answer;
    
    // 检查被除数是否符合位数要求
    const firstNumDigits = firstNum.toString().length;
    if (
      firstDigits === 'random' ||
      firstNumDigits === firstDigits
    ) {
      break;
    }
    
    attempts++;
  }
  
  // 如果达到最大尝试次数仍未找到合适的题目，则使用最后生成的题目
  if (attempts >= maxAttempts) {
    // 生成一个近似的题目
    secondNum = getRandomNumberByDigits(secondDigits);
    answer = getRandomNumber(1, 99); // 限制商的范围
    firstNum = secondNum * answer;
  }
  
  return {
    id: `div_${Date.now()}_${Math.random()}`,
    operation: 'divide',
    firstNumber: firstNum,
    secondNumber: secondNum,
    answer: answer,
    displayQuestion: `${firstNum} ÷ ${secondNum} = ?`
  };
}

/**
 * 生成减法题目（确保结果非负）
 * @param firstDigits 第一个数字的位数
 * @param secondDigits 第二个数字的位数
 * @returns 生成的题目
 */
function generateSubtractionQuestion(firstDigits: DigitLength, secondDigits: DigitLength): GeneratedQuestion {
  let firstNum = getRandomNumberByDigits(firstDigits);
  let secondNum = getRandomNumberByDigits(secondDigits);
  
  // 确保结果非负
  if (firstNum < secondNum) {
    [firstNum, secondNum] = [secondNum, firstNum]; // 交换数字
  }
  
  return {
    id: `sub_${Date.now()}_${Math.random()}`,
    operation: 'subtract',
    firstNumber: firstNum,
    secondNumber: secondNum,
    answer: firstNum - secondNum,
    displayQuestion: `${firstNum} - ${secondNum} = ?`
  };
}

/**
 * 生成加法题目
 * @param firstDigits 第一个数字的位数
 * @param secondDigits 第二个数字的位数
 * @returns 生成的题目
 */
function generateAdditionQuestion(firstDigits: DigitLength, secondDigits: DigitLength): GeneratedQuestion {
  const firstNum = getRandomNumberByDigits(firstDigits);
  const secondNum = getRandomNumberByDigits(secondDigits);
  
  return {
    id: `add_${Date.now()}_${Math.random()}`,
    operation: 'add',
    firstNumber: firstNum,
    secondNumber: secondNum,
    answer: firstNum + secondNum,
    displayQuestion: `${firstNum} + ${secondNum} = ?`
  };
}

/**
 * 生成乘法题目
 * @param firstDigits 第一个数字的位数
 * @param secondDigits 第二个数字的位数
 * @returns 生成的题目
 */
function generateMultiplicationQuestion(firstDigits: DigitLength, secondDigits: DigitLength): GeneratedQuestion {
  const firstNum = getRandomNumberByDigits(firstDigits);
  const secondNum = getRandomNumberByDigits(secondDigits);
  
  return {
    id: `mul_${Date.now()}_${Math.random()}`,
    operation: 'multiply',
    firstNumber: firstNum,
    secondNumber: secondNum,
    answer: firstNum * secondNum,
    displayQuestion: `${firstNum} × ${secondNum} = ?`
  };
}

/**
 * 生成单个题目
 * @param operation 运算类型
 * @param firstDigits 第一个数字的位数
 * @param secondDigits 第二个数字的位数
 * @returns 生成的题目
 */
function generateSingleQuestion(
  operation: Operation,
  firstDigits: DigitLength,
  secondDigits: DigitLength
): GeneratedQuestion {
  switch (operation) {
    case 'add':
      return generateAdditionQuestion(firstDigits, secondDigits);
    case 'subtract':
      return generateSubtractionQuestion(firstDigits, secondDigits);
    case 'multiply':
      return generateMultiplicationQuestion(firstDigits, secondDigits);
    case 'divide':
      return generateDivisionQuestion(firstDigits, secondDigits);
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

/**
 * 生成题目集合
 * @param config 训练配置
 * @returns 生成的题目数组
 */
export function generateQuestions(config: TrainingConfig): GeneratedQuestion[] {
  const questions: GeneratedQuestion[] = [];
  const seenQuestions = new Set<string>(); // 用于避免重复题目
  
  for (let i = 0; i < config.questionCount; i++) {
    let attempts = 0;
    let question: GeneratedQuestion;
    
    // 循环直到生成一个不重复的题目
    do {
      question = generateSingleQuestion(
        config.operation,
        config.firstDigits,
        config.secondDigits
      );
      
      // 创建一个字符串来标识题目（忽略ID）
      const currentQuestionSignature = `${question.firstNumber}${question.operation}${question.secondNumber}`;
      
      attempts++;
      
      // 如果尝试次数过多，允许重复题目
      if (attempts > 50) {
        break;
      }
      
    } while (seenQuestions.has(`${question.firstNumber}${question.operation}${question.secondNumber}`) && attempts <= 50);
    
    // 添加题目签名到已见集合
    const questionSignature = `${question.firstNumber}${question.operation}${question.secondNumber}`;
    seenQuestions.add(questionSignature);
    
    questions.push(question);
  }
  
  return questions;
}