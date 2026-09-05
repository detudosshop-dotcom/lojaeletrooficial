/**
 * Catálogo unificado dos produtos do app.
 *
 * - Cada produto tem slug usado em /produto/$slug
 * - Lavadora continua sendo a home (/)
 * - Aspirador entra como produto comprável da loja
 */

export type ProductReview = {
  initial: string;
  name: string;
  date: string;
  text: string;
  photos: string[];
};

export type ProductFeature = [title: string, description: string];

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  /** Subtítulo curto usado em cards e mini-resumos */
  tagline: string;
  price: number;
  oldPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  reviewsTotal: number;
  sold: number;
  freeShipping: boolean;
  /** Galeria principal (primeira é capa) */
  images: string[];
  /** Voltagem opcional — só aparece em produtos elétricos com 127/220V */
  voltageOptions?: ("127V" | "220V")[];
  /** Rótulo customizado para opções (ex: "Modelo", "Versão", padrão "Cor") */
  colorOptionsLabel?: string;
  /** Opções de cor (ex: relógio em diferentes combinações de caixa/mostrador) */
  colorOptions?: { label: string; images: string[]; stock: number }[];
  description: {
    intro: string;
    features: ProductFeature[];
    specs: string[];
    idealFor: string[];
    includes: string[];
  };
  reviewsList: ProductReview[];
  /** Meta tags para a rota */
  meta: {
    title: string;
    description: string;
  };
};

import relogio1 from "@/assets/relogio-1.jpeg";
import relogio2 from "@/assets/relogio-2.jpeg";
import relogio3 from "@/assets/relogio-3.jpeg";
import relogio4 from "@/assets/relogio-4.jpeg";
import relogioPrataVerde from "@/assets/relogio-prata-verde.jpeg";
import relogioDouradoVermelho from "@/assets/relogio-dourado-vermelho.jpeg";
import relogioDouradoDourado from "@/assets/relogio-dourado-dourado.jpeg";
import relogioReview1 from "@/assets/relogio-review-1.jpg";
import relogioReview2 from "@/assets/relogio-review-2.jpg";
import relogioReview3 from "@/assets/relogio-review-3.jpg";
import relogioReview4 from "@/assets/relogio-review-4.jpg";
import relogioReview5 from "@/assets/relogio-review-5.jpg";
import relogioReview6 from "@/assets/relogio-review-6.jpg";
import extratoraReview1 from "@/assets/review-extratora-1.jpg";
import extratoraReview2 from "@/assets/review-extratora-2.jpg";
import extratoraReview3 from "@/assets/review-extratora-3.jpg";
import extratoraReview4 from "@/assets/review-extratora-4.jpg";
import extratoraReview5 from "@/assets/review-extratora-5.jpg";
import garrafaAparecida1 from "@/assets/garrafa-aparecida-1.png";
import garrafaAparecida2 from "@/assets/garrafa-aparecida-2.png";
import garrafaAparecida3 from "@/assets/garrafa-aparecida-3.png";
import garrafaAparecida4 from "@/assets/garrafa-aparecida-4.png";
import garrafaFreshCover from "@/assets/garrafa-fresh-cover.png";
import garrafaTermicaDetalhe from "@/assets/garrafa-termica-detalhe.png";

import garrafaCorRosa from "@/assets/garrafa-cor-rosa.png";
import garrafaCorRosa2 from "@/assets/garrafa-cor-rosa-2.png";
import garrafaCorRosa3 from "@/assets/garrafa-cor-rosa-3.png";
import garrafaCorPink from "@/assets/garrafa-cor-pink.png";
import garrafaCorPink2 from "@/assets/garrafa-cor-pink-2.png";
import garrafaCorPink3 from "@/assets/garrafa-cor-pink-3.png";
import garrafaCorMelancia from "@/assets/garrafa-cor-melancia.png";
import garrafaCorMelancia2 from "@/assets/garrafa-cor-melancia-2.png";
import garrafaCorMelancia3 from "@/assets/garrafa-cor-melancia-3.png";

import kit48v1 from "@/assets/kit-48v-1.webp";
import kit48v2 from "@/assets/kit-48v-2.webp";
import kit48v3 from "@/assets/kit-48v-3.webp";
import kit48v4 from "@/assets/kit-48v-4.webp";
import kit48v5 from "@/assets/kit-48v-5.webp";
import kit48v6 from "@/assets/kit-48v-6.webp";
import kit48v7 from "@/assets/kit-48v-7.webp";
import kit48v8 from "@/assets/kit-48v-8.webp";
import kit48v9 from "@/assets/kit-48v-9.webp";
import produtoKitFerramentas from "@/assets/produto-kit-ferramentas.jpg";
import produtoFuradeira from "@/assets/produto-furadeira.jpg";
import produtoParafusadeira from "@/assets/produto-parafusadeira.jpg";
import produtoEsmerilhadeira from "@/assets/produto-esmerilhadeira.jpg";

const ASP = "https://svzmueexktjqcssaitzp.supabase.co/storage/v1/object/public/product-images/aspirador";
const LAV = "https://obtjwxuspfvhnijncwud.supabase.co/storage/v1/object/public/product-images";

export const products: Product[] = [
  {
    id: "lav-1300",
    slug: "lavadora-vonder-lav-1300",
    name: "Lavadora de Alta Pressão Vonder LAV 1300 - 1.300 lbf/pol²",
    shortName: "Lavadora Vonder LAV 1300",
    tagline: "1.300 lbf/pol² · 1.200W · Compacta e potente",
    price: 67.90,
    oldPrice: 364.9,
    discount: 81,
    rating: 4.8,
    reviews: 456,
    reviewsTotal: 456,
    sold: 9547,
    freeShipping: true,
    images: [
      `${LAV}/lav1300-01.webp`,
      `${LAV}/lav1300-02.webp`,
      `${LAV}/lav1300-03.webp`,
      `${LAV}/lav1300-04.webp`,
      `${LAV}/lav1300-05.webp`,
      `${LAV}/lav1300-06.webp`,
    ],
    voltageOptions: ["127V", "220V"],
    description: {
      intro: "Por que escolher a Lavadora Vonder LAV 1300?",
      features: [
        ["Potência de 1.300 libras", "Remove as sujeiras mais difíceis em qualquer superfície, deixando tudo impecável em minutos."],
        ["Motor universal de 1.200W", "Alto desempenho com baixo consumo de energia, ideal para uso doméstico."],
        ["Sistema Stop Total", "Desliga automaticamente quando o gatilho não está pressionado, garantindo maior vida útil e economia."],
        ["Bico ajustável", "Alterne entre jato leque e jato concentrado conforme a necessidade da limpeza."],
        ["Compacta e leve (4,2 kg)", "Fácil de transportar e armazenar, com alça ergonômica e suporte para pistola."],
        ["Reservatório externo para detergente", "Praticidade na aplicação de produtos de limpeza."],
      ],
      specs: [
        "Pressão máxima: 1.300 lbf/pol² – 90 bar – 9 MPa",
        "Pressão nominal: 870 lbf/pol² – 60 bar – 6 MPa",
        "Potência: 1.200W (1,3 cv/hp)",
        "Vazão máxima: 390 litros/hora – 6,5 litros/min",
        "Vazão nominal: 300 litros/hora – 5 litros/min",
        "Nível de ruído: 75 dB(A)",
        "Pistões da bomba em Aço Inox",
        "Frequência: 60 Hz",
        "Peso: 4,2 kg",
      ],
      idealFor: [
        "Lavar carros, motos e bicicletas",
        "Limpar calçadas, quintais e garagens",
        "Higienizar fachadas e muros",
        "Lavar pisos, decks e áreas externas",
      ],
      includes: [
        "1 Lavadora de Alta Pressão LAV 1300",
        "1 Pistola com gatilho",
        "1 Lança com bico ajustável",
        "1 Mangueira de alta pressão com 3m",
        "1 Acessório para detergente",
        '1 Conector engate rápido 1/2"',
      ],
    },
    reviewsList: [
      {
        initial: "C",
        name: "Carlos M.",
        date: "06 abr. 2026",
        text: "Meu marido ainda estava montando ela. A montagem é bem simples. Veio completa, como está no anúncio. Chegou dentro do prazo, tudo certinho! Indico o vendedor e o produto!",
        photos: [`${LAV}/reviews/review1-1.webp`, `${LAV}/reviews/review1-2.webp`, `${LAV}/reviews/review1-3.webp`],
      },
      {
        initial: "F",
        name: "Fernanda S.",
        date: "04 abr. 2026",
        text: "Produto chegou conforme a descrição, ainda não testei, a entrega foi rápida parabéns ao vendedor, agora vamos testar",
        photos: [`${LAV}/reviews/review2-1.webp`, `${LAV}/reviews/review2-2.webp`],
      },
      {
        initial: "R",
        name: "Roberto L.",
        date: "03 abr. 2026",
        text: "Chegou antes do prazo. Vendedor antecioso. Recomendo o produto. Adorei",
        photos: [`${LAV}/reviews/review3-1.webp`, `${LAV}/reviews/review3-2.webp`],
      },
      {
        initial: "A",
        name: "Ana Paula R.",
        date: "01 abr. 2026",
        text: "Muito boa a máquina, recomendo ☺️, chegou antes da data prevista, o valor compensa muito. Chegou tudo certinho e bem embalado.👍🏼",
        photos: [`${LAV}/reviews/review4-1.webp`, `${LAV}/reviews/review4-2.webp`],
      },
      {
        initial: "J",
        name: "João Pedro A.",
        date: "31 mar. 2026",
        text: "Ótimo produto, vendedor rápido e eficiente. Mercadoria chegou antes do esperado, recomendo a todos.....",
        photos: [`${LAV}/reviews/review5-1.webp`, `${LAV}/reviews/review5-2.webp`],
      },
    ],
    meta: {
      title: "Lavadora de Alta Pressão Vonder LAV 1300 - 1.300 lbf/pol²",
      description: "Lavadora de Alta Pressão Vonder LAV 1300 com 81% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "asp-6000",
    slug: "aspirador-portatil-3-em-1",
    name: "Mini Aspirador de Pó Portátil Automotivo Casa Sem Fio 3 em 1 Recarregável Potente 6000Pa",
    shortName: "Mini Aspirador Portátil 3 em 1",
    tagline: "Sucção 6000Pa · Sem fio · Aspira, sopra e infla",
    price: 26.99,
    oldPrice: 129.9,
    discount: 81,
    rating: 4.8,
    reviews: 456,
    reviewsTotal: 456,
    sold: 9547,
    freeShipping: true,
    images: [
      `${ASP}/asp1.webp`,
      `${ASP}/asp2.webp`,
      `${ASP}/asp3.webp`,
      `${ASP}/asp4.webp`,
      `${ASP}/asp5.webp`,
      `${ASP}/asp6.webp`,
      `${ASP}/asp7.webp`,
    ],
    description: {
      intro: "Por que escolher o Mini Aspirador Portátil 3 em 1?",
      features: [
        ["Potência de 6000Pa", "Sucção potente para remover sujeiras, farelos e pelos de animais em segundos."],
        ["Sem Fio e Recarregável", "Bateria de longa duração com carregamento USB para total liberdade de movimento."],
        ["Função 3 em 1", "Aspira, sopra e infla. Perfeito para limpeza e também para encher boias e colchões infláveis."],
        ["Filtro HEPA Lavável", "Fácil de limpar e reutilizar, mantendo a máxima eficiência de filtragem."],
        ["Compacto e Ergonômico", "Leve e fácil de manusear, ideal para guardar no porta-luvas do carro."],
        ["Acessórios Inclusos", "Acompanha diferentes bicos para alcançar todos os cantos e frestas."],
      ],
      specs: [
        "Potência de Sucção: 6000Pa",
        "Bateria: 2000mAh (Lítio)",
        "Carregamento: USB (Cabo incluso)",
        "Tempo de Uso: Até 30 minutos contínuos",
        "Tempo de Carga: 2-3 horas",
        "Nível de Ruído: < 70 dB",
        "Material: Plástico ABS de alta resistência",
        "Peso: 400g (Super leve)",
      ],
      idealFor: [
        "Limpar o interior do carro (bancos, painel, tapetes)",
        "Limpar teclados e eletrônicos",
        "Remover migalhas de sofás e camas",
        "Aspirar pelos de pets em móveis",
      ],
      includes: [
        "1 Mini Aspirador de Pó Portátil",
        "1 Bico com escova",
        "1 Bico longo para frestas",
        "1 Cabo de carregamento USB",
        "1 Manual de instruções",
      ],
    },
    reviewsList: [
      {
        initial: "C",
        name: "Carlos M.",
        date: "06 abr. 2026",
        text: "Chegou muito rápido. Aspira muito bem as migalhas no carro e o bico longo ajuda muito a chegar nos cantos. Recomendo!",
        photos: [`${ASP}/reviews/r1-1.webp`, `${ASP}/reviews/r1-2.webp`, `${ASP}/reviews/r1-3.webp`],
      },
      {
        initial: "F",
        name: "Fernanda S.",
        date: "04 abr. 2026",
        text: "Muito prático para o dia a dia. Uso no teclado e no sofá, a sucção é forte para o tamanho dele. Adorei.",
        photos: [`${ASP}/reviews/r2-1.webp`, `${ASP}/reviews/r2-2.webp`, `${ASP}/reviews/r2-3.webp`],
      },
      {
        initial: "R",
        name: "Roberto L.",
        date: "03 abr. 2026",
        text: "Surpreendido com a potência. O soprador também é excelente para limpar o teclado. Ótimo custo-benefício.",
        photos: [`${ASP}/reviews/r3-1.webp`, `${ASP}/reviews/r3-2.webp`, `${ASP}/reviews/r3-3.webp`],
      },
      {
        initial: "A",
        name: "Ana Paula R.",
        date: "01 abr. 2026",
        text: "Pequeno mas potente! Levo sempre no carro, ajuda muito a manter limpo. Valeu muito a pena.",
        photos: [`${ASP}/reviews/r1-4.webp`, `${ASP}/reviews/r2-1.webp`],
      },
      {
        initial: "J",
        name: "João Pedro A.",
        date: "31 mar. 2026",
        text: "Excelente qualidade. O filtro é fácil de limpar e a bateria dura bastante. Chegou antes do prazo.",
        photos: [`${ASP}/reviews/r3-4.webp`, `${ASP}/reviews/r2-2.webp`],
      },
    ],
    meta: {
      title: "Mini Aspirador de Pó Portátil 3 em 1 Recarregável 6000Pa",
      description: "Mini Aspirador Portátil 3 em 1 com 81% OFF. 6000Pa de sucção, sem fio, frete grátis e envio imediato.",
    },
  },
  {
    id: "garrafa-fresh-aparecida",
    slug: "garrafa-termica-fresh-aparecida",
    name: "Garrafa Térmica Fresh Aparecida em Aquarela 650ml - Aço Inox",
    shortName: "Garrafa Térmica Fresh Aparecida",
    tagline: "650ml · Fria por 24h · Quente por 12h",
    price: 49.9,
    oldPrice: 189.9,
    discount: 74,
    rating: 4.9,
    reviews: 1820,
    reviewsTotal: 1820,
    sold: 12450,
    freeShipping: true,
    images: [
      garrafaAparecida1,
      garrafaAparecida2,
      garrafaAparecida3,
      garrafaAparecida4,
    ],
    colorOptions: [
      { label: "Aparecida em Aquarela", images: [garrafaAparecida1, garrafaAparecida2, garrafaAparecida3], stock: 8 },
      { label: "Rosa", images: [garrafaCorRosa, garrafaCorRosa2, garrafaCorRosa3], stock: 10 },
      { label: "Pink", images: [garrafaCorPink, garrafaCorPink2, garrafaCorPink3], stock: 6 },
      { label: "Melancia", images: [garrafaCorMelancia, garrafaCorMelancia2, garrafaCorMelancia3], stock: 5 },
    ],
    description: {
      intro: "Por que escolher a Garrafa Térmica Fresh?",
      features: [
        ["Mantém Fria por 24h", "Tecnologia de parede dupla a vácuo conserva a temperatura gelada da sua bebida o dia todo."],
        ["Mantém Quente por 12h", "Perfeita para café, chá ou chocolate quente — sua bebida sempre na temperatura ideal."],
        ["Aço Inox 304 de Alta Qualidade", "Material livre de BPA, resistente, durável e que não altera o sabor da bebida."],
        ["Estampa Aparecida em Aquarela", "Design exclusivo da Nossa Senhora Aparecida em arte aquarelada, elegante e devocional."],
        ["Tampa com Alça Prática", "Carregue para qualquer lugar com facilidade — academia, trabalho, faculdade ou viagens."],
        ["Boca Larga", "Cabe gelo facilmente e é simples de limpar. Compatível com a maioria dos porta-copos de carro."],
      ],
      specs: [
        "Capacidade: 650ml",
        "Material: Aço Inoxidável 304",
        "Parede dupla a vácuo",
        "Mantém frio: até 24 horas",
        "Mantém quente: até 12 horas",
        "Tampa rosqueável com alça",
        "Altura: 25cm · Diâmetro: 7,3cm",
        "Peso: 380g",
        "Livre de BPA",
        "Não vai à máquina de lavar",
      ],
      idealFor: [
        "Devotos da Nossa Senhora Aparecida",
        "Academia, trabalho e faculdade",
        "Viagens, trilhas e dia a dia",
        "Presente sofisticado e cheio de significado",
      ],
      includes: [
        "1 Garrafa Térmica Fresh 650ml",
        "1 Tampa rosqueável com alça",
        "1 Embalagem de presente",
        "1 Manual de cuidados",
      ],
    },
    reviewsList: [
      {
        initial: "M",
        name: "Maria das Graças",
        date: "08 abr. 2026",
        text: "Linda demais! A estampa da Aparecida ficou ainda mais bonita ao vivo. Coloquei água gelada de manhã e à noite ainda estava com gelo. Recomendo de coração!",
        photos: [garrafaAparecida1, garrafaAparecida3],
      },
      {
        initial: "C",
        name: "Cláudia P.",
        date: "05 abr. 2026",
        text: "Comprei pra mim e pra minha mãe. Ela amou de presente! Mantém o café quentinho a manhã inteira. Material parece de muita qualidade.",
        photos: [garrafaAparecida2],
      },
      {
        initial: "R",
        name: "Renata S.",
        date: "02 abr. 2026",
        text: "Veio super bem embalada, na caixinha bonita. Levo pra academia todo dia, a água permanece geladinha mesmo no calor. Vale muito!",
        photos: [garrafaAparecida1],
      },
      {
        initial: "F",
        name: "Fernanda L.",
        date: "29 mar. 2026",
        text: "Estampa perfeita, cor azul vibrante. Cabe bem no porta-copos do carro. Comprei a melancia também pra minha filha, as duas amaram.",
        photos: [garrafaCorMelancia, garrafaAparecida2],
      },
      {
        initial: "P",
        name: "Patrícia M.",
        date: "26 mar. 2026",
        text: "Excelente qualidade pelo preço! A tampa veda muito bem, não vaza nada. A estampa devocional é o diferencial pra mim. Amei!",
        photos: [garrafaAparecida3],
      },
    ],
    meta: {
      title: "Garrafa Térmica Fresh Aparecida em Aquarela 650ml - 74% OFF",
      description: "Garrafa Térmica Fresh com estampa Nossa Senhora Aparecida em Aquarela. 650ml, aço inox, mantém fria por 24h. Frete grátis.",
    },
  },
  {
    id: "rel-pallyjane",
    slug: "relogio-masculino-pallyjane",
    name: "Relógio Masculino à Prova D'água Pallyjane Quartz Aço Inox - Edição Submariner",
    shortName: "Relógio Pallyjane Submariner",
    tagline: "À prova d'água · Aço Inox · Quartz Suíço",
    price: 23.99,
    oldPrice: 69.9,
    discount: 66,
    rating: 4.7,
    reviews: 2400,
    reviewsTotal: 2400,
    sold: 16900,
    freeShipping: true,
    images: [relogio1, relogio2, relogio3, relogio4],
    colorOptions: [
      { label: "Dourado/Verde", images: [relogio1], stock: 5 },
      { label: "Prata/Verde", images: [relogio2], stock: 3 },
      { label: "Dourado", images: [relogio3], stock: 4 },
      { label: "Dourado/Vermelho", images: [relogio4], stock: 2 },
    ],
    description: {
      intro: "Por que escolher o Relógio Pallyjane Submariner?",
      features: [
        ["À Prova D'água (3 ATM)", "Resistente a respingos, chuva e lavagem das mãos. Garante durabilidade no dia a dia."],
        ["Movimento Quartz Suíço", "Precisão e confiabilidade reconhecidas mundialmente, com bateria de longa duração."],
        ["Pulseira em Aço Inox", "Robusta, anti-alérgica e com catraca giratória de fácil ajuste para qualquer pulso."],
        ["Design Inspirado no Submariner", "Visual elegante e atemporal que combina com qualquer ocasião — do casual ao social."],
        ["Caixa de 40mm", "Tamanho ideal para o pulso masculino, com bezel giratório e visor de data."],
        ["Disponível em duas cores", "Escolha entre dourado com fundo verde vibrante ou prata com fundo azul sofisticado."],
      ],
      specs: [
        "Mecanismo: Quartz (origem Suíça)",
        "Diâmetro da caixa: 40mm",
        "Espessura: 12mm",
        "Material da caixa: Aço Inoxidável",
        "Pulseira: Aço Inox · 22cm com catraca giratória",
        "Resistência à água: 3 ATM (uso diário)",
        "Visor: Cristal mineral antirreflexo",
        "Função: Horas, minutos, segundos e calendário",
        "Garantia: 90 dias contra defeitos de fabricação",
      ],
      idealFor: [
        "Uso diário — trabalho, casual e social",
        "Reuniões de negócios e ocasiões especiais",
        "Presente sofisticado para namorado, marido ou pai",
        "Quem busca elegância sem abrir mão do conforto",
      ],
      includes: [
        "1 Relógio Masculino Pallyjane",
        "1 Caixa exclusiva para presente",
        "1 Manual de instruções",
        "1 Almofada de proteção",
        "Garantia de 90 dias",
      ],
    },
    reviewsList: [
      {
        initial: "C",
        name: "Carlos M.",
        date: "06 abr. 2026",
        text: "Chegou super rápido e muito bem embalado!! Simplesmente apaixonado!! Ele é muito lindo mesmo, fundo verde fica incrível ao vivo. Recomendo demais!",
        photos: [relogioReview1, relogioReview3],
      },
      {
        initial: "F",
        name: "Fernanda S.",
        date: "04 abr. 2026",
        text: "Comprei pro meu marido, ele amou! Acabamento impecável, pulseira firme. Veio na caixinha bonita pronta pra presentear.",
        photos: [relogioReview2],
      },
      {
        initial: "R",
        name: "Roberto L.",
        date: "03 abr. 2026",
        text: "Belo produto. Excelente qualidade pelo preço. Já tomou banho de chuva e nem marcou. Estou usando todo dia até pra dirigir.",
        photos: [relogioReview4],
      },
      {
        initial: "A",
        name: "Ana Paula R.",
        date: "01 abr. 2026",
        text: "Comprei os dois (verde e azul) pra mim e meu irmão. São ainda mais bonitos pessoalmente. Chegaram antes do prazo, super bem embalados ☺️",
        photos: [relogioReview5, relogioReview3],
      },
      {
        initial: "J",
        name: "João Pedro A.",
        date: "31 mar. 2026",
        text: "Ótimo relógio, muito elegante. Tamanho perfeito no pulso, peso bom, parece bem mais caro do que custou. Uso até no trabalho. Recomendo!",
        photos: [relogioReview6, relogioReview1],
      },
    ],
  meta: {
      title: "Relógio Masculino Pallyjane à Prova D'água - Aço Inox 66% OFF",
      description: "Relógio Masculino Pallyjane Submariner com 66% OFF. À prova d'água, aço inox, frete grátis e envio imediato.",
    },
  },
  {
    id: "boombox-aiwa-200w",
    slug: "caixa-de-som-boombox-plus-aiwa-200w",
    name: "Caixa de Som Aiwa Boombox Plus com 3 Alto-falantes Bivolt e Proteção IP66 - 200W RMS",
    shortName: "Caixa de Som Aiwa Boombox Plus 200W",
    tagline: "200W RMS · Bluetooth 5.3 · IP66 · Até 30h de bateria",
    price: 69.9,
    oldPrice: 497.9,
    discount: 86,
    rating: 4.9,
    reviews: 64,
    reviewsTotal: 64,
    sold: 9831,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/sg-11134201-7rff9-m4ep3f8n12n686",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rfhg-m4ep3hppep2o7c",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rfh1-m4ep3khbbitgce",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rfh1-m4ep3mzhnlc840",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rfgh-m4ep3pbaae0k29",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rfgh-m4ep3s4a56r807",
    ],
    description: {
      intro:
        "Curta um som potente e de alta definição com a Boombox Plus AWS-BBS-01-B! Sistema de som de 3 vias (1 subwoofer, 2 midrange e 2 tweeters), 2 radiadores passivos laterais, 200W RMS de potência e o DNA japonês da AIWA. Com certificado IP66, leva pra piscina, praia ou churrasco sem preocupação.",
      features: [
        ["Som de Alta Definição com 3 Vias", "Sistema 3-Way: 1 subwoofer, 2 midrange e 2 tweeters + 3 amplificadores dedicados (graves, médios e agudos). Resposta de 20Hz a 20KHz com vocais cristalinos e zero distorção."],
        ["200W RMS de Potência Real", "Graves profundos e som impactante. Tecnologia Energy Saving mantém os 200W mesmo na bateria, longe da tomada."],
        ["Proteção IP66: Água + Poeira", "Resistente a jatos potentes de água e proteção total contra poeira. Pode usar na beira da piscina ou na praia sem medo."],
        ["Até 30 Horas de Bateria", "Curta o dia inteiro e a noite adentro sem recarregar (50% do volume e luzes desligadas)."],
        ["Bluetooth 5.3 + Função TWS", "Pareamento rápido e estável. Sincronize duas Boombox Plus com a tecnologia TWS e duplique a potência sonora."],
        ["Alça de Transporte Reforçada", "Leve seu som favorito pra qualquer lugar com facilidade e estilo."],
      ],
      specs: [
        "Potência: 200W RMS",
        "Sistema: 3 vias (1 subwoofer + 2 midrange + 2 tweeters)",
        "Radiadores passivos laterais: 2",
        "Conectividade: Bluetooth 5.3, USB, P2",
        "Resposta de frequência: 20Hz - 20KHz",
        "Bateria: até 30 horas de uso",
        "Proteção: IP66 (água e poeira)",
        "Bivolt (110V/220V)",
        "Função TWS (True Wireless Sound)",
        "App AIWA Brasil compatível",
        "Dimensões: 48,4 x 26,1 x 21,1 cm",
        "Peso: 6,277 kg",
        "Homologação Anatel: 13069-23-11704",
        "Garantia do fabricante: 12 meses",
      ],
      idealFor: [
        "Festas em casa, churrascos e reuniões",
        "Beira de piscina, praia e área externa",
        "Viagens, camping e trilhas",
        "Quem busca som potente com qualidade japonesa AIWA",
      ],
      includes: [
        "1 Caixa de Som Boombox AIWA AWS-BBS-01-B",
        "1 Cabo de carregamento de força (AC)",
        "1 Cabo de áudio P2-P2",
        "1 Manual de Instruções",
      ],
    },
    reviewsList: [
      {
        initial: "P",
        name: "Paulo T.",
        date: "25 nov. 2025",
        text: "Produto muito top! Estou super satisfeito, já conhecia a Aiwa desde os anos 80, o som é muito bom e o aplicativo funciona direitinho. Quem comprar não vai se arrepender.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhhgljzslu6a1e",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhhglk02v9j565",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhhglk02wo3le5",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhhglk02y2o1f4",
        ],
      },
      {
        initial: "A",
        name: "Adriana M.",
        date: "29 dez. 2025",
        text: "Ótima, estou gostando bastante. Não perde pra JBL. Se você está a procura de uma boombox mais acessível, super indico a Aiwa.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-miupbgaho45d48",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-miupbgahpiptbc",
        ],
      },
      {
        initial: "H",
        name: "Herackson S.",
        date: "14 nov. 2025",
        text: "Muito bom, gostei muito da caixa. Som potente e visual incrível.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh23sbsehog432",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh23sbsdmryf07",
        ],
      },
      {
        initial: "V",
        name: "Valdiney S.",
        date: "05 nov. 2025",
        text: "Chegou tudo certo, embalagem original do produto e bem antes do prazo informado. Já fiz o teste e está funcionando tudo certinho. Recomendo!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgdo3o9umnt06a",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgpqskgdzldxac",
        ],
      },
      {
        initial: "L",
        name: "Leandro B.",
        date: "07 jan. 2026",
        text: "Estou super feliz com a minha Aiwa. Ótima potência, graves muito bons, bateria dura bastante. Vale cada centavo.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj797hsr37k22e",
        ],
      },
      {
        initial: "C",
        name: "Cássio N.",
        date: "02 dez. 2025",
        text: "Top demais, só curtir ela! Som limpo e potente, recomendo demais.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhrv3luugo3l11",
        ],
      },
    ],
    meta: {
      title: "Caixa de Som Aiwa Boombox Plus 200W IP66 - 86% OFF",
      description: "Caixa de Som Aiwa Boombox Plus 200W RMS com Bluetooth 5.3, IP66 e até 30h de bateria. 86% OFF, frete grátis e envio imediato.",
    },
  },
  {
    id: "famosinho-25",
    slug: "kit-mochila-rebecca-bonbon-lancheira-termica-estojo-box-esco",
    name: "Kit Mochila Rebecca Bonbon - Lancheira Térmica + Estojo + Box Escolar Nova Coleção Exclusiva Juvenil",
    shortName: "Kit Mochila Rebecca Bonbon - Lancheira Térmica +",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 69.9,
    oldPrice: 489.9,
    discount: 86,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 12569,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhqna6evm0oz72",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhtcvq48bawyab",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhtcvq49yarled",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhtcvq49zpc1d5",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhqna6evkm4j7c",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhqna6evezurf2",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhqna6evdlabbd",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhqna6evj7k354",
    ],
    description: {
      intro: "KIT MOCHILA ESTOJO E LANCHEIRA REBECCA BONBON - COLEÇÃO 2026 EXCLUSIVA!!!!",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "- Revestimento interno: Poliéster",
        "- 2 em 1: Transversal ou Costas",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Kit Mochila Rebecca Bonbon - Lancheira Térmica +",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "V",
        name: "Valeriadsouza",
        date: "03 jan. 2026",
        text: "Confesso que eu estava com medo dessa compra de não vir um produto original, mesmo assim vendo os comentários fiz a compra e entrei em contato com o vendedor que prontamente me respondeu enviou rápido e chegou na data certa,minha filha amou e eu também compraria outra recomendo a loja e o vendedor!\nMuito obrigado satisfeita com o produto , lindo e original recomendo sim a mochila é grande e muito bem feita.😍😍😍😍😍😍",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj1ywhp0kzczb6",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj1ywhp4wwea07",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj1ywhp3z6rm39",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj1ywhp0i6838a",
        ],
      },
      {
        initial: "P",
        name: "Polyanasilva",
        date: "07 jan. 2026",
        text: "Simplesmente apaixonada nessa mochila e sem falar que a minha filha amou muito é a caisa mais linda e sem falar que é muito espaçosa por dentro veio tudo certinho bolsa, lancheira, estojo, garrafa, caderno e o gloss, de verdade só comprem.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj72ufvsiewx15",
        ],
      },
      {
        initial: "C",
        name: "Cliente D.",
        date: "07 jan. 2026",
        text: "Excelente,minha filha ficou apaixonada com a mochila Rebecca Bonbon dela🥰obrigada ao vendedor que tirou todas as minhas dúvidas e foi muito educado e atencioso no atendimento.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj71al1lvegxd7",
        ],
      },
      {
        initial: "J",
        name: "Joseronaldodefrana",
        date: "01 jan. 2026",
        text: "Amo os produtos da Rebecca bombom, são de excelente material,todo ano renovo  os materiais das minhas netas e a cada lançamento uma paixão a mas,super recomendo.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-miylwqpmg7i90b",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-miylwqpmhm2pb5",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-miylwqpmj0n5d9",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-miylwqpmkf7lc2",
        ],
      },
      {
        initial: "A",
        name: "Annaclaratrindade",
        date: "07 jan. 2026",
        text: "Perfeita. Comprei para minha irmã e superou as expectativas. Amei muito, fora que vem gloss, caderno, garrafinha. Comprem! Vcs não vão se arrepender.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj743ts6ghs1af",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj743ts9b18idb",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj743trzcufa90",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj743trlz1mpca",
        ],
      },
      {
        initial: "J",
        name: "Jeniferserpa",
        date: "06 jan. 2026",
        text: "Muito linda excelente qualidade \nA garrafinha veio com o nome descascado \nE o caderno amassado a capa \nA mochila rosa veio com uma garrafa roxa",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj5gdzttqcqpa7",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj5gdztyncauc9",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj5gdztyoqvaa4",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj5gdztyq5fq26",
        ],
      },
    ],
    meta: {
      title: "Kit Mochila Rebecca Bonbon - Lancheira Térmica + - 86% OFF",
      description: "Kit Mochila Rebecca Bonbon - Lancheira Térmica + com 86% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-6",
    slug: "ar-condicionado-portatil-hq-8500-btuh-frio-monofasico-branco",
    name: "Ar Condicionado Portátil HQ 8.500 BTU/h Frio Monofásico Branco HQ-AP8500FW",
    shortName: "Ar Condicionado Portátil HQ 8.500 BTU/h Frio",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 92.8,
    oldPrice: 754.44,
    discount: 88,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 10241,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/sg-11134201-7renf-m8lxuc60fdsy07",
      "https://down-br.img.susercontent.com/file/sg-11134201-7repp-m8lxud0972qv79",
      "https://down-br.img.susercontent.com/file/sg-11134201-7reoc-m8lxudu7z89j44",
      "https://down-br.img.susercontent.com/file/sg-11134201-8227g-mhkxkgtvi5mwf1",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rens-m8lxufoja6jr3c",
      "https://down-br.img.susercontent.com/file/sg-11134201-7reoo-m8lxugjw0bypad",
      "https://down-br.img.susercontent.com/file/sg-11134201-7reox-m8lxuh5t5mlj2f",
    ],
    description: {
      intro: "Ar Condicionado Portátil HQ 8.500 BTU/h Frio Monofásico Branco HQ-AP8500FW",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "- Modos de operação: Resfriamento, desumidificação e ventilação.",
        "- Refrigerante R32: Mais eficiente e ambientalmente responsável.",
        "- Portátil e fácil de instalar: Ideal para qualquer lugar.",
        "Marca: HQ",
        "Tipo: Portátil",
        "Cor: Branco",
        "Modelo: HQ-AP8500FW",
        "Capacidade: 8.500 BTUs",
        "Disponivel nas voltagens: 127V e 220V( Não é Bivolt)",
        "Potência: 127V/900W",
        "Potência: 220V/800W",
        "Área Ideal(m): Até 12",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Ar Condicionado Portátil HQ 8.500 BTU/h Frio",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "C",
        name: "Carolinleal",
        date: "27 nov. 2025",
        text: "Primeiramente quero dizer que o produto é bom e que cumpre o que promete.\n\nMas vamos pra parte chata né, porque nem tudo são flores...\nEu sou de Anápolis-GO, fiz o pedido dia 12 de outubro, só chegou dia 25 depois de muita luta e reclamação. A data prevista era dia 19 ou 21.\nSendo que o serviço ao cliente é péssimo, eles só respondem quando querem. Passei dias e dias mandando mensagens. A transportadora é outra também que não dá suporte nenhum!\nA caixa chegou toda amassada, molhada e cheia de mofo, por sorte não danificou o produto.\nEu super indico o PRODUTO, mas NÃO INDICO a loja. Deixou muito a desejar tanto no suporte quanto na entrega!\nTive que reclamar até em Live, coisa que nunca fiz usando a plataforma da shopee, essa foi a primeira vez.\n\nVolto a dizer o PRODUTO É ÓTIMO, mas a LOJA É PÉSSIMA. \nFICA AQUI MINHA INDIGNAÇÃO!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhkes534blzadb",
        ],
      },
      {
        initial: "M",
        name: "Mercuribr",
        date: "30 set. 2025",
        text: "O ar-condicionado chegou pela transportadora, bem embalado e dentro do prazo previsto para entrega, está funcionando e gelando normalmente e faz o mesmo barulho de um ventilador do tamanho de 40 centímetros, botei sobre um tapete de borracha pra evitar trepidação, mas esse tubo sanfonado do exaustor e um trambolho e deu muito trabalho para instalar, pois é muito grosso e às placas metálicas não se encaixam bem na janela de alumínio e o vendedor não me ajudou a resolver o problema (A loja tem péssimo atendimento pós-venda) e tive que contratar um profissional para parafusar a placa e armengar com fita adesiva. Veja no vídeo. Espero que dure anos como o meu Springer Midea.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mf9nkuief6dg5f",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mf9nkuihqkn964",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mf9nkuihrz7p1a",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mf9nkuihtds5a0",
        ],
      },
      {
        initial: "W",
        name: "William",
        date: "17 nov. 2025",
        text: "Não recomendo, pelo valor já esperava algo de qualidade duvidosa (paguei 1.380 no total) mas conseguiu exceder pra pior minhas expectativas negativas, qualidade de construção baixa, isolamento acústico inexistente, barulhento e irritante, em relação ao gelar está de acordo com os 8.500 BTUs, funciona bem, mas o resto deixa a desejar, tenho um de 12.000 BTUs da Electrolux que é 70% mais silencioso e infinitamente mais bonito, meu conselho é \"guarde um pouco mais de dinheiro e compre um modelo melhor de uma marca conceituada\", espero ter ajudado.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh67vnm7pr0ka1",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh67vnm7r5l0c7",
        ],
      },
      {
        initial: "P",
        name: "Pmlcduu",
        date: "10 dez. 2025",
        text: "Fiquei preocupado com algum comentários, mas me surpreendeu. Não é barulhento como disseram o motor em bem silencioso, somente o ventilador que joga o vento em sua direção que ao passar pelo filtro de limpeza emite um som como de um ventilador de mesa. Deve ser porque alguns usam ar condicionado Split e estão acostumados a zero barulho. É econômico no consumo de energia e tem controle e timer.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mi36bqlvkmwy4b",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mi36bqm1rz7lcc",
        ],
      },
      {
        initial: "A",
        name: "Anylouren",
        date: "15 dez. 2025",
        text: "Ele resfria bem pequenos ambientes, se vc colocar no mínimo que é 17 e no botão cool, é como se um ar condicionado de parede estivesse ligado no 24. O ambiente não vai virar um freezer, mas vai ficar um ambiente agradável. Pelo custo benefício vale a pena, em dias muito quentes talvez não supra a demanda, se vc mora em cidade que faz 40 graus eu recomendaria comprar com a potência maior.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-miadg4qhbtom4a",
        ],
      },
      {
        initial: "A",
        name: "Allan",
        date: "02 nov. 2025",
        text: "Produto muito bom muito bem só que tem alguns pontos a ser levado em consideração que eu acho que a fabricante deveria mudar o ponto de exaustor poderia ser de lado porque só assim otimizaria para colocar em canto de parede ou algo o ponto também de descarga da água que é muito ruim no é muito baixo não dá para colocar objeto nenhum para coletar água então é terrível.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgksotfb9dkwb8",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgksotfbas5c46",
        ],
      },
    ],
    meta: {
      title: "Ar Condicionado Portátil HQ 8.500 BTU/h Frio - 88% OFF",
      description: "Ar Condicionado Portátil HQ 8.500 BTU/h Frio com 88% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-7",
    slug: "ar-condicionado-portatil-wi-fi-12000-btus-frio-ap-12cwbrnps0",
    name: "Ar-Condicionado Portátil Wi-Fi 12.000 btus Frio AP-12CWBRNPS01 Hisense 127V",
    shortName: "Ar-Condicionado Portátil Wi-Fi 12.000 btus Frio",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 249,
    oldPrice: 1459,
    discount: 83,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 10021,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m32j3gjvsxlfbf",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m32j3gjvuc5v82",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m32j3gjvvqqb95",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m32j3gjvx5arbd",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m32j3gjvyjv7cc",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m32j3gjvzyfn2a",
    ],
    description: {
      intro: "Ar Condicionado Portátil Eletrônico Wi Fi Hisense 12000 BTUs Frio AP-12CWBRNPS01 - 127V",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "Garantia: 12 meses.",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Ar-Condicionado Portátil Wi-Fi 12.000 btus Frio",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "J",
        name: "Janemeal",
        date: "14 fev. 2025",
        text: "O aparelho é bom, refrigera bem o quarto.\nO aplicativo torna a sua utilização ainda mais prático e usamos o app até mais do que o controle remoto que, por sinal, faltou uma iluminação noturna para poder enxergar as funções.\nO sistema de evaporação de água funciona bem, o reservatório não enche de jeito nenhum quando usando apenas na função de refrigerar.\nRealmente ele faz bastante barulho, levou uma semana para acostumar. Na primeira noite com ele ligado incomodou bastante. Não é barulho parecido com ventilador não, é bem alto mesmo, comparado àqueles aparelhos de ar condicionado de janela, mal dá para ouvir a TV ou conversar com alguém sem aumentar o tom de voz.\nEnfim, como é inviável a instalação de outro modelo tipo split aqui em casa, esse portátil tem atendido.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m68hfyp1u7jm7a",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m68hfyp1vm425a",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m68hfyp1x0oif4",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m68hfyp1yf8ybc",
        ],
      },
      {
        initial: "G",
        name: "Gustavo A.",
        date: "24 mar. 2025",
        text: "Gostei muito do ar! Se o ambiente estiver fechado fica bem frio, para uma melhor experiência baixem o aplicativo e reculem ele por lá, lá tem várias opções de arrefecimento  e gela muito rápido além de ter o modo balanço entre outros\nCURIOSIDADES DE MUITOS: sobre o barulho, ele não faz, ou melhor, parece um ventilador ligado ( o meu ventilador faz mais barulho ) \nCONTA DE LUZ: vem sim a+ até porque vc usa ele, mas nada demais.\nINSTALACAO: Eu uso ele no meu quarto e escritório então consigo mover ele para vários lugares, bem prático\nAPLICATIVO: Tem conexão com a alexa então facilita muuuuito mais também.\nELE REALMENTE GELA?: Simmmmmmmmmmmmmmmmmmmmmmmmmm melhor compra!!!!!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m7qoz8d115ec1c",
        ],
      },
      {
        initial: "R",
        name: "Rebecanunesf",
        date: "24 fev. 2025",
        text: "chegou bem antes do prazo de entrega, eternamente grata! \ne sim, vale a pena SIM pra quem mora em ap que não permite instalação de ar! \nestou usando pela primeira vez e não é um milagre, nao é como um ar de parede, mas também nao dá pra dizer que é jogar dinheiro fora ou que é “igual um climatizador”, porque nao é mesmo. pra quem tá sofrendo com o calor, eu super recomendo.\n\nquanto a barulho, creio que quem se incomoda deve ser muito sensível a sons porque eu achei beem tranquilo. porem, morando em sao paulo, qualquer ruído branco em casa é bom pra disfarçar o barulho da rua hehe \n\nem resumo, não me arrependo da compra e recomendo!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m6mps9b067hjfa",
        ],
      },
      {
        initial: "K",
        name: "Kathelin G.",
        date: "23 fev. 2025",
        text: "Uma ótima compra! O produto é realmente bom, num ambiente de 8m2 chegou a 22°C numa noite bem quente, o que foi suficiente para dormir de cobertor. Num ambiente maior como uma sala de 25m2 não chega a gelar, mas dá uma equilibrada no ambiente, ficando confortável com as ondas que calor que está havendo no país. Tem 3 modos de uso, ventilador, do de redução de umidade e o de refrigerar. Me surpreendeu bastante o modo apenas de ventilador, bem forte e suficiente para dias quentes, sem precisar ligar o modo \" ar condicionado\" mesmo. Bem legal! Ótimo!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m6lfd8le9ufb7d",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m6lfd8leb8zr4a",
        ],
      },
      {
        initial: "P",
        name: "Patyregis",
        date: "20 mar. 2025",
        text: "Excelente ar condicionado ele demora um pouquinho para gelar o ambiente, porém gela muito e é muito prático, não precisei de ninguém para instalar lí o manual e eu mesma instalei para instalar o split foi r$ 800! Agora esse é o xodozinho meu split deu problema e minha filha que é autista tava sofrendo muito com esse calor, mais que nós que também estávamos. O quarto mede 4,50x5,00 metros e gela muito bem. O wifi funciona certinho, o controle é simples mas atende muito bem. Espero que dure muito esse ar.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m7l9yh246jpe2b",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m7l9yh247y9u45",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m7l9yh249cua0c",
        ],
      },
      {
        initial: "A",
        name: "Adrianadelvaller",
        date: "14 dez. 2024",
        text: "Super aprovado, chegou em 3 dias muito bem embalado, gela muitoooo mesma coisa que um split, só que faz um pouco mais de barulho, mas nada que atrapalhe (no meu vídeo está ligado para vocês escutarem o barulho) é compatível com alexa, nao precisa drenar e em relação ao consumo eletrico, a corrente nominal é de 12 amperes precisando apenas de uma tomada de 20A. Muito bom, recomendo",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m3s53uauo1thcb",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m3s53uaupgdxf8",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m3s53uauquyda2",
        ],
      },
    ],
    meta: {
      title: "Ar-Condicionado Portátil Wi-Fi 12.000 btus Frio - 83% OFF",
      description: "Ar-Condicionado Portátil Wi-Fi 12.000 btus Frio com 83% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-10",
    slug: "piscina-borda-inflavel-capacidade-1000-litros-pixlar",
    name: "Piscina Borda Inflável Capacidade 1000 Litros Pixlar",
    shortName: "Piscina Borda Inflável Capacidade 1000 Litros",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 69.99,
    oldPrice: 139.99,
    discount: 50,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 10004,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/sg-11134201-82260-mhoz9j95dloj8d",
      "https://down-br.img.susercontent.com/file/sg-11134201-8225r-mhoz9jwwdyiwcc",
      "https://down-br.img.susercontent.com/file/sg-11134201-8225w-mhoz9khalkarfb",
      "https://down-br.img.susercontent.com/file/sg-11134201-8225o-mhoz9lerlr7m4c",
      "https://down-br.img.susercontent.com/file/sg-11134201-82254-mhoz9m6v8irm20",
      "https://down-br.img.susercontent.com/file/sg-11134201-82280-mhoz9mzl6o0527",
      "https://down-br.img.susercontent.com/file/sg-11134201-8225b-mhoz9nj5l3wl23",
    ],
    description: {
      intro: "Seja Bem-Vindo(a) ao nosso canal de vendas de Peças de Bicicletas.",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "> Fácil de montar e desmontar: não precisa de ferramentas.",
        "> Compacta e prática para guardar: ocupa pouco espaço quando vazia.",
        "> Diversão garantida para todas as idades: ideal para momentos em família..",
        "Marca: Pixlar",
        "> Diâmetro: 1,68m.",
        "> Altura: 62cm.",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Piscina Borda Inflável Capacidade 1000 Litros",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "A",
        name: "Anônimo",
        date: "21 dez. 2025",
        text: "Comprei a piscina para minha mãe, ela gostou muito, veio em perfeito estado, bem parecido com anúncio, chegou antes do prazo, podem comprar sem medo, vídeo aleatório só para ganhar pontos.❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-miiy5j6jkrnl8e",
        ],
      },
      {
        initial: "J",
        name: "Julianeflix",
        date: "05 dez. 2025",
        text: "Comprei de presente pra minhas sobrinhas, amaram demais! Valeu super a pena, chegou muito rápido tbm. Comprem sem medo 💪🏾",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhvgrzxk8xky9d",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhvgrzxkac5eec",
        ],
      },
      {
        initial: "A",
        name: "Anasilvavieirasilva",
        date: "13 dez. 2025",
        text: "Chegou tudo bem embalado tudo ok. Maravilhosa essa piscina,material excelente qualidade. Recomendo muito 😉",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mi7gpjiam4ubb0",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mi7gpjidi2v5f7",
        ],
      },
      {
        initial: "N",
        name: "Nathaliaeduarda",
        date: "17 dez. 2025",
        text: "Ainda não abri então não posso falar da qualidade, mas a entrega foi super rápido! Parabéns ao vendedor",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mid61zo3y5mqb7",
        ],
      },
      {
        initial: "R",
        name: "Roseneidealmeida",
        date: "20 dez. 2025",
        text: "Minha filha amou ,o ano inteiro pedindo uma piscina ,finalmente chegou o dia de realizar \nAmei ❤️",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mih955jb0idf19",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mih955jjvda9a8",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mih955jjwrup33",
        ],
      },
      {
        initial: "M",
        name: "Milapantojadossantos",
        date: "10 dez. 2025",
        text: "Chegou hj bem embalada, a entrega n demorou, veio com todos os manuais de instruçao com ela😊",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mi34exqoj8xu97",
        ],
      },
    ],
    meta: {
      title: "Piscina Borda Inflável Capacidade 1000 Litros - 50% OFF",
      description: "Piscina Borda Inflável Capacidade 1000 Litros com 50% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-3",
    slug: "bicicleta-ergometrica-fitness-para-cardio-e-musculacao-6kg-i",
    name: "Bicicleta Ergométrica Fitness para Cardio e Musculação 6kg Inercia com base Cor Preto e Vermelho Marca Sevenfit",
    shortName: "Bicicleta Ergométrica Fitness para Cardio e",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 147,
    oldPrice: 1094,
    discount: 87,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 10000,
    freeShipping: true,
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_2X_679526-MLA100501405537_122025-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_870423-MLA92702191632_092025-F.jpg",
      "https://http2.mlstatic.com/D_NQ_NP_2X_940421-MLA100012455152_122025-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_778730-MLA100501356013_122025-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_943084-MLA100012455164_122025-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_968531-MLA100011911876_122025-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_797980-MLA100012365712_122025-F.webp",
    ],
    description: {
      intro: "Bora começar a melhorar sua qualidade de vida!",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "Categoria do produto: vertical",
        "Método de ajuste de resistência: feltro de lã",
        "Função lcd: varredura, tempo, calorias, velocidade, distância, modo scan",
        "Programa: perda de peso, condicionamento físico",
        "Tamanho da embalagem: 86x 20 x 74cm",
        "Peso líquido: 19kg",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Bicicleta Ergométrica Fitness para Cardio e",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
    ],
    meta: {
      title: "Bicicleta Ergométrica Fitness para Cardio e - 87% OFF",
      description: "Bicicleta Ergométrica Fitness para Cardio e com 87% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-1",
    slug: "caixa-de-som-boombox-3-bluetooth-preta-jbl",
    name: "Caixa De Som Boombox 3 Bluetooth Preta Jbl",
    shortName: "Caixa De Som Boombox 3 Bluetooth Preta Jbl",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 149,
    oldPrice: 899,
    discount: 83,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 10000,
    freeShipping: true,
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_2X_932616-MLA99475097854_112025-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_866750-MLU74810519490_032024-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_711382-MLU74945500283_032024-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_699104-MLU74810012176_032024-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_880946-MLU75980414337_042024-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_721498-MLA74670647272_022024-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_755160-MLA74670637314_022024-F.webp",
    ],
    description: {
      intro: "Acabamos de tornar a nossa mais poderosa caixa de som Bluetooth portátil ainda melhor!",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "Produto novo na embalagem original",
        "Garantia do fabricante",
        "Envio imediato",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Caixa De Som Boombox 3 Bluetooth Preta Jbl",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
    ],
    meta: {
      title: "Caixa De Som Boombox 3 Bluetooth Preta Jbl - 83% OFF",
      description: "Caixa De Som Boombox 3 Bluetooth Preta Jbl com 83% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-55",
    slug: "caixa-de-som-original-alaxe-echo-dot-5-geracao-com-envio-ime",
    name: "Caixa de som original Alaxe Echo Dot 5 geração com envio imediato e melhor preço",
    shortName: "Caixa de som original Alaxe Echo Dot 5 geração",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 69.9,
    oldPrice: 397.9,
    discount: 82,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 9876,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mgby6v6yabr9ad",
      "https://down-br.img.susercontent.com/file/sg-11134201-825a6-mg3g87ts0kjw2a",
      "https://down-br.img.susercontent.com/file/sg-11134201-82598-mg3g85tgpclpdf",
      "https://down-br.img.susercontent.com/file/sg-11134201-825b4-mg3g8iyxzmyzcc",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mgby6v6y8x6t86",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mg7ohzwnc3k5dc",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mg7ohzwnoqo59a",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mg7ohzwnkiyt6f",
    ],
    description: {
      intro: "Caixa de Som Bluetooth com LED e Compatível com Alexa - Potência 5W",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "Função Extra: Conecte 2 Caixas Simultaneamente",
        "Bluetooth: Versão 5.0",
        "Potência de saída: 5W",
        "Capacidade da bateria: 1200mAh",
        "Tensão de trabalho: DC 3.7V",
        "Tensão de carregamento: DC 5V",
        "Tempo de carga: 2-3h",
        "Tempo de reprodução: 2-5h",
        "Alto-falante: 52mm",
        "Sensibilidade de entrada: 400mv",
        "Separação: > 90db",
        "Relação sinal/ruído: > 80db",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Caixa de som original Alaxe Echo Dot 5 geração",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "I",
        name: "Itakatrinaanjobranco",
        date: "19 dez. 2025",
        text: "Chegou tudo certinho,  está funcionando o Bluetooth,  só falta baixar o aplicativo Alexia e configurar, como é para presente 🎁 só vou saber se está funcionando o Alaxe quando eu for configurar no celular da pessoa que vou dá de presente,  no momento está tudo ok, espero que esse aparelho tenha durabilidade boa.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-miflff2yyn7m9f",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-miflff2z01s2ca",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-miflff2z1gci0d",
        ],
      },
      {
        initial: "A",
        name: "Andy F.",
        date: "25 fev. 2026",
        text: "Tentei fazer um vídeo com ela tocando , mas não deu... Adorei... Chegou rapidinho. \nEla poderia ter sido embalada num plástico bolha ou com um adesivo de FRÁGIL, pois o entregador aqui, \"deixou\" ela no chão, porque eu não estava no momento da entrega.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztw-ml513fhfpaf829",
        ],
      },
      {
        initial: "M",
        name: "Miriam",
        date: "27 nov. 2025",
        text: "E excelente, compre pra ficar na casa da minha mãe, ela ja é idosa ai com o comando  de voz ja fica mais fácil  pra fazer ligações,  vou acabar de configurar,obrigado aos vendedores e obrigado a shopee",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhkggktrtsea2f",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhkggktrv6yq66",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhkggktrwlj675",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mhkggktry03md9",
        ],
      },
      {
        initial: "R",
        name: "Renansoareds",
        date: "18 nov. 2025",
        text: "Produto assim como na descrição,  realmente dá pra quebrar um galho,  cabo tipo USB-C não aparece nas informações. Lembrando que tem que baixar o app da alexa e fazer o cadastro.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh7sind7zls784",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh7sind810cnf9",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh7sind82ex3a2",
        ],
      },
      {
        initial: "D",
        name: "Daviamassapc",
        date: "04 jan. 2026",
        text: "Muito boa só engana falando que é uma encho dor 5 é só uma caixa de som normal que dá pra conectar no Google e na Siri pra ter uma assistente mas tirando isso é um bom produto",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj2yfncg03yeb4",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj2yfncfj95203",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj2yfncf57gm23",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mj2yfncer5s63a",
        ],
      },
      {
        initial: "A",
        name: "Alinepontes",
        date: "03 fev. 2026",
        text: "Recebido. Ainda não testei. Mas é bem leve a caixinha.  Vem cabo USB e tipo C. Eu pedi cor aleatória e gostei dessa vermelha.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk9rrngpm9s04a",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk9rrngrvqpt69",
        ],
      },
    ],
    meta: {
      title: "Caixa de som original Alaxe Echo Dot 5 geração - 82% OFF",
      description: "Caixa de som original Alaxe Echo Dot 5 geração com 82% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-54",
    slug: "caixa-de-som-joog-one-hifi-j-200w-com-2-mic-sfio-controle-re",
    name: "caixa de som Joog One Hifi J 200w Com 2 Mic s/fio Controle remoto Ip67 app E Tws",
    shortName: "caixa de som Joog One Hifi J 200w Com 2 Mic s/fio",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 69.9,
    oldPrice: 497.9,
    discount: 86,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 9876,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-mdgxfw79ifo1aa",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m7u2f3iw205e92",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m7u2f3iw4taa25",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-mdgxfw79ju8h15",
    ],
    description: {
      intro: "JOOG ONE HiFi JOF-01 Sinta o poder do som com o speaker Joog ONE HiFi JOF-01!",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "Produto novo na embalagem original",
        "Garantia do fabricante",
        "Envio imediato",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 caixa de som Joog One Hifi J 200w Com 2 Mic s/fio",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "C",
        name: "Carloss",
        date: "23 jun. 2025",
        text: "Não sei se o meu ouvido tá com problema mas acho o som da minha tribit stormbox blast melhor rs. O som é bom e tem um grave bom também, porém é difícil de equalizar e achar uma boa configuração porque o aplicativo não é tão responsivo quanto o da Tribit e as equalizações que vem são ruis. A caixa é tão elogiada por outras pessoas que eu achei que era um som fora de série mas é um som normal. Deixe um print com uma boa equalizacao que vai deixar o som melhor",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbbz2kmo9y494a",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbbz2kmobcopdf",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbbz2kmocr9528",
        ],
      },
      {
        initial: "H",
        name: "Hjhhhhhjhbbbbbhhhhhhhhhhh",
        date: "14 abr. 2025",
        text: "Top demais, fora de série mesmo eu já tava super satisfeito para ouvir com música som maravilhoso muito equilibrado e hoje coloquei no meu painel em cima da TV como mostra na foto, conectei o Bluetooth cara do céu para assistir um filme fica perfeito parece uma soundbar.. experimente fazer esse teste coloque bem no meio da TV ou em cima ou embaixo fica perfeito simplesmente isso perfeito.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8l0oqod2lg175",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8l0oqod400hea",
        ],
      },
      {
        initial: "F",
        name: "Fbiorodrigues",
        date: "08 abr. 2025",
        text: "Sensacional! Qualidade é muito além do que eu\nesperava, e o acabamento, é perfeito, muito bem\nconstruído. Podem comprar sem receio. \nna verdade, da surra em outros marcas super\nfamosas. Veio muito bem embalado. Entrega muito\nrápida, perfeito. Loja nota 10, postou a caixa de som 30 minutos depois que efetuei o pagamento. Parabéns para o vendedor.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8c1q8z3qar590",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8c1q8z3qadt06",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8c1q8z45qmp21",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8c1q8z4l6vld0",
        ],
      },
      {
        initial: "A",
        name: "Alexandromais",
        date: "23 jun. 2025",
        text: "Simplesmente falo compre comprem 😃 porque a caixa é um espetáculo mesmo galera 😊 vendedor é  💯 mesmo muito antecioso e pronto pra tirar qualquer dúvida possível também recomendo de olhos fechado a comprar nessa loja , e pra quem mora no nordeste melhor ainda , não tem frete melhor que aqui não viu 😃",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbcfkuhnccr3aa",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbcfkuhmww6x60",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbcfkuhnccft87",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbcfkuhmwwi7ef",
        ],
      },
      {
        initial: "D",
        name: "Dinorj",
        date: "20 jun. 2025",
        text: "O Som top não deixa a desejar melhor do que outras marcas boombox grave mto bom app w-king é compatível vc pode colocar + grave chegou tudo certo antes do previsto, vendedor nota 10.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mb88ot6fjke119",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mb88ot6fkyyh8c",
        ],
      },
      {
        initial: "P",
        name: "Pandajrrr",
        date: "27 jul. 2025",
        text: "Top, muito bem construída muito bem acabada . Pesada uns 10kg , som de boa qualidade. \nA entrega nao foi boa tanto a loja quanto a shopee vacilaram. Mas chegou .",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mcp1pohaxu0ib7",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mcp1pohaz8kyd5",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mcp1pohb0n5ec6",
        ],
      },
    ],
    meta: {
      title: "caixa de som Joog One Hifi J 200w Com 2 Mic s/fio - 86% OFF",
      description: "caixa de som Joog One Hifi J 200w Com 2 Mic s/fio com 86% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-51",
    slug: "purificador-eletronico-compacto-efficient-painel-digital-biv",
    name: "Purificador Eletrônico Compacto Efficient Painel Digital Bivolt Cinza (PE11X)",
    shortName: "Purificador Eletrônico Compacto Efficient Painel",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 69.9,
    oldPrice: 497.9,
    discount: 86,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 9876,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdxh-mdeoo0q0wuft89",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdvx-mdeoo1647uq221",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdxc-mdeoo1m7iwcqf1",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdye-mdeoo24srqp0de",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdxc-mdeoo2lg4s1o1a",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdyj-mdeoo31tff2445",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdwa-mdeoo3jup10q86",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdyj-mdeoo4a7nuy280",
    ],
    description: {
      intro: "Se você deseja ter água de qualidade e com um equipamento moderno e de design diferenciado, então pode apostar no Purificador de Água PE11X Electrolux.",
      features: [
        ["Bivolt (110V e 220V)", "Funciona automaticamente em qualquer tomada — leve para qualquer lugar do Brasil sem se preocupar com a voltagem."],
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "Voltagem: Bivolt automático (110V/220V)",
        "Produto novo na embalagem original",
        "Garantia do fabricante",
        "Envio imediato",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Purificador Eletrônico Compacto Efficient Painel",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "B",
        name: "Bebelrodrigues",
        date: "23 fev. 2026",
        text: "Apesar de ainda não ter instalado, eu tô muito feliz com a minha compra.Consegui pegar \"numa\" promoção por 509,00 reais e chegou muito rápido. Estava previsto pra chegar entre 4 e 11 de março, e chegou hj, dia 23/02. Agora é instalar e testar a pressão da água. Quando ele tiver no lugar eu volto pra dizer se é 100%",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81zu5-ml2457v5fwn58c",
          "https://down-br.img.susercontent.com/file/br-11134103-81zua-ml2457v5ei2p6b",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztp-ml2457v5hb7l57",
        ],
      },
      {
        initial: "D",
        name: "Du S.",
        date: "03 mar. 2026",
        text: "Estou muito feliz com minha compra, superou todas minhas espectativas, é muito lindo, e a água sai bem gelada! Amei, amei dimais e recomendo! Obrigada ao vendedor que teve o cuidado de embalar muito bem, e chegou antes do prazo!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-820md-mldni2z6o5j97c",
          "https://down-br.img.susercontent.com/file/br-11134103-820lo-mldni2z6qyo5a5",
        ],
      },
      {
        initial: "E",
        name: "Elisabethdasilvacruz",
        date: "23 fev. 2026",
        text: "Produto maravilhoso.. É o segundo q compro. O primeiro foi branco... Há 3 anos atrás e funciona bem até hj. Mas era bco. Só comprei outro p modernizar a cozinha.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81zuf-ml251685beo204",
        ],
      },
      {
        initial: "V",
        name: "Vanuzamoraes",
        date: "28 fev. 2026",
        text: "O purificador é lindooo, ainda não instalei, veio sem nenhum arranhão, bem embalado e a entrega foi super rápida, amei a minha compra ❤️",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-820l8-ml9ktt61epz8e2",
          "https://down-br.img.susercontent.com/file/br-11134103-820m5-ml9ktt5y0ikl89",
          "https://down-br.img.susercontent.com/file/br-11134103-820l9-ml9ktt5y1x517c",
        ],
      },
      {
        initial: "A",
        name: "Antoniojuniogarcia",
        date: "01 mar. 2026",
        text: "Excelente produto, muito satisfeito um problema em particular e se não tiver pressão da água da rua fica bem fraco a saída",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-820lg-mlar8i3ebgufa1",
          "https://down-br.img.susercontent.com/file/br-11134103-820lp-mlar8i3c67lweb",
          "https://down-br.img.susercontent.com/file/br-11134103-820m5-mlar8i3c7m6c14",
        ],
      },
      {
        initial: "E",
        name: "Evandra",
        date: "09 fev. 2026",
        text: "Gostei  recomendo  \n  Produto muito bom  amei voltarei a comprar  novamente  \nObrigada  a loja e ao vendedores",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mkig17w14hs2b9",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mkig17w15wcicd",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mkig17w17awyee",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mkig17w18phe89",
        ],
      },
    ],
    meta: {
      title: "Purificador Eletrônico Compacto Efficient Painel - 86% OFF",
      description: "Purificador Eletrônico Compacto Efficient Painel com 86% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-53",
    slug: "camera-instax-mini-12-fujifilm-filme-de-60-poses",
    name: "Câmera Instax Mini 12 FujiFIlm + Filme de 60 Poses",
    shortName: "Câmera Instax Mini 12 FujiFIlm + Filme de 60 Poses",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 69.9,
    oldPrice: 497.9,
    discount: 86,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 9875,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lydweugeyjad30",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lydweugeubl15f",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lydweugevq5h32",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lydweugex4px35",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lydweugezxut37",
    ],
    description: {
      intro: "Bem vindo a ImageShop, somos distribuidor de grandes marcas a 32 anos no mercado.",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "Produto novo na embalagem original",
        "Garantia do fabricante",
        "Envio imediato",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Câmera Instax Mini 12 FujiFIlm + Filme de 60 Poses",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "N",
        name: "Nathetic",
        date: "10 nov. 2025",
        text: "Um sonho sendo realizado, sempre quis ter uma instax, e ela é maravilhosa. Veio funcionando corretamente, com as pilhas, e não poderia deixar de falar dessa qualidade maravilhosa, né? Eu demorei um pouco para avaliar pois estava testando, ela funciona perfeitamente. Todos os itens vieram corretamente,  com ótima qualidade:))",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgwglm6d8y6c84",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgwglm6dacqs11",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgwglm6dbrb82b",
        ],
      },
      {
        initial: "A",
        name: "Amandactoledo",
        date: "10 jun. 2025",
        text: "SIMPLESMENTE PERFEITA, REALIZEI UM SONHO!! Entrega super rápida e segura!! Pedi no sábado à noite dia 24/05 e chegou dia 27/05 por volta das 14h da tarde. Veio muito bem embalado, a validade dos filmes veio com datas excelentes bem distantes, da pra usar tranquilo, estou apaixonada, recomendo 100%😍😍😍😍",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-maaqvkf9njcmf2",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-maaqvkf9oxx2b0",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-maaqvkf9rr1y32",
        ],
      },
      {
        initial: "G",
        name: "Grogusmama",
        date: "08 abr. 2025",
        text: "Chegou muito muito muito muuuuuito rápido, pedi no domingo de noite e chegou hoje por volta das 14. \n\nChegou muito bem lacrado e muito bem empacotado, eu amei demais dá pra sentir o carinho que enviaram. Estou muito feliz de poder realizar esse sonho!!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8cc1a9eyivl16",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8cc1a9f1c0h3b",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8cc1a9f455d8d",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8cc1a9f6ya9b1",
        ],
      },
      {
        initial: "C",
        name: "Cliente",
        date: "05 fev. 2025",
        text: "Simplesmente a melhor compra que já fiz aqui. Chegou em 5 dias, vendedor super ágil e atencioso, veio muito bem embalado também. Já testei a câmera, ela é muito boa. Veio com as pilhas também. INCRIVEL, APENAS COMPREM. vendedor 1000.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m5w1iicv7bet35",
        ],
      },
      {
        initial: "I",
        name: "Izamendonca",
        date: "21 fev. 2026",
        text: "Chegou antes do prazo muito bem embalada veio junto de 60 poses,amei ela é muito linda é meu só ho realizado, na infância queria muito uma dessa e hj com 37 anos comprei a minha e estou maravilhada só comprem e obg ao vendedor",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81zu7-mkza7st467ls16",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztp-mkza7st47m6813",
          "https://down-br.img.susercontent.com/file/br-11134103-81zuk-mkza7st490qo8a",
        ],
      },
      {
        initial: "I",
        name: "Izaiasmoreirafraga",
        date: "28 jan. 2026",
        text: "Câmera perfeita apaixonante muito boa  é de extrema qualidade eu gostei dela Rosinha muito lindo , pode comprar 100 medo chega certinho chegou antes do prazo bem balada não tive nenhum problema eu sou porque recomendo",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk12m5xjs93647",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk12m5xjtnnm92",
        ],
      },
    ],
    meta: {
      title: "Câmera Instax Mini 12 FujiFIlm + Filme de 60 Poses - 86% OFF",
      description: "Câmera Instax Mini 12 FujiFIlm + Filme de 60 Poses com 86% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-11",
    slug: "churrasqueira-eletrica-arke-apartamento-rotativa-com-5-espet",
    name: "Churrasqueira Elétrica Arke Apartamento Rotativa Com 5 Espetos 220v Vitta Smart",
    shortName: "Churrasqueira Elétrica Arke Apartamento Rotativa",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 189.9,
    oldPrice: 779.9,
    discount: 76,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 9874,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdwx-lzpm7626yvg7c9",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdx3-lzpm762qy23wb0",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdyx-lzpm7733ia3ue2",
      "https://down-br.img.susercontent.com/file/sg-11134201-7rdwz-lzpm76gmdrp06a",
    ],
    description: {
      intro: "Churrasqueira Elétrica Assador Rotativo Arke Vitta Smart 05 Espetos 220V.",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "- Voltagem: 220v",
        "- Espetos simples: 4 unidades",
        "- Espeto triplo: 1 unidade",
        "- Bandeja coletora de gordura: 1 unidade",
        "- Comprimento: 56 cm",
        "- Largura: 37 cm",
        "- Altura: 66 cm",
        "- Peso: 24kg",
        "- Recomendação de Limpeza: Limpar com pano seco para retirar o pó. Não aplicar produtos abrasivos.",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Churrasqueira Elétrica Arke Apartamento Rotativa",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "P",
        name: "Patriciamcanto",
        date: "16 nov. 2025",
        text: "EXCELENTE, porque não comprei antes!? Maravilhosa, assa super bem e rápida! Vi umas resenhas que diziam demorar mas o que assei (está na foto) levou em torno de 1h e falaram em 1h30min. Amei, vale cada centavo! Os espetos poderiam ser de um material melhor, mas nada que comprometa o funcionamento.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh4xd64b435x3a",
        ],
      },
      {
        initial: "U",
        name: "Usboqh",
        date: "23 out. 2025",
        text: "Boa tarde! \nTem umas avarias, o fechador nao fecha a porta direito, tomada veio grossa demais. Preciso achar uma que da certo agr pra testar se liga.\nVendedor nao da suporte, de instalacao de peça que veio fora do lugar.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mg6rr3aoyiv98b",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mg6rr3aozxfpf0",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mg6rr3ap1c0515",
        ],
      },
      {
        initial: "P",
        name: "Pameladrunn",
        date: "04 nov. 2024",
        text: "Não testei ainda o produto  veio com um amassado em cima e o prendedor da porta meio solto pode ter Cido no transporte a churrasqueira parece ser boa espero que atenda o que promete",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m275jcs7pjk620",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m275jcs7qy4mb5",
        ],
      },
      {
        initial: "C",
        name: "Cleusarodrigues",
        date: "14 nov. 2025",
        text: "Sonho realizado carne assada sem precisar ficar cuidando e virando só comer agora engordar uns kilinhos mais kkkk recomendo podem comprarem sem medo e o preço é o mais em conta",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh23tai7pkp30d",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh23tai7qz9jcf",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh23tai7sdtz87",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mh23tai7tseff3",
        ],
      },
      {
        initial: "R",
        name: "Ruthysilvadossantos",
        date: "20 abr. 2025",
        text: "Perfeito 👏👏👏👏 super recomendo mercadoria de ótima qualidade 😄 funcionando perfeitamente 😄 amei meu nhã compra 🎉🎉 comprarei mais com certeza 👍",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m8t57iswbcoyf2",
        ],
      },
      {
        initial: "M",
        name: "Mariafb",
        date: "01 jul. 2025",
        text: "Chegou tudo certinho a churrasqueira e perfeita veio tudo muito bem embalado sem nenhum defeito. Ainda não usei mas testei e está tudo ok.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbokn3wi7ejd23",
        ],
      },
    ],
    meta: {
      title: "Churrasqueira Elétrica Arke Apartamento Rotativa - 76% OFF",
      description: "Churrasqueira Elétrica Arke Apartamento Rotativa com 76% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-36",
    slug: "secador-de-cabelos-philco-psc3500-4-em-1-dobravel-1450w",
    name: "Secador de Cabelos Philco PSC3500 4 em 1 Dobrável 1450W",
    shortName: "Secador de Cabelos Philco PSC3500 4 em 1 Dobrável",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 68.7,
    oldPrice: 397.9,
    discount: 83,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 9872,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/sg-11134201-824hh-mfio0pwmo0su97",
      "https://down-br.img.susercontent.com/file/sg-11134201-824ga-mfio0qiqdc0d48",
      "https://down-br.img.susercontent.com/file/sg-11134201-824io-mfio0r0sknig3c",
      "https://down-br.img.susercontent.com/file/sg-11134201-824iz-mfio0rga9ij03b",
      "https://down-br.img.susercontent.com/file/sg-11134201-824hp-mfio0ryghiix93",
      "https://down-br.img.susercontent.com/file/sg-11134201-824gp-mfio0seyb3f236",
      "https://down-br.img.susercontent.com/file/sg-11134201-824ho-mfio0subpfyic9",
      "https://down-br.img.susercontent.com/file/sg-11134201-824hy-mfio0tapgzd9e9",
    ],
    description: {
      intro: "Transforme sua rotina de beleza com a Secador de Cabelos Philco PSC3500. Com um poderoso motor de 1450W, esta secador oferece 3 velocidades e 3 temperaturas, garantindo uma secagem rápida e eficiente, além de proporcionar resultados dignos de salão. Ideal para todos os tipos de c",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "Secador de Cabelos Philco PSC3500: Potência e Versatilidade para Seus Cabelos",
        "Velocidades: 3",
        "Controle de temperatura: 3",
        "Emissão de Íons: Íons Tourmaline",
        "Jato de ar frio: Sim",
        "Bocal direcionador de ar: Sim",
        "Dobrável: Sim",
        "Alça para Pendurar: Não",
        "Cabo 360: Sim",
        "Tamanho do fio (cm): 180",
        "Voltagem: 110V ou 220V (não é bivolt)",
        "Consumo (kWh): 0,14 kW/h",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Secador de Cabelos Philco PSC3500 4 em 1 Dobrável",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "M",
        name: "Mariasouzz",
        date: "13 nov. 2025",
        text: "Adorei o produto. Usei o bico para alisar e o efeito foi muito bom. O secador tem uma potência incrível e seca rápido. Super recomendo.",
        photos: [
        ],
      },
      {
        initial: "D",
        name: "Deborahmizukoshi",
        date: "20 nov. 2025",
        text: "Amei o resultado. A escova funciona bem para modelar os fios É ótimo para quem tem pressa e precisa de um bom resultado",
        photos: [
        ],
      },
      {
        initial: "R",
        name: "Renatap",
        date: "01 dez. 2025",
        text: "Recomendo muito adorei o atendimento da rosangela, o rastreio foi enviado rápido e chegou em 4 dias com o expresso",
        photos: [
        ],
      },
      {
        initial: "P",
        name: "Perladouradolopes",
        date: "01 dez. 2025",
        text: "A entrega foi rápida e o produto bem embalado, o preço muito justo e o secador é maravilhoso, to adorando tudo",
        photos: [
        ],
      },
      {
        initial: "V",
        name: "Valriaaires",
        date: "06 jan. 2026",
        text: "A potência do secador é ótima, seca rápido e os acessórios ajudam a modelar o cabelo do jeito que você quer",
        photos: [
        ],
      },
      {
        initial: "J",
        name: "Joanarene",
        date: "28 dez. 2025",
        text: "Perfeito. O secador tem uma boa potência, os acessórios são práticos e o efeito dura o dia inteirooo",
        photos: [
        ],
      },
    ],
    meta: {
      title: "Secador de Cabelos Philco PSC3500 4 em 1 Dobrável - 83% OFF",
      description: "Secador de Cabelos Philco PSC3500 4 em 1 Dobrável com 83% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-31",
    slug: "lava-loucas-praxis-portatil-llpp-semi-automatica-bivolt",
    name: "Lava Louças Praxis Portátil LLPP Semi-Automática Bivolt",
    shortName: "Lava Louças Praxis Portátil LLPP Semi-Automática",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 69.8,
    oldPrice: 397.9,
    discount: 82,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 9864,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m850ox58do8h8b",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m850ox58hvxt34",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m850ox58jai90d",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m850ox58f2sx8c",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m850ox58av3l29",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m850ox58c9o1ea",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m850ox58ghdd0a",
    ],
    description: {
      intro: "🍽️ Lava Louças Portátil Praxis LLPP A revolução que sua cozinha merece: mais tempo para você e menos trabalho com a louça!A Lava Louças Portátil Praxis é a escolha inteligente para quem busca praticidade, eficiência e design moderno. Com recursos inovadores, ela transforma a form",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "Produto novo na embalagem original",
        "Garantia do fabricante",
        "Envio imediato",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Lava Louças Praxis Portátil LLPP Semi-Automática",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "P",
        name: "Pratkelly",
        date: "06 ago. 2025",
        text: "A lava-louças foi uma ótima aquisição, se eu soubesse que era tão boa, teria comprado antes! Fiz o pedido no dia 2 de julho e recebi no dia 8, chegou bem rápido. Já estou usando há quase um mês e, até agora, funcionou perfeitamente.\nEstou utilizando o detergente em pó da Ypê específico para lava-louças e meio medidor já é suficiente para louças menos sujas. Achei que ela lava muito bem, especialmente copos e pratos. Quanto a talheres e panelas, se a sujeira estiver muito seca, talvez não limpe 100%, mas já facilita bastante a remoção. \nÉ importante saber organizar a louça corretamente, para não obstruir a passagem da água. Se as peças estiverem mal posicionadas, o jato não alcança tudo e algumas partes podem sair mal lavadas. Posicionar bem as peças faz toda a diferença no resultado da lavagem.\nSobre a durabilidade, espero que seja boa. A estrutura é de plástico, o que condiz com o valor, ideal para quem não tem condições de investir em uma lava-louças embutida. Essa versão portátil atende bem!\nA máquina é fácil de usar e de limpar. O único ponto negativo, na minha opinião, é que o filtro onde ficam os restos de comida não é removível antes do enxágue. Então, os resíduos acabam ficando ali quando se coloca a água limpa, o que poderia ser melhor pensado.\nNo geral, recomendo o produto e o vendedor. Estou satisfeita com a compra!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-md3ap6tu8coi93",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-md3ap6tu8d8h5c",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-md3ap6tunsxe6a",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-md3ap6tunthdca",
        ],
      },
      {
        initial: "C",
        name: "Camilazoe",
        date: "08 mar. 2025",
        text: "Edit. \nUsando a uma semana. Uso 1 ou 2x por dia.  O suporte de pratos dá pra baixar e dá para colocar outras coisas se não tiver pratos pra lavar. Nota-se que deve ser usada com cuidado e carinho para durar. Quando pega o jeito, alocar as peças e quantidade de produto (usa bem pouco) , dá tudo certo. Já estou bem mal acostumada com ela hahaha . Uso o sabão em pó Ypê para lava louças. Metade do scoop que vem com o sabão basta. Tiro qualquer resíduo antes de colocar lá.\nCaixa veio aberta mas a portaria falou que viu o entregador abrindo sem querer ao carregar de mal jeito.\nEstou bem satisfeita com a compra. Melhor que o esperado. Basta saber usar. \nÁgua esquenta bastante.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m6txcylbx1dzdf",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m6txcylbyfyf49",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m6txcylbzuiv2f",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m6txcylc193b80",
        ],
      },
      {
        initial: "B",
        name: "Brenoagui",
        date: "06 mai. 2025",
        text: "Máquina boa para a finalidade que se propõe, vendedor enviou super rápido, veio com um defeitinho eu mesmo quis arrumar mas informei o vendedor ele se prontificou em resolver caso meu conserto não desse certo, ela usa bastante espaço devido a abertura da tampa para trás, eu queria colocar na bancada da minha pia mas não coube, mas isso é detalhe eu só acabei usando em outro local, eu vi muitas reclamações do timer não funcionar o da minha funciona perfeitamente, só sugiro não girar ele no sentido contrário, quer interroper levanta levemente a tampa para o sensor desativar e ela desligar e deixa o timer voltar sozinho com ela desativada! É isso!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m9g3934ejyte9d",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m9g3934elddu2a",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m9g3934emrya01",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m9g3934eo6iq9b",
        ],
      },
      {
        initial: "S",
        name: "Sassyx",
        date: "31 mar. 2025",
        text: "produto veio bem embalado por dentro da caixa, aparentemente foi feito o teste de funcionamento pois veio molhada por dentro. tudo okay\nna primeira lavagem a louça ainda saiu um pouquinho suja pq eu nao sabia usar muito bem e nao sabia que a quantidade de sabao é importante tbm. vem um dosador que conta ate 10ml. se voce colocar os 10ml e for muita louça nao vai limpar bem, é bom colocar um pouquinho a cima desses 10ml sai bem limpa! esses respingos por fora fui eu que molhei sem querer!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m80gazztx98x2e",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m80gazztyntd75",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m80gazzu02dtdd",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-m80gazzu1gy9bd",
        ],
      },
      {
        initial: "T",
        name: "Twbvjonup",
        date: "01 jul. 2025",
        text: "Chegou certinho no prazo ótimo. Graças a Deus veio tudo certo funcionando 🙏. Eu estou testando ela a nove dias lavando louças duas vezes ao dia. Está funcionando bem. Uso o sabão para lava louças Ipê e o secante na água de enxague da Cif. As louças secam mais rápido e ficam com um brilho top. Está sendo muito útil pois perdia muito tempo lavando louças. Não tem aquelaaa qualidade mas é resistente. Eu tenho cuidado e manuseio sempre com cuidado.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbolwfgf0km1b7",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbolwfgf1z6hd2",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbolwfgf4sbdba",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbolwfgf7lg996",
        ],
      },
      {
        initial: "T",
        name: "Tmisolantes",
        date: "12 nov. 2025",
        text: "Demorei para avaliar pois estava testando ..\nSobre o prazo de entrega foi mega rápido, comprei em um dia, chegou no outro..\nSobre a máquina é perfeita pra quem busca praticidade e cozinha sempre limpa, visto que são sempre coisas pequenas como copos e pratos e talheres sem fim, ela cumpre muito bem o que promete !\nEu só preciso ajustar a questão do sabão , fica um pouco do cheiro por ser muito forte, aí estou fazendo dois enxágües..",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgz6fqc5umtje5",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgz6fqchsglce6",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgz6fqc9eghwf9",
        ],
      },
    ],
    meta: {
      title: "Lava Louças Praxis Portátil LLPP Semi-Automática - 82% OFF",
      description: "Lava Louças Praxis Portátil LLPP Semi-Automática com 82% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-41",
    slug: "climatizador-de-ar-356080-litros-127v-220v-ventisol-pro-clin",
    name: "Climatizador de Ar 35|60|80 Litros 127V-220V Ventisol PRO CLIN",
    shortName: "Climatizador de Ar 35|60|80 Litros 127V-220V",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 69.9,
    oldPrice: 497.9,
    discount: 86,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 9854,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhbxwctjavbbd3",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mif7ecxhs00142",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mhidkwsuy0au03",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mif7ecxf32te65",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mif7ecxhqlfl9c",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mif7ecxhtekh2e",
    ],
    description: {
      intro: "CLIMATIZADOR DE AR VENTISOL 35L / 60L / 80L  127V OU 220V",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "- 35L: salas, comércios e ambientes médios",
        "- 60L: ambientes maiores",
        "- 80L: ambientes maiores e uso comercial",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Climatizador de Ar 35|60|80 Litros 127V-220V",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "P",
        name: "Pryscylaalbuquerque",
        date: "28 dez. 2025",
        text: "Chegou tudo certinho bem embalado, o material plástico aparentemente é bom , 130w de potência  16 litros  .\nRecomendo colocar saquinhos com água pra fazer uma barra de gelo grande pra demorar mais tempo com o clima mais fresco .\nEle também pode usar como função ventilação aí só sai vento igual o ventilador mais aqui é muito quente tenho que usar com gelo mesmo pra gelar bastante",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mitciakvnaird0",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mitciakzjrb66e",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mitciakzl5vm6c",
        ],
      },
      {
        initial: "L",
        name: "Let",
        date: "14 dez. 2025",
        text: "Muito bom o aparelho deixa o ambiente super gelado , muito fácil a utilização",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mi9idl44d62p91",
        ],
      },
      {
        initial: "S",
        name: "Sarasantosschmidtschmidt",
        date: "29 dez. 2025",
        text: "Chegou até que rápido, estou gostando do produto, parece ser ótimo",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-miup4htiz6yp94",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-miup4htj0lj5e3",
        ],
      },
      {
        initial: "S",
        name: "Simonemariadossantos",
        date: "15 dez. 2025",
        text: "Excelente custo benefício. Valeu a pena. Funcionando mto bem\n",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-miacm6w4e80371",
        ],
      },
      {
        initial: "W",
        name: "Wilsoncarlos",
        date: "22 dez. 2025",
        text: "O produto tá aprovado só demorou muito pra ser coletado",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-miktbws60s1y2f",
        ],
      },
      {
        initial: "P",
        name: "Porcellana",
        date: "22 dez. 2025",
        text: "Simplesmente apaixonada \nRecomendo D+",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-miktitmwwzk313",
        ],
      },
    ],
    meta: {
      title: "Climatizador de Ar 35|60|80 Litros 127V-220V - 86% OFF",
      description: "Climatizador de Ar 35|60|80 Litros 127V-220V com 86% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "famosinho-92",
    slug: "caixa-de-som-karaoke-joog-x2-300w-tela-101-com-2-microfones",
    name: "Caixa De Som Karaokê Joog X2 300w Tela 10,1 Com 2 Microfones",
    shortName: "Caixa De Som Karaokê Joog X2 300w Tela 10,1 Com 2",
    tagline: "Pronta entrega · Frete grátis · Garantia do fabricante",
    price: 39.9,
    oldPrice: 397.9,
    discount: 90,
    rating: 4.9,
    reviews: 50,
    reviewsTotal: 50,
    sold: 9853,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m8jnvlvc270103",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m8jnvlvc504x27",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m8jnvlvc3lkh4a",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m8jnvlvbzdv56e",
      "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m8jnvlvc0sfl24",
    ],
    description: {
      intro: "O Break X2 oferece áudio potente e rico com woofers duplos de 4 polegadas e tweeters de 1,2 polegadas, atingindo um nível de pressão sonora (SPL) de 106 dB e uma faixa de frequência de 48 Hz a 20 kHz.",
      features: [
        ["Qualidade Premium", "Material selecionado e acabamento superior — durabilidade que você pode confiar no dia a dia."],
        ["Pronta Entrega", "Estoque disponível em todo o Brasil com envio imediato após a confirmação do pagamento."],
        ["Garantia do Fabricante", "Produto novo, lacrado e com garantia oficial contra defeitos de fabricação."],
        ["Frete Grátis para Todo Brasil", "Você recebe em casa sem custo adicional e com rastreio completo do pedido."],
        ["7 Dias para Trocar", "Compra protegida pelo Código de Defesa do Consumidor — devolva sem burocracia."],
      ],
      specs: [
        "Produto novo na embalagem original",
        "Garantia do fabricante",
        "Envio imediato",
      ],
      idealFor: [
        "Quem busca qualidade com preço imperdível",
        "Presente para família e amigos",
        "Uso diário em casa",
      ],
      includes: [
        "1 Caixa De Som Karaokê Joog X2 300w Tela 10,1 Com 2",
        "Embalagem original do fabricante",
        "Manual de instruções (quando aplicável)",
      ],
    },
    reviewsList: [
      {
        initial: "E",
        name: "Ericaamanciopereira",
        date: "23 jun. 2025",
        text: "Impecável !! Melhor compra ! Vendedor atencioso, postou no mesmo dia da compra, chegou bem antes do praso, entrega segura com palavra chave. \nCaixa de som perfeita, melhor que existe no mercado , muito completa e a mais moderna !!! Linda, compacta e potente!!! Só comprem, vale muito !!!!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbce98roqintb9",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbce98rorx8991",
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mbce98rotbspa1",
        ],
      },
      {
        initial: "S",
        name: "Sangotijo",
        date: "23 ago. 2025",
        text: "o tablet poderia ser uma versão do Android menos limitada (propositalmente, não de antigo). Mas é muito massa, não existe nada equivalente no mercado",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-7r98o-mdbta1sobtwy47",
        ],
      },
      {
        initial: "D",
        name: "Dgo",
        date: "07 out. 2025",
        text: "Ótimo sim karaokê, cumpre o prometido. O pessoal da loja se divertiu bastante com ele, foram 3 meses de pura diversão e entretenimento",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfk1gwrmfabo0e",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mfk1gwrmgow4b3",
        ],
      },
      {
        initial: "S",
        name: "Solangesaldanhavieira",
        date: "04 out. 2025",
        text: "Som maravilhoso, amamos o karoque, lindíssima a caixa de som, microfone perfeito, material de ótima qualidade",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mffzctlcebyc6f",
        ],
      },
      {
        initial: "E",
        name: "Ediroliveiradesa",
        date: "09 jun. 2025",
        text: "A caixa é fantástica, chegou antes da data,foi presente de do dia dos namorados,meu esposo amou",
        photos: [
        ],
      },
      {
        initial: "M",
        name: "Maxamorim",
        date: "05 jun. 2025",
        text: "Superou as expectativas!",
        photos: [
        ],
      },
    ],
    meta: {
      title: "Caixa De Som Karaokê Joog X2 300w Tela 10,1 Com 2 - 90% OFF",
      description: "Caixa De Som Karaokê Joog X2 300w Tela 10,1 Com 2 com 90% OFF. Frete grátis, envio imediato e proteção do cliente.",
    },
  },
  {
    id: "iphone-17-pro",
    slug: "iphone-17-pro-max-256gb",
    name: "Apple iPhone 17 Pro Max / 17 Pro 256GB - Original - 1 Ano de Garantia",
    shortName: "iPhone 17 Pro / Pro Max 256GB",
    tagline: "256GB · Original Apple · 1 Ano de Garantia",
    price: 197.9,
    oldPrice: 8499.0,
    discount: 97,
    rating: 4.9,
    reviews: 1284,
    reviewsTotal: 1284,
    sold: 7320,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mf1araiseqyu99@resize_w900_nl.webp",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mf1araisdceec3@resize_w900_nl.webp",
      "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mf1araisg5ja8b@resize_w900_nl.webp",
    ],
    colorOptions: [
      { label: "Azul", images: ["https://down-br.img.susercontent.com/file/br-11134207-81z1k-mf1araiseqyu99@resize_w900_nl.webp"], stock: 12 },
      { label: "Branco", images: ["https://down-br.img.susercontent.com/file/br-11134207-81z1k-mf1araisdceec3@resize_w900_nl.webp"], stock: 9 },
      { label: "Laranja", images: ["https://down-br.img.susercontent.com/file/br-11134207-81z1k-mf1araisg5ja8b@resize_w900_nl.webp"], stock: 6 },
    ],
    description: {
      intro: "Por que escolher o iPhone 17 Pro / Pro Max 256GB?",
      features: [
        ["Chip A19 Pro", "Desempenho de outro nível para jogos pesados, edição de vídeo 4K e multitarefa sem travamentos."],
        ["Tela Super Retina XDR ProMotion", "Imagens vibrantes com 120Hz, brilho de até 3.000 nits e cores precisas mesmo sob sol forte."],
        ["Sistema de câmera Pro 48MP", "Tripla câmera com teleobjetiva, ultra wide e modo noturno aprimorado para fotos profissionais."],
        ["256GB de armazenamento", "Espaço de sobra para milhares de fotos, vídeos em 4K, apps e jogos pesados."],
        ["Bateria que dura o dia inteiro", "Até 33h de reprodução de vídeo. Carregamento rápido com USB-C e MagSafe sem fio."],
        ["Estrutura em titânio", "Mais leve, mais resistente e com acabamento premium. Resistente à água IP68."],
      ],
      specs: [
        "Modelos: iPhone 17 Pro (6,3\") ou 17 Pro Max (6,9\")",
        "Armazenamento: 256GB",
        "Chip: Apple A19 Pro (6 núcleos)",
        "Tela: Super Retina XDR OLED 120Hz ProMotion",
        "Câmera traseira: Tripla 48MP + 48MP UW + 12MP Tele",
        "Câmera frontal: 12MP TrueDepth",
        "Bateria: até 33h de vídeo",
        "Conectividade: 5G, Wi-Fi 7, Bluetooth 5.3",
        "Resistência: IP68 (até 6m por 30min)",
        "Sistema: iOS 18",
        "Estrutura: Titânio Grau 5",
      ],
      idealFor: [
        "Quem quer o iPhone mais novo com preço de oportunidade",
        "Fotógrafos e criadores de conteúdo",
        "Gamers que precisam de performance",
        "Profissionais que usam o celular como ferramenta de trabalho",
      ],
      includes: [
        "1 iPhone 17 Pro ou 17 Pro Max 256GB",
        "1 Cabo USB-C para USB-C",
        "1 Ferramenta para ejeção do SIM",
        "1 Documentação Apple",
        "1 Caixa lacrada original",
        "1 Ano de garantia oficial Apple",
      ],
    },
    reviewsList: [
      {
        initial: "R",
        name: "Rafael T.",
        date: "08 mai. 2026",
        text: "Comprei o Pro Max na cor laranja, simplesmente perfeito! Veio lacrado, IMEI confere no site da Apple. Câmera é absurda e a bateria dura o dia todo de boa. Recomendo demais!",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-820md-mn8qlhm2ve9s56@resize_w144_nl.webp",
          "https://down-br.img.susercontent.com/file/br-11134103-820mg-ml7npcbaascm35@resize_w144_nl.webp",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mjjw1wbstngi7b@resize_w144_nl.webp",
        ],
      },
      {
        initial: "P",
        name: "Patrícia G.",
        date: "06 mai. 2026",
        text: "Chegou em 4 dias, embalagem original Apple, lacrado. Peguei o branco e ficou lindo. Velocidade absurda, jogos rodam perfeitos. Valeu cada centavo pelo preço que paguei.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztv-mkzfs1085ibk89@resize_w144_nl.webp",
          "https://down-br.img.susercontent.com/file/br-11134103-81zuk-mkzfs1086ww012@resize_w144_nl.webp",
        ],
      },
      {
        initial: "L",
        name: "Lucas A.",
        date: "03 mai. 2026",
        text: "Estava com receio pelo preço baixo mas o aparelho é original sim, conferi tudo. Azul é mais bonito ao vivo. Atendimento do vendedor ótimo, tirou todas as dúvidas.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81zub-ml3lecwc10chb7@resize_w144_nl.webp",
          "https://down-br.img.susercontent.com/file/br-11134103-81zu1-ml3lecwc2ewx6b@resize_w144_nl.webp",
          "https://down-br.img.susercontent.com/file/br-11134103-81zu4-mkss8uh21e6aba@resize_w144_nl.webp",
        ],
      },
      {
        initial: "C",
        name: "Camila B.",
        date: "30 abr. 2026",
        text: "Melhor iPhone que já tive. A câmera de 48MP é incrível, fotos saem nítidas até com pouca luz. Recomendo o Pro Max por causa da tela maior, vale a pena.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztu-mkss8uh22sqq75@resize_w144_nl.webp",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk8jief518u8dd@resize_w144_nl.webp",
        ],
      },
      {
        initial: "D",
        name: "Diego F.",
        date: "27 abr. 2026",
        text: "Veio tudo conforme anunciado, com nota fiscal e garantia de 1 ano. Já uso há 2 semanas e zero problema. Bateria insana, carrego só uma vez por dia.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mk8jieeqhb0ib9@resize_w144_nl.webp",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgsnpo5oe03pd3@resize_w144_nl.webp",
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgsnpo5ofeo511@resize_w144_nl.webp",
        ],
      },
      {
        initial: "B",
        name: "Beatriz N.",
        date: "24 abr. 2026",
        text: "Aparelho top, chegou rapidíssimo e bem embalado. A tela de 120Hz faz toda diferença, super suave. Recomendo a loja, atenciosos do começo ao fim.",
        photos: [
          "https://down-br.img.susercontent.com/file/br-11134103-81z1k-mgsnpo5ogt8lc4@resize_w144_nl.webp",
          "https://down-br.img.susercontent.com/file/br-11134103-81ztc-mkcu9bfmrksh15@resize_w144_nl.webp",
        ],
      },
    ],
    meta: {
      title: "Apple iPhone 17 Pro Max / 17 Pro 256GB - 1 Ano de Garantia",
      description: "iPhone 17 Pro / Pro Max 256GB original Apple com 97% OFF. Lacrado, com nota fiscal e 1 ano de garantia. Frete grátis e envio imediato.",
    },
  },
  {
    id: "pistola-rossi-w129",
    slug: "pistola-pressao-rossi-w129-co2",
    name: "Pistola de Pressão Rossi W129 CO2 4,5mm Blowback - Edição Treino Tático",
    shortName: "Pistola Rossi W129 CO2",
    tagline: "Blowback real · Slide em metal · 367 FPS · Calibre 4,5mm",
    price: 87.71,
    oldPrice: 489.9,
    discount: 82,
    rating: 5.0,
    reviews: 4817,
    reviewsTotal: 4817,
    sold: 6229,
    freeShipping: true,
    images: [
      "https://mngohqhzwuozrzrzrgbs.supabase.co/storage/v1/object/public/product-images/9ee44297-7712-4bb0-97cf-6453cfeacfb2/images/1776705023864-99ongp9g06j.webp",
      "https://mngohqhzwuozrzrzrgbs.supabase.co/storage/v1/object/public/product-images/9ee44297-7712-4bb0-97cf-6453cfeacfb2/images/1776705152611-x56v696islp.png",
      "https://http2.mlstatic.com/D_NQ_NP_2X_813054-MLB75104613567_032024-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_952649-MLB75104613561_032024-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_702679-MLB75104613571_032024-F.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_795642-MLB75104613563_032024-F.webp",
    ],
    description: {
      intro: "Sinta o realismo do blowback: slide móvel em metal, gatilho preciso e potência para treino e tiro esportivo. A Rossi W129 entrega sensação de arma real com a praticidade do CO2.",
      features: [
        ["Sistema Blowback Realista", "O slide se movimenta a cada disparo, simulando o recuo de uma pistola real — ideal para treinar empunhadura e visada."],
        ["Alta Velocidade — até 367 FPS", "Disparos com até 112 m/s, garantindo precisão em alvos a curta e média distância."],
        ["Slide e Internos em Metal", "Construção premium e durável, com acabamento profissional made in Taiwan."],
        ["Ação Semi-Automática", "Recarga automática entre disparos: dispare quantas vezes quiser sem engatilhar manualmente."],
        ["Trilho Picatinny 22mm", "Pronta para acessórios táticos como mira holográfica, laser e lanterna."],
        ["Trava de Segurança Manual", "Manuseio seguro com sistema de trava de fácil acesso e ergonomia confortável."],
      ],
      specs: [
        "Calibre: 4,5mm (.177)",
        "Munição: Esferas de aço (BBs)",
        "Capacidade do magazine: 20 tiros",
        "Ação: Semi-automática",
        "Sistema: CO2 (cilindro 12g)",
        "Velocidade: até 112 m/s (367 FPS)",
        "Autonomia: ~70 disparos por cilindro",
        "Corpo: metal + empunhadura em polímero reforçado",
        "Comprimento: 190 mm",
        "Peso: 0,712 kg",
        "Origem: Made in Taiwan",
      ],
      idealFor: [
        "Tiro esportivo e recreativo",
        "Treino de visada, empunhadura e saque",
        "Atiradores que buscam realismo no disparo (blowback)",
        "Iniciantes e praticantes experientes",
        "Plinking em alvos de papel e latas",
      ],
      includes: [
        "1 Pistola Rossi W129 CO2 4,5mm",
        "1 Magazine para 20 esferas",
        "300 esferas de aço calibre 4,5mm",
        "5 cilindros de CO2 12g",
        "1 Maleta plástica com espuma protetora",
        "5 alvos de papel",
        "1 Frasco de óleo de silicone",
        "Manual de instruções + Nota Fiscal",
      ],
    },
    reviewsList: [
      {
        initial: "C",
        name: "Carol S.",
        date: "20 abr. 2026",
        text: "Comprei pro meu marido de presente de aniversário e ele simplesmente amou! Disse que o blowback é muito realista, parece arma de verdade. Chegou rapidinho, super bem embalada na maleta. Recomendo demais!",
        photos: [],
      },
      {
        initial: "F",
        name: "Francisco A.",
        date: "18 abr. 2026",
        text: "Sou de Salvador, Bahia e chegou em 4 dias úteis, super rápido. Pistola robusta, slide metálico de qualidade. Já fiz uns 200 disparos e está funcionando perfeitamente. Veio com tudo: CO2, esferas, óleo e maleta.",
        photos: [],
      },
      {
        initial: "J",
        name: "João Paulo M.",
        date: "15 abr. 2026",
        text: "Sempre quis uma dessas, ainda bem que peguei nessa promoção. Comprei duas: uma pra mim e outra pro meu filho mais velho treinar comigo nos fins de semana. Excelente custo-benefício, vale cada centavo.",
        photos: [],
      },
      {
        initial: "A",
        name: "Armando Souza",
        date: "12 abr. 2026",
        text: "Chegou certinho minha pistola de pressão, demorou só 3 dias. Acabamento muito bom, mira firme. A maletinha que vem junto é um bônus excelente pra guardar e levar pra prática. Loja confiável.",
        photos: [],
      },
      {
        initial: "R",
        name: "Ricardo T.",
        date: "08 abr. 2026",
        text: "Produto original, lacrado e com nota fiscal. O blowback é viciante, dá uma sensação muito próxima de uma 9mm de verdade. Trava de segurança funciona perfeitamente. Já comprei mais um cilindro extra de CO2.",
        photos: [],
      },
    ],
    meta: {
      title: "Pistola de Pressão Rossi W129 CO2 4,5mm Blowback - 82% OFF",
      description: "Pistola de pressão Rossi W129 CO2 4,5mm com sistema blowback, slide em metal e ação semi-automática. Vem com maleta, esferas, 5 cilindros CO2 e óleo. Frete grátis e nota fiscal.",
    },
  },
  {
    id: "extratora-w3",
    slug: "extratora-higienizadora-portatil-w3",
    name: "Extratora Higienizadora Portátil Spot Cleaner W3 — Borrifa, Esfrega e Extrai Sujeira de Colchão e Sofá",
    shortName: "Extratora Higienizadora Portátil W3",
    tagline: "Borrifa · Esfrega · Extrai — colchão, sofá, carpete e estofados",
    price: 69.9,
    oldPrice: 399.9,
    discount: 83,
    rating: 4.9,
    reviews: 465,
    reviewsTotal: 465,
    sold: 9314,
    freeShipping: true,
    images: [
      "https://down-br.img.susercontent.com/file/sg-11134201-7rbn7-lqeu1vzxvsrqba",
      "https://cf.shopee.com.br/file/sg-11134201-7rbmp-lqeu21g3wqau4b",
      "https://sobraltec.com/cdn/shop/files/e62bf530c234860b0fb322c958dff4d8.jpg?v=1728594704&width=1200",
      "https://sobraltec.com/cdn/shop/files/62426964559f3d2b076376a0c12bd0b6.jpg?v=1728594704&width=1200",
      "https://sobraltec.com/cdn/shop/files/239eaf2d04a9071eb5adad206ccab698.jpg?v=1728594704&width=1200",
    ],
    voltageOptions: ["127V", "220V"],
    description: {
      intro: "Por que escolher a Extratora Higienizadora Portátil Spot Cleaner W3?",
      features: [
        ["Sistema 3 em 1 — Borrifa, Esfrega e Extrai", "Pulveriza a solução de limpeza, agita a sujeira com escova e suga toda a água suja de volta no mesmo movimento."],
        ["Ideal para colchões, sofás e estofados", "Remove ácaros, manchas de café, urina de pet, suco, vinho e poeira impregnada nos tecidos."],
        ["Compacta e fácil de manusear", "Pesa pouco e cabe em qualquer armário. Use em casa, no carro, na sala ou no quarto sem dor nas costas."],
        ["Reservatórios separados de água limpa e suja", "Você enxerga o quanto de sujeira está saindo do estofado — efeito visual que comprova a higienização."],
        ["Bico de sucção transparente", "Permite acompanhar a extração e garantir que o tecido seque mais rápido após a limpeza."],
        ["Não molha o estofado por dentro", "Diferente de tirar com pano molhado: a extratora puxa a água, então o colchão seca em poucas horas."],
      ],
      specs: [
        "Tensão: 127V ou 220V (selecione antes de comprar)",
        "Potência: 80W",
        "Reservatório de água limpa: 250 ml",
        "Reservatório de água suja: 350 ml",
        "Comprimento do cabo de energia: 1,8 m",
        "Pressão de pulverização ajustável",
        "Material: Plástico ABS resistente",
        "Peso: aproximadamente 1,2 kg",
      ],
      idealFor: [
        "Higienizar colchões, travesseiros e edredons",
        "Limpar sofás de tecido, poltronas e cadeiras estofadas",
        "Remover manchas de bancos e tapetes do carro",
        "Limpar carpetes, capachos e cadeirinhas de bebê",
        "Famílias com crianças pequenas e pets em casa",
      ],
      includes: [
        "1 Extratora Higienizadora Portátil Spot Cleaner W3",
        "1 Bico de sucção transparente",
        "1 Escova removível para tecidos",
        "1 Reservatório de água limpa",
        "1 Reservatório de água suja",
        "1 Manual de instruções em português",
      ],
    },
    reviewsList: [
      {
        initial: "M",
        name: "Mariana B.",
        date: "07 jun. 2026",
        text: "Gente, eu fiquei CHOCADA com a quantidade de sujeira que saiu do meu sofá. Achava que estava limpo... a água ficou marrom! Super fácil de usar, recomendo demais.",
        photos: [extratoraReview1, extratoraReview2],
      },
      {
        initial: "P",
        name: "Patrícia G.",
        date: "04 jun. 2026",
        text: "Comprei pra higienizar o colchão das crianças e o resultado foi incrível. Tirou manchas de xixi antigas que eu não conseguia mais limpar. Vale cada centavo.",
        photos: [extratoraReview3, extratoraReview2],
      },
      {
        initial: "L",
        name: "Lucas F.",
        date: "30 mai. 2026",
        text: "Usei nos bancos do carro e parece que saiu da concessionária. Chegou em 4 dias, bem embalado e veio com a voltagem certa. Recomendo!",
        photos: [extratoraReview4],
      },
      {
        initial: "A",
        name: "Aline R.",
        date: "26 mai. 2026",
        text: "Aparelho pequeno mas muito potente. A escovinha ajuda demais nas manchas mais difíceis. Já indiquei pra minha mãe e pra minha irmã.",
        photos: [extratoraReview1, extratoraReview3],
      },
      {
        initial: "C",
        name: "Camila O.",
        date: "21 mai. 2026",
        text: "Tenho 2 gatos e o sofá vivia com pelo e cheiro. Depois que passei essa extratora, ficou outro sofá. Adorei a praticidade e o preço estava ótimo.",
        photos: [extratoraReview5, extratoraReview1],
      },
    ],
    meta: {
      title: "Extratora Higienizadora Portátil Spot Cleaner W3 - 83% OFF",
      description: "Extratora higienizadora portátil que borrifa, esfrega e extrai sujeira de colchões, sofás e estofados. 127V/220V, frete grátis e envio imediato.",
    },
  },
  {
    id: "kit-ferramentas-48v",
    slug: "conjunto-ferramentas-eletricas-48v-brushless",
    name: "Conjunto de Ferramentas Elétricas Sem Fio 48V Sem Escova | Kit Completo 4‑em‑1 ou Ferramenta Vendida Separadamente, Furadeira, Esmerilhadeira, Chave e Parafusadeira de Impacto",
    shortName: "Kit Ferramentas 48V Sem Escova 4-em-1",
    tagline: "Motor Brushless · 48V Max Lithium · Kit 4 em 1 com Maleta e 2 Baterias",
    price: 97.9,
    oldPrice: 489.5,
    discount: 80,
    rating: 4.9,
    reviews: 1482,
    reviewsTotal: 1482,
    sold: 8640,
    freeShipping: true,
    images: [
      kit48v1,
      kit48v2,
      kit48v3,
      kit48v4,
      kit48v5,
      kit48v6,
      kit48v7,
      kit48v8,
      kit48v9,
    ],
    colorOptionsLabel: "Modelo / Opção",
    colorOptions: [
      {
        label: "Kit Completo 4 em 1 (Maleta + 2 Baterias 48V)",
        images: [kit48v1],
        stock: 5,
      },
      {
        label: "Furadeira / Parafusadeira de Impacto 48V",
        images: [kit48v2],
        stock: 8,
      },
      {
        label: "Esmerilhadeira Angular 48V Brushless",
        images: [kit48v3],
        stock: 4,
      },
      {
        label: "Chave de Impacto 48V Brushless",
        images: [kit48v4],
        stock: 6,
      },
    ],
    description: {
      intro: "Por que o Conjunto de Ferramentas Elétricas Sem Fio 48V Sem Escova é o kit definitivo para sua casa e trabalho?",
      features: [
        ["Motor Brushless Sem Escovas de Alta Potência", "Maior vida útil, menor aquecimento e até 50% mais autonomia e torque que motores comuns com escovas de carvão."],
        ["Sistema de Baterias 48V Max Lithium", "Acompanha 2 baterias de alta capacidade com indicador LED de carga e carregador bivolt inteligente (110V/220V)."],
        ["Kit Completo 4 em 1 Multifunção", "Furadeira de impacto para concreto e alvenaria, parafusadeira de precisão com torque ajustável, chave de impacto para oficinas e esmerilhadeira angular para cortes e desbastes."],
        ["Maleta Rígida Anti-Impacto com Acessórios", "Organização perfeita para transporte e armazenamento: inclui brocas, soquetes, discos de corte, pontas de parafusar e empunhaduras ergonômicas."],
        ["Design Ergonômico Emborrachado com LED", "Pegada antiderrapante com redução de vibração e luz LED auxiliar para trabalhar em locais escuros ou de difícil acesso."],
        ["Mandril de Engate Rápido em Metal", "Troca rápida e segura de brocas e pontas sem necessidade de chaves complicadas."],
      ],
      specs: [
        "Tensão das Baterias: 48V Max Íon de Lítio (2 Unidades de alta capacidade inclusas)",
        "Tipo de Motor: Brushless (Sem escova de carvão - máxima durabilidade e força)",
        "Carregador: Bivolt Automático (110V - 220V) com recarga rápida inteligente",
        "Furadeira / Parafusadeira: 2 velocidades mecânicas (0-450 / 0-1650 RPM), torque ajustável 25+3 posições, função impacto",
        "Chave de Impacto: Torque máximo de 380 N.m, encaixe quadrado padrão 1/2\"",
        "Esmerilhadeira Angular: Rotação de 8.500 RPM, diâmetro do disco 115mm (4.1/2\") com capa de proteção",
        "Mandril: Aperto rápido de 10mm (3/8\") a 13mm (1/2\") de aço temperado",
        "Material: Plástico de engenharia ABS reforçado, liga de alumínio e engrenagens de aço",
        "Peso com maleta e acessórios: Aproximadamente 5,4 kg",
      ],
      idealFor: [
        "Profissionais da construção civil, marcenaria, serralheria e mecânica",
        "Manutenção predial, reformas residenciais e projetos DIY (Faça Você Mesmo)",
        "Instalação de móveis, prateleiras, armários e painéis de TV",
        "Cortes em ferro, concreto, madeira, tubos de PVC e alvenaria",
        "Apertar e soltar parafusos pesados, porcas de rodas de veículos e estruturas metálicas",
      ],
      includes: [
        "1 Furadeira / Parafusadeira de Impacto 48V Brushless",
        "1 Chave de Impacto 48V Brushless",
        "1 Esmerilhadeira Angular 48V Brushless",
        "2 Baterias 48V Max de Lítio Recarregáveis",
        "1 Carregador Rápido Bivolt (110V/220V)",
        "1 Maleta Rígida Reforçada para Transporte",
        "1 Jogo de Brocas (Aço rápido, concreto e madeira)",
        "1 Jogo de Soquetes de Impacto e Adaptadores",
        "1 Jogo de Pontas / Bits de Parafusar com Extensor",
        "1 Chave e Protetor para Esmerilhadeira",
        "1 Manual de Instruções em Português",
      ],
    },
    reviewsList: [
      {
        initial: "R",
        name: "Rodrigo M. Silveira",
        date: "04 set. 2026",
        text: "Superou todas as expectativas! O motor sem escova realmente entrega muita força, apertei os parafusos das rodas da caminhonete sem esforço nenhum. A maleta veio impecável e as duas baterias duram o dia todo de serviço.",
        photos: [kit48v1, produtoKitFerramentas],
      },
      {
        initial: "E",
        name: "Eduardo Fonseca",
        date: "02 set. 2026",
        text: "Kit muito completo e robusto. Usei a furadeira no concreto em casa e furou com muita facilidade na função impacto. A esmerilhadeira também cortou cantoneira de aço como manteiga. Recomendo de olhos fechados!",
        photos: [produtoFuradeira, kit48v3],
      },
      {
        initial: "C",
        name: "Carlos Henrique P.",
        date: "30 ago. 2026",
        text: "Entrega super rápida, chegou em 3 dias aqui em São Paulo! As duas baterias vieram já com carga. A chave de impacto tem um torque absurdo. Vale muito a pena pelo preço promocional.",
        photos: [kit48v4, kit48v6],
      },
      {
        initial: "M",
        name: "Marcelo Albuquerque",
        date: "27 ago. 2026",
        text: "Trabalho com montagem de móveis e instalação de drywall, essa parafusadeira facilitou demais o meu dia. O LED frontal ajuda bastante e o peso é bem equilibrado, não cansa o braço.",
        photos: [produtoParafusadeira, kit48v2],
      },
      {
        initial: "J",
        name: "João Paulo Batista",
        date: "22 ago. 2026",
        text: "Excelente acabamento, plástico grosso e emborrachado de primeira linha. Cortei tubos de metal e lixei peças com a esmerilhadeira, não esquenta nada. Produto nota 10!",
        photos: [produtoEsmerilhadeira, kit48v9],
      },
      {
        initial: "F",
        name: "Fernando Ramos",
        date: "18 ago. 2026",
        text: "Melhor compra que fiz no ano. Só a maleta com as ferramentas completas e 2 baterias já valeria o dobro em qualquer loja de material de construção. Podem comprar sem medo.",
        photos: [kit48v1, kit48v8],
      },
    ],
    meta: {
      title: "Conjunto de Ferramentas Elétricas Sem Fio 48V Sem Escova 4 em 1 - 80% OFF",
      description: "Kit Completo de Ferramentas Elétricas 48V Brushless: Furadeira, Parafusadeira, Esmerilhadeira e Chave de Impacto com 2 Baterias e Maleta. Frete Grátis e Envio Imediato.",
    },
  },
];


export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/** Produto principal exibido na home (/) */
export const MAIN_PRODUCT_SLUG = "lavadora-vonder-lav-1300";
