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
    id: string;                    
    title: string;                 
    shortDescription: string;      
    duration: number;              // Thời gian làm quiz 
    points: number;                // Số điểm tối đa cho quiz
    date: string;                  // Ngày tạo quiz 
    categories: string[];          
    difficulties: string[];       
    questions: Question[];         
  }
  