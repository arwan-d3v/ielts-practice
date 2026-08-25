export interface ReadingQuestion {
  id: string;
  type: 'tfng' | 'ynng' | 'matching-headings' | 'matching-info' | 
        'sentence-completion' | 'summary' | 'multiple-choice' | 'short-answer';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  paragraphRef?: string;
  keywordHint?: string;
}

export interface ReadingPassage {
  id: string;
  title: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  wordCount: number;
  passage: string;
  questions: ReadingQuestion[];
  source?: string;
}

export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'rp_easy_1',
    title: 'The History of the Bicycle',
    topic: 'History',
    difficulty: 'easy',
    wordCount: 520,
    passage: `The bicycle is one of the most common forms of transportation in the world, yet its history is relatively short. The first human-powered land vehicle, a precursor to the bicycle, was invented in 1817 by a German baron named Karl von Drais. It was called a "running machine" (Laufmaschine) or a Draisienne. It had two wheels in a line, but no pedals. The rider propelled it by pushing their feet against the ground. It was made almost entirely of wood and was primarily used for recreation by the wealthy.

In the 1860s, a French inventor added pedals to the front wheel, creating what became known as the velocipede. This invention made it much easier to ride, but the heavy wooden frame and iron tires made for a very bumpy journey, earning it the nickname "boneshaker." Despite the discomfort, velocipedes became very popular in Europe for a brief period.

The next major development came in the 1870s with the "high-wheel" bicycle, also known as the penny-farthing. It had a huge front wheel, which allowed it to travel faster, and a small rear wheel. The pedals were still attached directly to the front wheel. While it was faster, it was also dangerous. The high center of gravity made it prone to tipping over forward if the front wheel hit a bump.

The true breakthrough occurred in the late 1880s with the invention of the "safety bicycle." This design featured two wheels of equal size, a chain drive to the rear wheel, and pneumatic (air-filled) rubber tires. This made the bicycle much safer and more comfortable to ride. The safety bicycle sparked a massive boom in cycling in the 1890s, making it a popular mode of transport for ordinary people, not just young, athletic men. It also had a significant social impact, particularly for women, as it provided them with a new level of independent mobility.`,
    questions: [
      {
        id: 'q1',
        type: 'tfng',
        question: 'Karl von Drais\'s invention had pedals attached to the front wheel.',
        correctAnswer: 'False',
        explanation: 'The text states that the Laufmaschine had "no pedals. The rider propelled it by pushing their feet against the ground." Pedals were added later in the 1860s.',
        paragraphRef: 'Paragraph 1',
        keywordHint: 'Karl von Drais, pedals'
      },
      {
        id: 'q2',
        type: 'tfng',
        question: 'The "boneshaker" was popular in Europe despite being uncomfortable to ride.',
        correctAnswer: 'True',
        explanation: 'The text says, "Despite the discomfort, velocipedes became very popular in Europe for a brief period."',
        paragraphRef: 'Paragraph 2',
        keywordHint: 'boneshaker, uncomfortable, popular'
      },
      {
        id: 'q3',
        type: 'tfng',
        question: 'The penny-farthing was the most expensive bicycle of the 1870s.',
        correctAnswer: 'Not Given',
        explanation: 'The text describes the design and the danger of the penny-farthing, but it mentions nothing about its price compared to other bicycles.',
        paragraphRef: 'Paragraph 3',
        keywordHint: 'penny-farthing, expensive'
      },
      {
        id: 'q4',
        type: 'multiple-choice',
        question: 'What made the "safety bicycle" much safer than previous designs?',
        options: [
          'A. A huge front wheel.',
          'B. A heavy wooden frame.',
          'C. Two equal-sized wheels and a chain drive.',
          'D. It had no pedals.'
        ],
        correctAnswer: 'C. Two equal-sized wheels and a chain drive.',
        explanation: 'The text states the safety bicycle "featured two wheels of equal size, a chain drive to the rear wheel... This made the bicycle much safer".',
        paragraphRef: 'Paragraph 4',
        keywordHint: 'safety bicycle, safer'
      }
    ]
  },
  {
    id: 'rp_med_1',
    title: 'The Importance of Sleep for Memory Consolidation',
    topic: 'Science',
    difficulty: 'medium',
    wordCount: 650,
    passage: `For decades, scientists have recognized that sleep is not merely a period of rest, but an active state crucial for cognitive function. While the exact mechanisms are still being unraveled, a significant body of research indicates that sleep plays a fundamental role in memory consolidation—the process by which newly acquired information is stabilized and integrated into long-term memory.

Memory is generally divided into two main stages: acquisition (learning new information) and consolidation (stabilizing that memory). When we learn something new, the neural connections in our brain (synapses) are temporarily strengthened. However, these new memories are fragile and susceptible to interference. It is during sleep, particularly during specific stages of the sleep cycle, that these fragile memories are transformed into a more permanent and robust form.

Researchers have identified slow-wave sleep (SWS), also known as deep sleep, as critical for the consolidation of declarative memories. These are memories of facts and events, such as a phone number or what you had for dinner yesterday. During SWS, the brain exhibits slow, synchronized electrical activity. Studies have shown that people who are deprived of SWS struggle significantly to recall information they learned the previous day compared to those who have a full night of uninterrupted deep sleep.

Conversely, Rapid Eye Movement (REM) sleep, the stage associated with vivid dreaming, appears to be more involved in the consolidation of procedural memories. These are memories of how to perform a skill or task, such as playing the piano or riding a bicycle. Furthermore, REM sleep is thought to play a role in emotional memory processing, helping individuals process and integrate emotional experiences, potentially reducing their emotional intensity over time.

The implications of this research are profound, particularly in educational and professional settings. Pulling an "all-nighter" before an exam is counterproductive, as it deprives the brain of the very process it needs to retain the studied material. A lack of adequate sleep not only impairs the ability to learn new information the next day but also significantly hinders the retention of information learned previously. Therefore, prioritizing sleep is not a luxury, but a biological necessity for optimal learning and memory function.`,
    questions: [
      {
        id: 'q1',
        type: 'matching-info',
        question: 'Which paragraph mentions the specific type of memory related to facts and events?',
        options: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3', 'Paragraph 4', 'Paragraph 5'],
        correctAnswer: 'Paragraph 3',
        explanation: 'Paragraph 3 states: "...consolidation of declarative memories. These are memories of facts and events..."',
        keywordHint: 'facts and events'
      },
      {
        id: 'q2',
        type: 'ynng',
        question: 'New memories formed during the acquisition stage are strong and permanent.',
        correctAnswer: 'No',
        explanation: 'Paragraph 2 states: "However, these new memories are fragile and susceptible to interference."',
        paragraphRef: 'Paragraph 2',
        keywordHint: 'new memories, strong, permanent'
      },
      {
        id: 'q3',
        type: 'sentence-completion',
        question: 'According to the text, REM sleep is particularly important for the consolidation of ______________ memories, such as learning to ride a bike.',
        correctAnswer: 'procedural',
        explanation: 'Paragraph 4 states: "Rapid Eye Movement (REM) sleep... appears to be more involved in the consolidation of procedural memories. These are memories of how to perform a skill or task, such as playing the piano or riding a bicycle."',
        paragraphRef: 'Paragraph 4',
        keywordHint: 'REM sleep, consolidation, riding a bike'
      },
      {
        id: 'q4',
        type: 'short-answer',
        question: 'What term is used in the text to describe the process of stabilizing newly acquired information?',
        correctAnswer: 'memory consolidation',
        explanation: 'Paragraph 1 defines it: "...memory consolidation—the process by which newly acquired information is stabilized and integrated into long-term memory."',
        paragraphRef: 'Paragraph 1',
        keywordHint: 'stabilizing, newly acquired information'
      }
    ]
  }
];
