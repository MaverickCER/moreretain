export interface GoogleObj {
    switch: boolean;
    format: string;
    q: string;
    source: string;
    target: string;
    result: string;
    voice0: Voice | null;
    voice1: Voice | null;
    voices: object[];
  }
  
  interface Voice {
    lang: string;
  }