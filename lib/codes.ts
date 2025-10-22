export type CodeCard = {
  id: string;
  nome: string;
  sigla: string;
  categoria: string;
  descricao: string;
  lei?: string;
  url?: string;
  available: boolean;
};

export const codes: CodeCard[] = [
  {
    id: 'cf88',
    nome: 'Constituição Federal',
    sigla: 'CF/88',
    categoria: 'Constitucional',
    descricao: 'Constituição da República Federativa do Brasil de 1988.',
    lei: 'Promulgada em 1988',
    available: true
  },
  // Exemplos (placeholders visuais). Mantidos OFF para evitar dependências externas
  { id: 'cc', nome: 'Código Civil', sigla: 'CC', categoria: 'Cível', descricao: 'Direitos e obrigações de ordem privada.', lei: 'Lei 10.406/2002', url: 'https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm', available: false },
  { id: 'cp', nome: 'Código Penal', sigla: 'CP', categoria: 'Penal', descricao: 'Define crimes e estabelece penas.', lei: 'Decreto-Lei 2.848/1940', url: 'https://www.planalto.gov.br/ccivil_03/decreto-lei/del2848compilado.htm', available: false },
];
