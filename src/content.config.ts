// Inhoud die via het beheerscherm (/admin/) wordt bijgehouden.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Logboek: elke maand hoe drijfveermedia.nl zelf scoort. Cijfers uit SE Ranking (schattingen voor Google Nederland).
const logboek = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logboek' }),
  schema: z.object({
    titel: z.string(),
    beschrijving: z.string(),
    maand: z.string(), // JJJJ-MM, de maand van de meting
    datum: z.coerce.date(), // publicatiedatum
    verkeer: z.number(), // geschatte klikken per maand uit Google NL
    zoekwoorden: z.number(), // zoekwoorden in de top 100
    top10: z.number(), // zoekwoorden in de top 10
    aanvragen: z.number().optional(), // aanvragen via de site in die maand
    domainTrust: z.number().optional(),
    // Eerdere maanden, alleen nodig in de nulmeting: [maand, verkeer]
    historie: z.array(z.tuple([z.string(), z.number()])).optional(),
  }),
});

export const collections = { logboek };
