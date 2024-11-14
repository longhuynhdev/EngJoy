import { Lesson } from "@/types/lessons";

const lessons: Lesson[] = [
  {
    id: "1",
    title: "Present Simple vs Present Continuous",
    body: "Learn the key differences between Present Simple and Present Continuous tenses. Present Simple is used for habits and general truths, while Present Continuous describes actions happening now...",
    author: "Emma Davis",
    date: "2024-05-01",
    category: ["GRAMMAR", "VOCABULARY"],
    difficulty: ["BEGINNER"],
    comments: [
      {
        id: "1",
        text: "This really helped clear up my confusion!",
        username: "Jane",
      },
      { id: "2", text: "Great examples used.", username: "Alex" },
    ],
  },
  {
    id: "2",
    title: "Common Business Vocabulary",
    body: "Essential business vocabulary including terms like 'revenue', 'profit margin', 'stakeholder', 'ROI'...",
    author: "John Smith",
    date: "2024-04-28",
    category: ["VOCABULARY"],
    difficulty: ["INTERMEDIATE"],
    comments: [
      {
        id: "1",
        text: "Very useful for my business meetings!",
        username: "Mark",
      },
      { id: "2", text: "Could you add more examples?", username: "Sarah" },
    ],
  },
  {
    id: "3",
    title: "It's Raining Cats and Dogs",
    body: "Explore common weather-related idioms in English. Learn the meaning and usage of expressions like 'it's raining cats and dogs', 'under the weather'...",
    author: "David Johnson",
    date: "2024-05-03",
    category: ["IDIOMS"],
    difficulty: ["INTERMEDIATE"],
    comments: [
      { id: "1", text: "Love learning these expressions!", username: "Lucy" },
      {
        id: "2",
        text: "These idioms are so interesting.",
        username: "Michael",
      },
    ],
  },
  {
    id: "4",
    title: "Writing Effective Emails",
    body: "Learn the structure and language for professional email writing. Topics include subject lines, greetings, body content, and sign-offs...",
    author: "Sophia Williams",
    date: "2024-05-05",
    category: ["WRITING"],
    difficulty: ["BEGINNER"],
    comments: [
      { id: "1", text: "This improved my work emails!", username: "Grace" },
      { id: "2", text: "Clear and practical advice.", username: "Jack" },
    ],
  },
  {
    id: "5",
    title: "Advanced Conditional Structures",
    body: "Master mixed conditionals and advanced if-clause structures. Includes complex examples and practice exercises...",
    author: "Andrew Brown",
    date: "2024-05-08",
    category: ["GRAMMAR"],
    difficulty: ["ADVANCED"],
    comments: [
      { id: "1", text: "Challenging but very helpful.", username: "Olivia" },
      { id: "2", text: "Great for exam preparation.", username: "William" },
    ],
  },
  {
    id: "6",
    title: "Phrasal Verbs in Business",
    body: "Master common phrasal verbs used in business contexts: 'carry out', 'set up', 'follow up', 'break down'...",
    author: "Lisa Thompson",
    date: "2024-05-10",
    category: ["VOCABULARY"],
    difficulty: ["ADVANCED"],
    comments: [
      {
        id: "1",
        text: "Finally understanding these properly!",
        username: "Tom",
      },
      { id: "2", text: "Very comprehensive list.", username: "Emily" },
    ],
  },
  {
    id: "7",
    title: "Academic Writing Structure",
    body: "Learn how to structure academic essays, including thesis statements, topic sentences, and conclusions...",
    author: "Robert Wilson",
    date: "2024-05-12",
    category: ["WRITING"],
    difficulty: ["ADVANCED"],
    comments: [
      { id: "1", text: "Perfect for my university essays!", username: "James" },
      { id: "2", text: "The examples really help.", username: "Maria" },
    ],
  },
  {
    id: "8",
    title: "Body Language Idioms",
    body: "Learn common idioms related to body parts: 'cold feet', 'playing it by ear', 'pull someone's leg'...",
    author: "Patricia Moore",
    date: "2024-05-15",
    category: ["IDIOMS"],
    difficulty: ["BEGINNER"],
    comments: [
      { id: "1", text: "Fun and easy to remember!", username: "Daniel" },
      { id: "2", text: "Love the illustrations.", username: "Sophie" },
    ],
  },
  {
    id: "9",
    title: "Past Perfect vs Past Simple",
    body: "Understanding when to use Past Perfect and Past Simple tenses, with timeline explanations and practice exercises...",
    author: "Michael Chen",
    date: "2024-05-18",
    category: ["GRAMMAR"],
    difficulty: ["INTERMEDIATE"],
    comments: [
      { id: "1", text: "The timelines really helped!", username: "Peter" },
      { id: "2", text: "Great explanation.", username: "Anna" },
    ],
  },
  {
    id: "10",
    title: "Creative Writing Techniques",
    body: "Explore descriptive writing, character development, and story structure for creative writing...",
    author: "Rachel Adams",
    date: "2024-05-20",
    category: ["WRITING"],
    difficulty: ["INTERMEDIATE"],
    comments: [
      { id: "1", text: "Inspired me to start writing!", username: "Chris" },
      { id: "2", text: "Excellent creative tips.", username: "Linda" },
    ],
  },
];

export default lessons;
