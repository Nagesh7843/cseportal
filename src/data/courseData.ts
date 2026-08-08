import { CourseItem } from '@/types';

export const COURSES_DATA: CourseItem[] = [
  {
    code: 'CS402',
    title: 'Distributed Systems & Cloud Computing',
    semester: 7,
    credits: 4,
    type: 'Core',
    instructor: 'Dr. Aris Thorne',
    description: 'Consensus protocols, Raft/Paxos, cloud architecture, Kubernetes, distributed storage, fault tolerance.'
  },
  {
    code: 'CS301',
    title: 'Data Structures & Algorithms',
    semester: 3,
    credits: 4,
    type: 'Core',
    instructor: 'Dr. Ada Lovelace',
    description: 'Trees, Graphs, Dynamic Programming, Greedy Algorithms, Complexity analysis & optimization.'
  },
  {
    code: 'CS304',
    title: 'Compiler Construction',
    semester: 5,
    credits: 4,
    type: 'Core',
    instructor: 'Dr. Grace Hopper',
    description: 'Lexical analysis, parsing techniques, intermediate code generation, LLVM, optimization passes.'
  },
  {
    code: 'CS412',
    title: 'Edge AI & Mesh Computing',
    semester: 8,
    credits: 3,
    type: 'Elective',
    instructor: 'Dr. Alan Turing',
    description: 'On-device neural inference, model quantization, federated learning, IoT sensor networks.'
  },
  {
    code: 'CS202',
    title: 'Operating Systems Kernel Design',
    semester: 4,
    credits: 4,
    type: 'Core',
    instructor: 'Dr. Linus Torvalds',
    description: 'Process scheduling, virtual memory management, IPC, system calls, device drivers.'
  }
];
