import { Prompt } from '@/models/chat';

const predefinedPrompts: Prompt[] = [
  {
    name: 'Description',
    prompt: 'Provide a brief description of the document',
  },
  {
    name: 'Analysis',
    prompt:
      'Provide the most detailed, lengthy analysis of the document possible',
  },
  {
    name: 'Summary',
    prompt: 'Provide detailed summary of the document in points',
  },
];

export default predefinedPrompts;
