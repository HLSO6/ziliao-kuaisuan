export interface PercentageQuestion {
  id: string;
  type: "percent-to-fraction" | "fraction-to-percent";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: {
    key: string;
    text: string;
  }[];
  answer: string;
  analysis: string;
  tip: string;
}

export const percentageQuestions: PercentageQuestion[] = [
  // 百化分 - 基础级别
  {
    id: "phf-001",
    type: "percent-to-fraction",
    difficulty: "easy",
    question: "50% = ?",
    options: [
      { key: "A", text: "1/2" },
      { key: "B", text: "1/3" },
      { key: "C", text: "1/4" },
      { key: "D", text: "1/5" }
    ],
    answer: "A",
    analysis: "50% = 50/100 = 1/2",
    tip: "50% = 1/2"
  },
  {
    id: "phf-002",
    type: "percent-to-fraction",
    difficulty: "easy",
    question: "25% = ?",
    options: [
      { key: "A", text: "1/2" },
      { key: "B", text: "1/3" },
      { key: "C", text: "1/4" },
      { key: "D", text: "1/5" }
    ],
    answer: "C",
    analysis: "25% = 25/100 = 1/4",
    tip: "25% = 1/4"
  },
  {
    id: "phf-003",
    type: "percent-to-fraction",
    difficulty: "easy",
    question: "20% = ?",
    options: [
      { key: "A", text: "1/2" },
      { key: "B", text: "1/3" },
      { key: "C", text: "1/4" },
      { key: "D", text: "1/5" }
    ],
    answer: "D",
    analysis: "20% = 20/100 = 1/5",
    tip: "20% = 1/5"
  },
  {
    id: "phf-004",
    type: "percent-to-fraction",
    difficulty: "easy",
    question: "10% = ?",
    options: [
      { key: "A", text: "1/8" },
      { key: "B", text: "1/9" },
      { key: "C", text: "1/10" },
      { key: "D", text: "1/11" }
    ],
    answer: "C",
    analysis: "10% = 10/100 = 1/10",
    tip: "10% = 1/10"
  },
  {
    id: "phf-005",
    type: "percent-to-fraction",
    difficulty: "easy",
    question: "75% = ?",
    options: [
      { key: "A", text: "2/3" },
      { key: "B", text: "3/4" },
      { key: "C", text: "4/5" },
      { key: "D", text: "5/6" }
    ],
    answer: "B",
    analysis: "75% = 75/100 = 3/4",
    tip: "75% = 3/4"
  },
  {
    id: "phf-006",
    type: "percent-to-fraction",
    difficulty: "easy",
    question: "80% = ?",
    options: [
      { key: "A", text: "2/3" },
      { key: "B", text: "3/4" },
      { key: "C", text: "4/5" },
      { key: "D", text: "5/6" }
    ],
    answer: "C",
    analysis: "80% = 80/100 = 4/5",
    tip: "80% = 4/5"
  },

  // 百化分 - 常用级别
  {
    id: "phf-007",
    type: "percent-to-fraction",
    difficulty: "medium",
    question: "12.5% = ?",
    options: [
      { key: "A", text: "1/6" },
      { key: "B", text: "1/7" },
      { key: "C", text: "1/8" },
      { key: "D", text: "1/9" }
    ],
    answer: "C",
    analysis: "12.5% = 12.5/100 = 1/8",
    tip: "12.5% = 1/8"
  },
  {
    id: "phf-008",
    type: "percent-to-fraction",
    difficulty: "medium",
    question: "37.5% = ?",
    options: [
      { key: "A", text: "2/7" },
      { key: "B", text: "3/8" },
      { key: "C", text: "4/9" },
      { key: "D", text: "5/11" }
    ],
    answer: "B",
    analysis: "37.5% = 37.5/100 = 3/8",
    tip: "37.5% = 3/8"
  },
  {
    id: "phf-009",
    type: "percent-to-fraction",
    difficulty: "medium",
    question: "62.5% = ?",
    options: [
      { key: "A", text: "2/7" },
      { key: "B", text: "3/8" },
      { key: "C", text: "4/9" },
      { key: "D", text: "5/8" }
    ],
    answer: "D",
    analysis: "62.5% = 62.5/100 = 5/8",
    tip: "62.5% = 5/8"
  },
  {
    id: "phf-010",
    type: "percent-to-fraction",
    difficulty: "medium",
    question: "87.5% = ?",
    options: [
      { key: "A", text: "5/8" },
      { key: "B", text: "6/7" },
      { key: "C", text: "7/8" },
      { key: "D", text: "8/9" }
    ],
    answer: "C",
    analysis: "87.5% = 87.5/100 = 7/8",
    tip: "87.5% = 7/8"
  },

  // 百化分 - 进阶级别
  {
    id: "phf-011",
    type: "percent-to-fraction",
    difficulty: "hard",
    question: "16.7% ≈ ?",
    options: [
      { key: "A", text: "1/5" },
      { key: "B", text: "1/6" },
      { key: "C", text: "1/7" },
      { key: "D", text: "1/8" }
    ],
    answer: "B",
    analysis: "16.7% ≈ 16.67% = 1/6",
    tip: "16.7% ≈ 1/6"
  },
  {
    id: "phf-012",
    type: "percent-to-fraction",
    difficulty: "hard",
    question: "33.3% ≈ ?",
    options: [
      { key: "A", text: "1/2" },
      { key: "B", text: "1/3" },
      { key: "C", text: "1/4" },
      { key: "D", text: "1/5" }
    ],
    answer: "B",
    analysis: "33.3% ≈ 33.33% = 1/3",
    tip: "33.3% ≈ 1/3"
  },
  {
    id: "phf-013",
    type: "percent-to-fraction",
    difficulty: "hard",
    question: "66.7% ≈ ?",
    options: [
      { key: "A", text: "1/2" },
      { key: "B", text: "2/3" },
      { key: "C", text: "3/4" },
      { key: "D", text: "4/5" }
    ],
    answer: "B",
    analysis: "66.7% ≈ 66.67% = 2/3",
    tip: "66.7% ≈ 2/3"
  },
  {
    id: "phf-014",
    type: "percent-to-fraction",
    difficulty: "hard",
    question: "14.3% ≈ ?",
    options: [
      { key: "A", text: "1/6" },
      { key: "B", text: "1/7" },
      { key: "C", text: "1/8" },
      { key: "D", text: "1/9" }
    ],
    answer: "B",
    analysis: "14.3% ≈ 14.29% = 1/7",
    tip: "14.3% ≈ 1/7"
  },
  {
    id: "phf-015",
    type: "percent-to-fraction",
    difficulty: "hard",
    question: "11.1% ≈ ?",
    options: [
      { key: "A", text: "1/7" },
      { key: "B", text: "1/8" },
      { key: "C", text: "1/9" },
      { key: "D", text: "1/10" }
    ],
    answer: "C",
    analysis: "11.1% ≈ 11.11% = 1/9",
    tip: "11.1% ≈ 1/9"
  },

  // 分化百 - 基础级别
  {
    id: "fhb-001",
    type: "fraction-to-percent",
    difficulty: "easy",
    question: "1/2 = ?",
    options: [
      { key: "A", text: "40%" },
      { key: "B", text: "50%" },
      { key: "C", text: "60%" },
      { key: "D", text: "70%" }
    ],
    answer: "B",
    analysis: "1/2 = 0.5 = 50%",
    tip: "1/2 = 50%"
  },
  {
    id: "fhb-002",
    type: "fraction-to-percent",
    difficulty: "easy",
    question: "1/4 = ?",
    options: [
      { key: "A", text: "15%" },
      { key: "B", text: "20%" },
      { key: "C", text: "25%" },
      { key: "D", text: "30%" }
    ],
    answer: "C",
    analysis: "1/4 = 0.25 = 25%",
    tip: "1/4 = 25%"
  },
  {
    id: "fhb-003",
    type: "fraction-to-percent",
    difficulty: "easy",
    question: "1/5 = ?",
    options: [
      { key: "A", text: "15%" },
      { key: "B", text: "20%" },
      { key: "C", text: "25%" },
      { key: "D", text: "30%" }
    ],
    answer: "B",
    analysis: "1/5 = 0.2 = 20%",
    tip: "1/5 = 20%"
  },
  {
    id: "fhb-004",
    type: "fraction-to-percent",
    difficulty: "easy",
    question: "1/10 = ?",
    options: [
      { key: "A", text: "5%" },
      { key: "B", text: "8%" },
      { key: "C", text: "10%" },
      { key: "D", text: "12%" }
    ],
    answer: "C",
    analysis: "1/10 = 0.1 = 10%",
    tip: "1/10 = 10%"
  },
  {
    id: "fhb-005",
    type: "fraction-to-percent",
    difficulty: "easy",
    question: "3/4 = ?",
    options: [
      { key: "A", text: "65%" },
      { key: "B", text: "70%" },
      { key: "C", text: "75%" },
      { key: "D", text: "80%" }
    ],
    answer: "C",
    analysis: "3/4 = 0.75 = 75%",
    tip: "3/4 = 75%"
  },
  {
    id: "fhb-006",
    type: "fraction-to-percent",
    difficulty: "easy",
    question: "4/5 = ?",
    options: [
      { key: "A", text: "70%" },
      { key: "B", text: "75%" },
      { key: "C", text: "80%" },
      { key: "D", text: "85%" }
    ],
    answer: "C",
    analysis: "4/5 = 0.8 = 80%",
    tip: "4/5 = 80%"
  },

  // 分化百 - 常用级别
  {
    id: "fhb-007",
    type: "fraction-to-percent",
    difficulty: "medium",
    question: "1/8 = ?",
    options: [
      { key: "A", text: "10%" },
      { key: "B", text: "12%" },
      { key: "C", text: "12.5%" },
      { key: "D", text: "15%" }
    ],
    answer: "C",
    analysis: "1/8 = 0.125 = 12.5%",
    tip: "1/8 = 12.5%"
  },
  {
    id: "fhb-008",
    type: "fraction-to-percent",
    difficulty: "medium",
    question: "3/8 = ?",
    options: [
      { key: "A", text: "35%" },
      { key: "B", text: "36.5%" },
      { key: "C", text: "37.5%" },
      { key: "D", text: "38.5%" }
    ],
    answer: "C",
    analysis: "3/8 = 0.375 = 37.5%",
    tip: "3/8 = 37.5%"
  },
  {
    id: "fhb-009",
    type: "fraction-to-percent",
    difficulty: "medium",
    question: "5/8 = ?",
    options: [
      { key: "A", text: "57.5%" },
      { key: "B", text: "60%" },
      { key: "C", text: "62.5%" },
      { key: "D", text: "65%" }
    ],
    answer: "C",
    analysis: "5/8 = 0.625 = 62.5%",
    tip: "5/8 = 62.5%"
  },
  {
    id: "fhb-010",
    type: "fraction-to-percent",
    difficulty: "medium",
    question: "7/8 = ?",
    options: [
      { key: "A", text: "77.5%" },
      { key: "B", text: "80%" },
      { key: "C", text: "85%" },
      { key: "D", text: "87.5%" }
    ],
    answer: "D",
    analysis: "7/8 = 0.875 = 87.5%",
    tip: "7/8 = 87.5%"
  },

  // 分化百 - 进阶级别
  {
    id: "fhb-011",
    type: "fraction-to-percent",
    difficulty: "hard",
    question: "1/6 ≈ ?",
    options: [
      { key: "A", text: "15.7%" },
      { key: "B", text: "16.7%" },
      { key: "C", text: "17.7%" },
      { key: "D", text: "18.7%" }
    ],
    answer: "B",
    analysis: "1/6 = 0.1666... ≈ 16.7%",
    tip: "1/6 ≈ 16.7%"
  },
  {
    id: "fhb-012",
    type: "fraction-to-percent",
    difficulty: "hard",
    question: "1/3 ≈ ?",
    options: [
      { key: "A", text: "32.3%" },
      { key: "B", text: "33.3%" },
      { key: "C", text: "34.3%" },
      { key: "D", text: "35.3%" }
    ],
    answer: "B",
    analysis: "1/3 = 0.3333... ≈ 33.3%",
    tip: "1/3 ≈ 33.3%"
  },
  {
    id: "fhb-013",
    type: "fraction-to-percent",
    difficulty: "hard",
    question: "2/3 ≈ ?",
    options: [
      { key: "A", text: "64.7%" },
      { key: "B", text: "65.7%" },
      { key: "C", text: "66.7%" },
      { key: "D", text: "67.7%" }
    ],
    answer: "C",
    analysis: "2/3 = 0.6666... ≈ 66.7%",
    tip: "2/3 ≈ 66.7%"
  },
  {
    id: "fhb-014",
    type: "fraction-to-percent",
    difficulty: "hard",
    question: "1/7 ≈ ?",
    options: [
      { key: "A", text: "13.3%" },
      { key: "B", text: "14.3%" },
      { key: "C", text: "15.3%" },
      { key: "D", text: "16.3%" }
    ],
    answer: "B",
    analysis: "1/7 = 0.142857... ≈ 14.3%",
    tip: "1/7 ≈ 14.3%"
  },
  {
    id: "fhb-015",
    type: "fraction-to-percent",
    difficulty: "hard",
    question: "1/9 ≈ ?",
    options: [
      { key: "A", text: "10.1%" },
      { key: "B", text: "11.1%" },
      { key: "C", text: "12.1%" },
      { key: "D", text: "13.1%" }
    ],
    answer: "B",
    analysis: "1/9 = 0.1111... ≈ 11.1%",
    tip: "1/9 ≈ 11.1%"
  }
];