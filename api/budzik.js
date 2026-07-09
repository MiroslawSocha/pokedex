export default async function handler(zapytanie, odpowiedz) {
  const adresBazy = process.env.VITE_SUPABASE_URL;
  const kluczBazy = process.env.VITE_SUPABASE_ANON_KEY;

  const pelnyAdres = `${adresBazy}/rest/v1/pokemons?limit=1`;

  try {
    await fetch(pelnyAdres, {
      headers: {
        apikey: kluczBazy,
        Authorization: `Bearer ${kluczBazy}`,
      },
    });
    odpowiedz.status(200).send(`baza wybudzona`);
  } catch (blad) {
    console.log(blad);
    odpowiedz.status(500).send(`blad wybudzania`);
  }
}
