export enum Genre {
  ACTION = "ACTION",
  ADULT = "ADULT",
  ADVENTURE = "ADVENTURE",
  COMEDY = "COMEDY",
  COOKING = "COOKING",
  DOUJINSHI = "DOUJINSHI",
  DRAMA = "DRAMA",
  ECCHI = "ECCHI",
  FANTASY = "FANTASY",
  GENDERBENDER = "GENDERBENDER",
  HAREM = "HAREM",
  HISTORICAL = "HISTORICAL",
  HORROR = "HORROR",
  ISEKAI = "ISEKAI",
  JOSEI = "JOSEI",
  MANHUA = "MANHUA",
  MANHWA = "MANHWA",
  MARTIALARTS = "MARTIALARTS",
  MATURE = "MATURE",
  MECHA = "MECHA",
  MEDICAL = "MEDICAL",
  MYSTERY = "MYSTERY",
  ONESHOT = "ONESHOT",
  PSYCHOLOGICAL = "PSYCHOLOGICAL",
  ROMANCE = "ROMANCE",
  SCHOOLLIFE = "SCHOOLLIFE",
  SCIFI = "SCIFI",
  SEINEN = "SEINEN",
  SHOUJO = "SHOUJO",
  SHOUJOAI = "SHOUJOAI",
  SHOUNEN = "SHOUNEN",
  SHOUNENAI = "SHOUNENAI",
  SLICEOFLIFE = "SLICEOFLIFE",
  SMUT = "SMUT",
  SPORTS = "SPORTS",
  SUPERNATURAL = "SUPERNATURAL",
  TRAGEDY = "TRAGEDY",
  WEBTOONS = "WEBTOONS",
  YAOI = "YAOI",
  YURI = "YURI",
  INVALID_GENRE = "INVALID_GENRE",
}

export const stringToGenre = (str: string): Genre => {
  const normalized = str.toUpperCase().replace(" ", "");
  if (
    !Object.values(Genre).includes((normalized as unknown) as Genre) ||
    normalized === Genre.INVALID_GENRE
  )
    return Genre.INVALID_GENRE;
  return (normalized as unknown) as Genre;
};
