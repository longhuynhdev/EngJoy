export interface Answer {
    answerId: string;    // ID của câu trả lời
    answer: string;      // Nội dung câu trả lời
    explanation: string; 
    correct: boolean;    // Đánh dấu câu trả lời đúng (true đúng, false sai)
  }
  
  export interface Question {
    id: string;          // ID của câu hỏi
    question: string;    // Nội dung câu hỏi
    answers: Answer[];   // Mảng các câu trả lời của câu hỏi
  }
  
  export interface Quiz {
    id: string;                    // ID của quiz
    title: string;                 // Tiêu đề của quiz
    shortDescription: string;      // Mô tả ngắn về quiz
    duration: number;              // Thời gian làm quiz (giây)
    points: number;                // Số điểm tối đa cho quiz
    date: string;                  // Ngày tạo quiz (dạng ISO 8601)
    categories: string[];          // Mảng các thể loại của quiz
    difficulties: string[];        // Mảng các mức độ khó của quiz
    questions: Question[];         // Mảng các câu hỏi trong quiz
  }
  