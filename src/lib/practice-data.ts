export const TASK1_PROMPTS = [
  // FORMAL
  {
    type: 'formal',
    text: 'You have recently bought a piece of equipment for your kitchen but it did not work. You phoned the shop but no action was taken.\n\nWrite a letter to the shop manager. In your letter:\n- describe the problem with the equipment\n- explain what happened when you phoned the shop\n- say what you would like the manager to do',
  },
  {
    type: 'formal',
    text: 'You recently stayed in a hotel and left an item in your room.\n\nWrite a letter to the hotel manager. In your letter:\n- give details of your stay\n- describe the item you left behind\n- suggest how the item can be returned to you',
  },
  {
    type: 'formal',
    text: 'You recently took a flight and the airline lost your luggage.\n\nWrite a letter to the airline manager. In your letter:\n- provide details of your flight\n- describe the missing luggage\n- state what action you expect the airline to take',
  },
  {
    type: 'formal',
    text: 'You have seen an advertisement for a part-time job in a local newspaper and you want to apply for it.\n\nWrite a letter to the employer. In your letter:\n- explain why you want the job\n- describe your relevant experience\n- say when you are available to work',
  },
  // SEMI-FORMAL
  {
    type: 'semi-formal',
    text: 'You rent an apartment. The heating system has stopped working and you have complained to the landlord, but nothing has been done.\n\nWrite a letter to your landlord. In your letter:\n- state why you are writing\n- explain what the problem is and how it affects you\n- suggest how you think the problem could be resolved',
  },
  {
    type: 'semi-formal',
    text: 'You are organizing a team-building event for your colleagues at work.\n\nWrite a letter to your colleagues. In your letter:\n- explain the purpose of the event\n- give details about the activities planned\n- ask them to confirm their attendance',
  },
  {
    type: 'semi-formal',
    text: 'Your neighbours have a dog that barks loudly all day while they are at work, which is disturbing you.\n\nWrite a letter to your neighbours. In your letter:\n- explain the situation\n- describe how it is affecting your life\n- suggest a polite solution',
  },
  {
    type: 'semi-formal',
    text: 'You have been attending evening classes at a local college but you are not happy with the course.\n\nWrite a letter to the college administration. In your letter:\n- provide details of the course you are taking\n- explain why you are dissatisfied\n- say what you would like them to do',
  },
  // INFORMAL
  {
    type: 'informal',
    text: 'You are going to take a short holiday in Singapore and you want to ask a friend who lives there for some advice.\n\nWrite a letter to your friend. In your letter:\n- say when you are going to visit\n- ask about places you should visit\n- ask for advice about finding accommodation',
  },
  {
    type: 'informal',
    text: 'A friend has agreed to look after your house and pet while you are on holiday.\n\nWrite a letter to your friend. In your letter:\n- give contact details for when you are away\n- give instructions about caring for your pet\n- describe some other household duties',
  },
  {
    type: 'informal',
    text: 'You recently moved to a new city and you want to invite a friend to visit you.\n\nWrite a letter to your friend. In your letter:\n- describe your new city\n- invite them to visit and suggest dates\n- mention some activities you could do together',
  },
  {
    type: 'informal',
    text: 'A friend of yours is planning to buy a car and has asked for your advice.\n\nWrite a letter to your friend. In your letter:\n- suggest what kind of car they should buy\n- give reasons for your recommendation\n- offer to help them look for the car',
  }
];

export const TASK2_PROMPTS = {
  opinion: [
    { text: 'Some people believe that the best way to improve public health is by increasing the number of sports facilities. Others, however, say that this would have little effect on public health and that other measures are required.\n\nTo what extent do you agree or disagree?' },
    { text: 'Nowadays, many families have both parents working full-time. Some people think this has a negative effect on family life.\n\nTo what extent do you agree or disagree?' },
    { text: 'In many countries, paying for things using mobile phone apps is becoming increasingly common.\n\nDoes this development have more advantages or disadvantages?' },
    { text: 'Some people think that all teenagers should be required to do unpaid work in their free time to help the local community.\n\nTo what extent do you agree or disagree?' },
    { text: 'It is sometimes argued that too many students go to university, while others claim that a university education should be a universal right.\n\nTo what extent do you agree or disagree?' }
  ],
  advantages: [
    { text: 'In many countries, an increasing number of people are choosing to live alone.\n\nDo the advantages of this trend outweigh the disadvantages?' },
    { text: 'More and more people are traveling to other countries for medical treatment.\n\nDo the advantages of this outweigh the disadvantages?' },
    { text: 'Nowadays, many people choose to work from home instead of commuting to an office.\n\nDo the advantages of working from home outweigh the disadvantages?' },
    { text: 'Many schools are now using tablets and computers instead of traditional textbooks.\n\nDo the advantages of this development outweigh the disadvantages?' }
  ],
  causes: [
    { text: 'In spite of the advances made in agriculture, many people around the world still go hungry.\n\nWhy is this the case? What can be done about this problem?' },
    { text: 'Traffic congestion is becoming a huge problem for many major cities.\n\nWhat are the main causes of this? What solutions can you suggest?' },
    { text: 'In many countries, the proportion of older people is steadily increasing.\n\nWhat problems will this cause for society? What can be done to solve them?' },
    { text: 'Childhood obesity is becoming a serious problem in many developed countries.\n\nWhat are the primary causes of this? How can this issue be addressed?' }
  ],
  discussion: [
    { text: 'Some people think that university education should be free for everyone. Others think that students should pay for their higher education.\n\nDiscuss both these views and give your own opinion.' },
    { text: 'Some people believe that children should be given a large amount of homework. Others think that they should have more free time to play.\n\nDiscuss both views and give your opinion.' },
    { text: 'Some people think that the best way to reduce crime is to give longer prison sentences. Others, however, believe there are better alternative ways of reducing crime.\n\nDiscuss both views and give your opinion.' },
    { text: 'Some individuals believe that history is one of the most important school subjects. Other people think that, in today\'s world, subjects like science and technology are more important.\n\nDiscuss both these views and give your own opinion.' }
  ]
};

export const STRUCTURE_GUIDE_TASK1 = [
  { id: 'greeting', title: 'Greeting', icon: '📬', description: 'Address the recipient correctly (e.g., Dear Sir/Madam, Dear John,)' },
  { id: 'intro', title: 'Introduction', icon: '📝', description: 'State the purpose of your letter clearly in the first sentence.' },
  { id: 'body1', title: 'Body Paragraph 1', icon: '📄', description: 'Address the first bullet point from the prompt with specific details.' },
  { id: 'body2', title: 'Body Paragraph 2', icon: '📄', description: 'Address the next bullet point(s) logically and clearly.' },
  { id: 'closing', title: 'Closing', icon: '✍️', description: 'Request action, express hope, or outline next steps.' },
  { id: 'signoff', title: 'Sign-off', icon: '👋', description: 'End formally/informally as appropriate (e.g., Yours faithfully, Best regards,)' }
];

export const STRUCTURE_GUIDE_TASK2 = [
  { id: 'intro', title: 'Introduction', icon: '🎯', description: 'Paraphrase the topic and state your clear thesis/opinion.' },
  { id: 'body1', title: 'Body Paragraph 1', icon: '📝', description: 'Topic sentence, explanation, and a relevant example.' },
  { id: 'body2', title: 'Body Paragraph 2', icon: '📝', description: 'Second main idea with explanation and example.' },
  { id: 'body3', title: 'Body Paragraph 3', icon: '📝', description: '(Optional) Third supporting idea or counter-argument.' },
  { id: 'conclusion', title: 'Conclusion', icon: '🏁', description: 'Restate your main points and opinion. Do not add new ideas here.' }
];

export const DYNAMIC_TIPS = {
  task1: {
    greeting: ["Formal: Dear Sir/Madam,", "Semi-formal: Dear Mr. Smith,", "Informal: Dear Alex,"],
    intro: ["Start by explaining why you are writing.", "Don't copy the prompt exactly. Use your own words."],
    body: ["Make sure you cover EVERY bullet point from the prompt.", "Use linking words like 'Furthermore', 'However', 'Therefore'."],
    closing: ["Formal: I look forward to hearing from you.", "Informal: See you soon!"],
    signoff: ["Formal (name unknown): Yours faithfully,", "Formal (name known): Yours sincerely,", "Informal: Best wishes, / Warm regards,"],
  },
  task2: {
    intro: ["Write exactly 2-3 sentences.", "Sentence 1: Paraphrase the background.", "Sentence 2: Your thesis statement."],
    body: ["Start with a clear Topic Sentence.", "Never write a 1-sentence paragraph.", "Include specific examples to support your points."],
    conclusion: ["Start with 'In conclusion,'", "Restate your main opinion in different words.", "CRITICAL: If you don't write a conclusion, your score is capped at Band 5!"],
  }
};
