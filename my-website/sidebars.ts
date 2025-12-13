import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  bookSidebar: [ // Updated sidebarId
    {
      type: 'category',
      label: 'Module 1: Foundations',
      link: {
        type: 'generated-index',
        title: 'Module 1: Foundations Overview',
        description: 'Establish foundational concepts of Physical AI',
        slug: '/book/module1',
      },
      items: [
        'module1/chapter1', // Placeholder for Chapter 1
        'module1/chapter2', // Placeholder for Chapter 2
        'module1/chapter3', // Placeholder for Chapter 3
      ],
    },
    {
      type: 'category',
      label: 'Module 2: Mechanisms & Control',
      link: {
        type: 'generated-index',
        title: 'Module 2: Mechanisms & Control Overview',
        description: 'Detail technical mechanisms of Physical AI',
        slug: '/book/module2',
      },
      items: [
        'module2/chapter4', // Placeholder for Chapter 4
        'module2/chapter5', // Placeholder for Chapter 5
        'module2/chapter6', // Placeholder for Chapter 6
      ],
    },
    {
      type: 'category',
      label: 'Module 3: Intelligence & Interaction',
      link: {
        type: 'generated-index',
        title: 'Module 3: Intelligence & Interaction Overview',
        description: 'Explore advanced AI techniques and human-robot interaction',
        slug: '/book/module3',
      },
      items: [
        'module3/chapter7', // Placeholder for Chapter 7
        'module3/chapter8', // Placeholder for Chapter 8
        'module3/chapter9', // Placeholder for Chapter 9
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Future & Applications',
      link: {
        type: 'generated-index',
        title: 'Module 4: Future & Applications Overview',
        description: 'Synthesize future trends and applications',
        slug: '/book/module4',
      },
      items: [
        'module4/chapter10', // Placeholder for Chapter 10
        'module4/chapter11', // Placeholder for Chapter 11
        'module4/chapter12', // Placeholder for Chapter 12
      ],
    },
  ],
};

export default sidebars;
