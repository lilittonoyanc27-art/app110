export interface MatchingPair {
  id: string;
  original: string;
  translation: string;
}

export interface SentenceChallenge {
  id: string;
  sentence: string; 
  answer: string;
  translation: string;
  options: string[];
}

export interface DictionaryItem {
  phrase: string;
  category: 'abrir' | 'cerrar';
  translation: string;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  type: 'matching' | 'test' | 'theory';
  status: 'locked' | 'available' | 'completed';
}

export const BOWLING_DATA = {
  levels: [
    { id: '1', title: 'Բոուլինգ Մեթչինգ', description: 'Համապատասխանեցրու բայերը', type: 'matching', status: 'available' },
    { id: '2', title: 'Ստրայք Թեստ', description: 'Լրացրու ճիշտ խոնարհումը', type: 'test', status: 'available' },
    { id: '3', title: 'Բոուլինգի Թեորիա', description: 'Սովորիր Abrir և Cerrar բայերը', type: 'theory', status: 'available' },
  ] as Level[],
  
  dictionary: [
    { phrase: 'Yo abro', category: 'abrir', translation: 'Ես բացում եմ' },
    { phrase: 'Tú abres', category: 'abrir', translation: 'Դու բացում ես' },
    { phrase: 'Él/Ella/Ud. abre', category: 'abrir', translation: 'Նա բացում է' },
    { phrase: 'Nosotros abrimos', category: 'abrir', translation: 'Մենք բացում ենք' },
    { phrase: 'Vosotros abrís', category: 'abrir', translation: 'Դուք բացում եք' },
    { phrase: 'Ellos/Ellas/Uds. abren', category: 'abrir', translation: 'Նրանք բացում են' },
    { phrase: 'Yo cierro', category: 'cerrar', translation: 'Ես փակում եմ' },
    { phrase: 'Tú cierras', category: 'cerrar', translation: 'Դու փակում ես' },
    { phrase: 'Él/Ella/Ud. cierra', category: 'cerrar', translation: 'Նա փակում է' },
    { phrase: 'Nosotros cerramos', category: 'cerrar', translation: 'Մենք փակում ենք' },
    { phrase: 'Vosotros cerráis', category: 'cerrar', translation: 'Դուք փակում եք' },
    { phrase: 'Ellos/Ellas/Uds. cierran', category: 'cerrar', translation: 'Նրանք փակում են' },
  ] as DictionaryItem[],

  matching: [
    { id: 'm1', original: 'Abrir', translation: 'Բացել' },
    { id: 'm2', original: 'Cerrar', translation: 'Փակել' },
    { id: 'm3', original: 'Yo abro', translation: 'Ես բացում եմ' },
    { id: 'm4', original: 'Tú cierras', translation: 'Դու փակում ես' },
    { id: 'm5', original: 'Nosotros abrimos', translation: 'Մենք բացում ենք' },
    { id: 'm6', original: 'Él cierra', translation: 'Նա փակում է' },
    { id: 'm7', original: 'Vosotros abrís', translation: 'Դուք բացում եք' },
    { id: 'm8', original: 'Ellos abren', translation: 'Նրանք բացում են' },
    { id: 'm9', original: 'Tú abres', translation: 'Դու բացում ես' },
    { id: 'm10', original: 'Nosotros cerramos', translation: 'Մենք փակում ենք' },
  ] as MatchingPair[],

  sentences: [
    { 
      id: 's1', 
      sentence: 'Yo ___ (abrir) la puerta.', 
      answer: 'abro', 
      translation: 'Ես բացում եմ դուռը:',
      options: ['abro', 'abres', 'abre', 'abrimos']
    },
    { 
      id: 's2', 
      sentence: 'Tú ___ (cerrar) la ventana.', 
      answer: 'cierras', 
      translation: 'Դու փակում ես պատուհանը:',
      options: ['cierro', 'cierras', 'cierra', 'cerramos']
    },
    { 
      id: 's3', 
      sentence: 'Nosotros ___ (abrir) el libro.', 
      answer: 'abrimos', 
      translation: 'Մենք բացում ենք գիրքը:',
      options: ['abro', 'abrimos', 'abren', 'abre']
    },
    { 
      id: 's4', 
      sentence: 'Él ___ (cerrar) la tienda.', 
      answer: 'cierra', 
      translation: 'Նա փակում է խանութը:',
      options: ['cierra', 'cierro', 'cierran', 'cerramos']
    },
    { 
      id: 's5', 
      sentence: 'Ellos ___ (abrir) los ojos.', 
      answer: 'abren', 
      translation: 'Նրանք բացում են աչքերը:',
      options: ['abren', 'abrimos', 'abro', 'abre']
    },
    { 
      id: 's6', 
      sentence: 'Vosotros ___ (cerrar) el computador.', 
      answer: 'cerráis', 
      translation: 'Դուք փակում եք համակարգիչը:',
      options: ['cerráis', 'cerráis', 'cierran', 'cerramos']
    },
    { 
      id: 's7', 
      sentence: 'Ella ___ (abrir) el regalo.', 
      answer: 'abre', 
      translation: 'Նա բացում է նվերը:',
      options: ['abre', 'abren', 'abrimos', 'abro']
    },
    { 
      id: 's8', 
      sentence: 'Nosotros ___ (cerrar) los ojos.', 
      answer: 'cerramos', 
      translation: 'Մենք փակում ենք աչքերը:',
      options: ['cerramos', 'cierran', 'cierras', 'cierro']
    },
    { 
      id: 's9', 
      sentence: 'Ustedes ___ (abrir) la caja.', 
      answer: 'abren', 
      translation: 'Դուք բացում եք տուփը:',
      options: ['abren', 'abrís', 'abres', 'abrimos']
    },
    { 
      id: 's10', 
      sentence: 'Tú ___ (abrir) el paraguas.', 
      answer: 'abres', 
      translation: 'Դու բացում ես անձրևանոցը:',
      options: ['abres', 'abre', 'abren', 'abro']
    },
  ] as SentenceChallenge[]
};
