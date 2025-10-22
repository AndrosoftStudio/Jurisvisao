export type Alinea = { letra: string; texto: string };
export type Inciso = { romano: string; texto: string; alineas: Alinea[] };
export type Paragrafo = { tipo: 'único' | '§'; numero: number | null; texto: string };
export type Artigo = {
  numero: number | string;
  caput: string;
  paragrafos: Paragrafo[];
  incisos: Inciso[];
  notas: string[];
};

export type EstruturaSecao = {
  numero_romano: string;
  nome: string;
  artigos: Artigo[];
};
export type EstruturaCapitulo = {
  numero_romano: string;
  nome: string;
  secoes: EstruturaSecao[];
  artigos: Artigo[];
};
export type EstruturaTitulo = {
  numero_romano: string;
  nome: string;
  capitulos: EstruturaCapitulo[];
  artigos: Artigo[];
};

export type CF88 = {
  titulo: string;
  preambulo: string | null;
  estrutura: EstruturaTitulo[];
};

export type UIArticle = {
  numero: string; // display (pode conter º)
  slug: string;   // apenas dígitos, para URL
  titulo: string;
  texto: string;
  hierarquia: { titulo: string | null; capitulo: string | null; secao: string | null };
};

export type UITree = {
  titulos: {
    numero: string;
    nome: string;
    capitulos: {
      numero: string;
      nome: string;
      secoes: { numero: string; nome: string; artigos: UIArticle[] }[];
      artigos: UIArticle[];
    }[];
    artigos: UIArticle[];
  }[];
  artigos: UIArticle[];
};
